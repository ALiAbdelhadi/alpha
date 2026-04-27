-- Rename legacy estimator leads table to match transparency terminology.
ALTER TABLE "estimator_leads" RENAME TO "transparency_leads";

-- Preserve existing index names and align them with the new table name.
ALTER INDEX "estimator_leads_phone_idx" RENAME TO "transparency_leads_phone_idx";
ALTER INDEX "estimator_leads_createdAt_idx" RENAME TO "transparency_leads_createdAt_idx";
