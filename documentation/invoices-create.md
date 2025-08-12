Invoices: New Page (Bill to, From, Description) — Refactor Plan

Overview
- We are removing the modal concept. The new invoice flow lives on a single responsive page for both desktop and mobile: `app/(system)/invoices/new/page.tsx`.
- The existing salesman/outside seller logic represents the "From" form. We will add two more sections: "Bill to" and "Description".
- We will not implement the Template input for now.

Page Structure
- Page: `app/(system)/invoices/new/page.tsx`
- Actions panel (left/right column depending on layout): `features/invoices/components/InvoiceActions.tsx` (new, modeled after `features/products/components/ProductActions.tsx`)
- Forms:
  - From form: `features/invoices/components/FromForm.tsx` (new; based on current `NewInvoiceForm.tsx` implementation)
  - Bill to form: `features/invoices/components/BillToForm.tsx` (mock UI only for now)
  - Description form: `features/invoices/components/DescriptionForm.tsx` (mock UI for now)

Implementation Steps (execution order)
1. Routing and entrypoint
   - Ensure the Add action “New Invoice” navigates to `/invoices/new` for both desktop and mobile (no modal).
   - Keep existing add action items API; behavior should route to the page.
2. Page shell
   - Scaffold `app/(system)/invoices/new/page.tsx` with the header “New Invoice”
   - Render a global `CommingSoon` component at the bottom for visibility during the mock phase.
3. From form migration
   - Move the existing form from `features/invoices/components/NewInvoiceForm.tsx` to `features/invoices/components/FromForm.tsx`.
   - Mount `FromForm` inside the `/invoices/new` page.
   - Preserve current behaviors: salesman searchable select (max 5 when not searching), add-new-by-name, outside seller toggle, clearing rules, and validation with optional empty email.
4. Actions panel
   - Create `features/invoices/components/InvoiceActions.tsx` modeled after `ProductActions.tsx` with three items:
     - Bill to (disabled) — Set your customer’s details
     - From (enabled) — Set your personal details
     - Description (disabled) — Add products or items
   - Include utility blocks:
     - Save As a Draft — “Edit and send this invoice later”
     - Delete Invoice — “Hide & disable current invoice”
5. Bill to (mock)
   - Scaffold `BillToForm.tsx` as a mock UI only; do not wire data yet.
   - Reuse UX primitives (labels, inputs, layout) for consistency.
6. Description (mock with interactions)
   - Scaffold `DescriptionForm.tsx` with:
     - Add new item button → shows select (hard-coded products) and price (pre-filled from selection).
     - Ability to remove items; animate add/remove.
     - Subtotal computation from selected items.
     - Add cost button → shows description input and a radio to choose value type.
     - Total computation: (subtotal + other costs) * taxes.
7. Buttons and submit behavior
   - Provide “Save & Send” and “Cancel” per section.
   - Prefer a shared button component that submits by `form` attribute targeting the active section’s form id.
8. Future wiring (out of scope for this pass)
   - Customers/products/taxes/costs data wiring.
   - Final invoice creation mutation and persistence.

Actions Panel Items (modeled after ProductActions)
- Bill to (disabled for now)
  - Subtitle: Set your customer’s details
- From (enabled; current working form)
  - Subtitle: Set your personal details
- Description (disabled for now)
  - Subtitle: Add products or items
- Utility blocks (same visual style as products/id):
  - Save As a Draft — "Edit and send this invoice later"
  - Delete Invoice — "Hide & disable current invoice"

New Invoice Page — Acceptance Criteria
- Header displays: "New Invoice".
- An image upload input is rendered that accepts images via click or drag-and-drop.
- Invoice steps are shown: Bill to, From, Description.
- The From form is rendered (see below) and functional.
- The Bill to and Description sections are present as mock UI and disabled in the actions list.
- A `CommingSoon` component is rendered on the page.
- Selecting "New Invoice" in the Add action menu redirects to `/invoices/new` on both desktop and mobile (no modal).

From Form (current implementation to be hosted in /invoices/new)
- Searchable `SelectInput` with placeholder "Salesman" (max 5 options when not searching).
- Add flow: when no match exists, an add button is shown to create a new salesman by name via TRPC.
- Toggle: "Outside seller".
  - When checked: the salesman select is disabled and cleared, and the outside seller information form is enabled.
  - When unchecked: outside seller form is greyed out and disabled.
- Outside seller information fields: Name, Lastname, Identification number, Email, Phone. Email allows empty string or a valid email.

Bill To — Mock UI Acceptance Criteria
- Mock only (no data wiring yet), similar to the From form’s current UX patterns.

Description — Acceptance Criteria (Mock UI)
- An "Add new item" button is rendered. When clicked:
  - A select field appears to choose a product (hard-coded options for now).
  - A price field is shown and pre-populated with the selected product’s price (hard-coded).
  - Items can be removed; add/remove actions are animated.
- Subtotal is rendered as the sum of all selected products.
- Below the subtotal, an "Add cost" button is rendered. When clicked:
  - A text input appears with placeholder "description".
  - A radio input appears to choose the value type (e.g., fixed/percentage) for the cost.
- Total is rendered as: (subtotal + other costs) * taxes.

Data Model
- `salesmen` table exists with: `id`, `name`, `createdAt`, `updatedAt`.
- `invoices` supports both internal and outside sellers:
  - `salesmanId` (nullable FK to `salesmen.id`)
  - `outsideSeller` (boolean)
  - `outsideSellerFirstName`, `outsideSellerLastName`,
    `outsideSellerIdentification`, `outsideSellerEmail` ("" or valid email), `outsideSellerPhone`

API / Hooks
- TRPC `api.salesman` with `getAll` and `create` (name only) is already wired in `src/server/api/root.ts`.
- Hook `useSalesman` provides `filteredSalesmen`, `setSalesmanSearch`, and `handleAddSalesman` with optimistic updates and correct rollback.

Follow-ups
- Move the existing form into `FromForm.tsx` and render it on `/invoices/new`.
- Scaffold `InvoiceActions.tsx` modeled after `ProductActions.tsx` with the three items and the two utility blocks.
- Add the image upload input (click + drag-and-drop) on the page shell.
- Add Bill to and Description mock UIs according to the criteria above.
- Later: wire real data flows (customers, products, taxes, costs) and implement the final creation mutation.
