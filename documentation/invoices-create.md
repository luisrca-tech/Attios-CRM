Invoices: Create UI and Salesman Logic

This feature adds a responsive Invoice creation surface with the same pattern as Products and Leads: a desktop modal and a dedicated mobile page, sharing a single form component.

UI Structure
- Modal: `features/invoices/components/NewInvoiceModal.tsx`
- Mobile page: `app/(system)/invoices/new/page.tsx`
- Form: `features/invoices/components/NewInvoiceForm.tsx`

The form renders:
- Searchable `SelectInput` with placeholder "Salesman" (max 5 options)
  - Footer button: "Add new salesman" (triggers create via TRPC)
- Checkbox: "Outside seller"
  - When checked: salesman select is disabled
  - When checked: the outside seller form is enabled
- Outside seller Information form (disabled/greyed out when not selected)
  - Name, Lastname, Identification number, Email, Phone
- A `CommingSoon` component

Data Model
- New table: `salesmen` with fields: `id`, `name`, `createdAt`, `updatedAt`
- Invoices table updated to support both internal and outside sellers:
  - `salesmanId` (nullable FK to `salesmen.id`)
  - `outsideSeller` (boolean)
  - `outsideSellerFirstName`, `outsideSellerLastName`,
    `outsideSellerIdentification`, `outsideSellerEmail`, `outsideSellerPhone`

Locations:
- Schema files: `src/server/db/schema/salesmen.ts`, `src/server/db/schema/invoices.ts`
- Re-exported in `src/server/db/schema/index.ts`

API
- TRPC router for salesmen: `src/server/api/routers/salesman/*`
  - `getAll`: list all
  - `create`: add by name
- Wired in `src/server/api/root.ts` under `api.salesman`

Hooks
- `useSalesman` hook mirrors `useCategory`/`useBrand`
  - Provides `filteredSalesmen` (sliced to 5 when no search)
  - `setSalesmanSearch` for live filtering
  - `handleAddSalesman` to create from the select footer

Add Action
- `New Invoice` now opens the modal on desktop and navigates to `/invoices/new` on mobile via `addActionItems`.

Follow-ups
- Implement invoice creation mutation and schema wiring once base invoice fields (number, date, status, amount, customer) are finalized for the create flow.

