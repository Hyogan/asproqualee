# Technical Audit Report: Asproqualee
**Date:** Sunday, May 10, 2026
**Status:** Alpha / Prototype (Transitioning to Beta)

---

## 1. Architectural Health
*   **Skeleton Controllers:** Many controllers (e.g., `ActionController.php`) are currently in a "fake data" state. While the logic for database interaction is commented out, the application currently serves hardcoded pools of data.
*   **Wayfinder Utilization:** Wayfinder is implemented but underused. It is used for the `dashboard()` route in `AppHeader.tsx`, but most marketing routes in `web.php` are still handled as manual strings or incomplete named routes.
*   **Model Strictness:** The `User` model is well-configured with proper `$hidden` fields and `$casts`. However, many other models (like `Action`) lack `ActionResource` implementation in active controller methods, leading to inconsistent JSON structures.

## 2. The Inertia Bridge
*   **Props Bloating:** Some pages, specifically `marketing/Actions/Index.tsx`, handle large static arrays that should be paginated and filtered on the server side via Inertia props.
*   **TypeScript Sync:** There is a disconnect between Eloquent models and frontend types. The frontend uses `interface BlogPost` which is manually defined and may drift from the database schema over time.
*   **SPA Integrity:** While `AppHeader.tsx` uses Inertia `<Link>`, several parts of the marketing site (like the footer or some internal action links) still use standard `<a>` tags, causing unnecessary full-page refreshes.

## 3. Gap Analysis (What’s Missing)
*   **Missing POST Routes:** The `ContactMessage` and `Volunteer` systems have "View" routes but no corresponding `POST` routes to handle form submissions in `routes/web.php`.
*   **Error Handling:** There are no custom Inertia error pages (403, 404, 500). If a database query fails, the user sees a raw Laravel error page rather than a branded SPA experience.
*   **Global Loading State:** No progress indicators are configured for Inertia navigation, leading to a "frozen" feel during slow data fetches.
*   **SEO Management:** Most marketing pages lack the Inertia `<Head>` component to manage unique meta titles and descriptions dynamically.

## 4. Security & Performance
*   **Validation Gaps:** `StoreBlogPostRequest.php` has an `authorize()` method returning `false`, effectively disabling the feature. Several other controllers lack dedicated `FormRequest` validation, relying on inline or missing validation logic.
*   **Sensitive Data:** The `User` model is safe, but ensure `ActionResource` or `Donation` resources are created to prevent leaking metadata (like internal IDs or timestamps) that aren't needed by the UI.
*   **N+1 Vulnerabilities:** In `BlogPostController.php`, relationships are loaded using `load()`, which is good, but `index` methods need `with()` eager loading to prevent performance bottlenecks as the database grows.

---

## 5. Actionable Roadmap

### Critical (High Priority)
1.  **Activate Contact Form:** Implement `POST /contact-us` and `POST /get-involved` handlers with `StoreContactMessageRequest` validation.
2.  **Fix Authorization:** Update `StoreBlogPostRequest` to allow authorized users (admins) to save posts.
3.  **Real Data Migration:** Transition `ActionController` and others from fake data pools to actual Eloquent queries.

### Optimization
1.  **Type-Safe Routing:** Map all marketing routes to Wayfinder definitions in `resources/js/routes/`.
2.  **Shared Props:** Move global settings into `HandleInertiaRequests` middleware.

---

## 6. Top 5 Priority List (MVP Readiness)
1.  **Form Handlers:** Connect the Donation and Contact forms to the database with server-side validation.
2.  **Dynamic SEO:** Implement `<Head>` on all marketing pages using data passed from the controller.
3.  **Error Branding:** Create `resources/js/pages/Error.tsx` to handle 404/500 errors gracefully via Inertia.
4.  **Action Gallery:** Fix the `ActionGallery` model relationship to ensure images are served via a storage link.
5.  **Admin Protection:** Secure all `POST/PUT/DELETE` routes behind an `auth` and/or `admin` middleware.
