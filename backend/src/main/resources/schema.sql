-- ============================================================
-- schema.sql
-- Reparatur von Schema-Drift, die Hibernates ddl-auto=update nicht
-- automatisch loesen konnte (ALTER TABLE ... NOT NULL scheitert in
-- Postgres ohne DEFAULT, wenn die Tabelle bereits Zeilen enthaelt).
-- Laeuft idempotent bei jedem Start.
-- ============================================================

-- "daily_lead_count" ist eine Altlast aus einer frueheren Settings-Version
-- und wird vom aktuellen Code nicht mehr verwendet, blockierte aber wegen
-- NOT NULL ohne Default jedes Insert der Settings-Zeile.
ALTER TABLE settings ALTER COLUMN daily_lead_count DROP NOT NULL;

-- "replied" existiert im Creator-Entity, wurde aber nie zur DB hinzugefuegt.
ALTER TABLE creators ADD COLUMN IF NOT EXISTS replied boolean NOT NULL DEFAULT false;
