import Link from "next/link";
import { Mail, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-32 px-8 sm:px-16">
        <div className="w-full max-w-2xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
              Admin Dashboard
            </h1>
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Choose the section you want to manage
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Link
              href="/contacts"
              className="group relative flex flex-col items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-8 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/30">
                <Mail className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h2 className="mb-2 text-2xl font-semibold text-black dark:text-zinc-50">
                  Contacts
                </h2>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  View and manage incoming contact requests and inquiries
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                <span>View all messages</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
            <Link
              href="/meetings"
              className="group relative flex flex-col items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-8 transition-all duration-300 hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/30">
                <Calendar className="h-7 w-7 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="flex-1">
                <h2 className="mb-2 text-2xl font-semibold text-black dark:text-zinc-50">
                  Meetings
                </h2>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  Manage scheduled meetings and appointments with clients
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-teal-600 dark:text-teal-400">
                <span>View all meetings</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
