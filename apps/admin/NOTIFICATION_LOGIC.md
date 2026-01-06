# Notification Logic Documentation

## Overview

The Alpha admin system uses a database-driven notification system designed for PWA (Progressive Web App) integration. Notifications are stored in the database and can be consumed by the admin interface for real-time updates.

## Notification Flow

### 1. Contact Form Submission

**Trigger Location:** `apps/www/app/[locale]/api/contact/route.ts`

**When:** A visitor submits the contact form

**Process:**
1. Contact submission is created in the database
2. All users with `ADMIN` or `SUPERADMIN` roles are fetched
3. A notification is created for each admin user:
   ```typescript
   {
     type: "NEW_CONTACT",
     title: "New Contact Submission",
     message: `${name} submitted a contact form`,
     userId: admin.id,
     entityType: "contact",
     entityId: submission.id
   }
   ```

### 2. Meeting Request

**Trigger Location:** 
- `apps/www/app/[locale]/api/contact/route.ts` (when meeting is requested with contact form)
- `apps/www/app/[locale]/api/schedule/route.ts` (standalone meeting request)

**When:** A visitor requests a meeting (either with contact form or standalone)

**Process:**
1. Meeting record is created in the database
2. All users with `ADMIN` or `SUPERADMIN` roles are fetched
3. A notification is created for each admin user:
   ```typescript
   {
     type: "NEW_MEETING",
     title: "New Meeting Request",
     message: `${name} requested a meeting`,
     userId: admin.id,
     entityType: "meeting",
     entityId: meeting.id
   }
   ```

### 3. Status Changes (Future Implementation)

**Trigger Location:** Admin API routes when status is updated

**When:** Admin updates contact submission or meeting status

**Process:**
- Notifications can be created for status changes (e.g., when a contact moves to "QUALIFIED")
- Notifications can be created for assignments (when a contact/meeting is assigned to a specific admin)

## Database Schema

```prisma
model Notification {
  id        String           @id @default(uuid())
  type      NotificationType
  title     String
  message   String
  userId    String
  entityType String // "contact" | "meeting"
  entityId  String
  read      Boolean   @default(false)
  readAt    DateTime?
  createdAt DateTime  @default(now())
}
```

## Notification Types

- `NEW_CONTACT` - New contact form submission
- `NEW_MEETING` - New meeting request
- `STATUS_CHANGE` - Status updated (future)
- `ASSIGNMENT` - Assigned to admin (future)

## PWA Integration

### Real-time Updates

The admin PWA can implement real-time notification updates using:

1. **Polling:** Periodically fetch unread notifications
   ```typescript
   GET /api/admin/notifications?read=false
   ```

2. **Server-Sent Events (SSE):** Stream notifications in real-time
   ```typescript
   GET /api/admin/notifications/stream
   ```

3. **WebSocket:** Bidirectional communication (requires additional setup)

### Push Notifications (Future)

For true push notifications, implement:

1. Service Worker registration
2. Push API subscription
3. Backend push service (Firebase Cloud Messaging, OneSignal, etc.)
4. Store subscription tokens in database

## Admin API Endpoints (To Implement)

### GET /api/admin/notifications
Fetch notifications for the current user

```typescript
GET /api/admin/notifications?read=false&limit=50
Response: {
  success: true,
  notifications: Notification[],
  unreadCount: number
}
```

### PATCH /api/admin/notifications/[id]
Mark notification as read

```typescript
PATCH /api/admin/notifications/[id]
Body: { read: true }
```

### POST /api/admin/notifications/mark-all-read
Mark all notifications as read

```typescript
POST /api/admin/notifications/mark-all-read
```

## Implementation Notes

1. **Scalability:** Current implementation creates notifications for all admins. For large teams, consider:
   - Role-based notification preferences
   - Notification routing rules
   - Digest notifications (batch multiple notifications)

2. **Performance:** 
   - Index on `userId` and `read` for fast queries
   - Consider archiving old notifications
   - Implement pagination for notification lists

3. **User Experience:**
   - Show unread count in admin UI header
   - Auto-refresh notification list
   - Click notification to navigate to related entity
   - Mark as read on view

4. **Security:**
   - Always verify user permissions before creating/reading notifications
   - Sanitize notification messages
   - Rate limit notification creation

## Current Implementation Status

✅ **Implemented:**
- Notification creation on contact submission
- Notification creation on meeting request
- Database schema for notifications

⏳ **To Implement:**
- Admin API endpoints for fetching notifications
- Admin UI for displaying notifications
- Real-time updates (polling/SSE)
- Push notifications (optional)

## Example Usage

### Fetching Notifications in Admin UI

```typescript
// In admin component
useEffect(() => {
  const fetchNotifications = async () => {
    const response = await fetch('/api/admin/notifications?read=false')
    const data = await response.json()
    if (data.success) {
      setNotifications(data.notifications)
      setUnreadCount(data.unreadCount)
    }
  }
  
  fetchNotifications()
  // Poll every 30 seconds
  const interval = setInterval(fetchNotifications, 30000)
  return () => clearInterval(interval)
}, [])
```

### Marking Notification as Read

```typescript
const markAsRead = async (notificationId: string) => {
  await fetch(`/api/admin/notifications/${notificationId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ read: true })
  })
}
```

