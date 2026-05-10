# AsproQualee — Full Technical Audit & Product Roadmap

> Audited: 2026-05-10
> Stack: Laravel 12, React 19, Inertia.js 2, Wayfinder, Vite 7, TailwindCSS 4
> Auditor role: Senior Software Architect & CTO-level Product Reviewer

---

## Executive Summary

AsproQualee is a Cameroonian NGO digital platform focused on water quality, sanitation, and environmental protection. The codebase is **well-scaffolded but largely hollow**: the structure is clean, the component library is solid, and the database schema is coherent — but a significant portion of the public-facing product is powered by hardcoded fake data rather than real database-driven content.

The application has been built with ambition: blog, donations, volunteer signup, actions/campaigns, programs, products, contact, and mission pages are all present. But most of these are either static pages, incomplete forms, or placeholder renders. The donation system stores records but has no payment processor. The volunteer form has no backend route. The actions, stats, homepage content, and featured projects are all fabricated in PHP arrays. The admin panel does not exist.

**Verdict: MVP skeleton at ~35% completion. Production deployment would be misleading to users and risky to the organization.**

---

## Product Understanding

AsproQualee appears to be a multi-purpose NGO communication and engagement platform. Its intended capabilities are:

1. **Public awareness** — Educate visitors on water-borne diseases, hygiene, and environmental protection
2. **Campaign management** — Showcase ongoing/completed field actions with impact statistics
3. **Donor acquisition** — Accept one-time and recurring donations (with tax reduction incentives — 66% shown in UI)
4. **Volunteer recruitment** — Collect volunteer applications with skill mapping and availability
5. **Content publishing** — Run an editorial blog with categories, tags, authors, and pagination
6. **Program showcase** — Present organizational programs and products (water quality kits?)
7. **Institutional presence** — Mission, values, and organizational identity pages
8. **Internal user management** — Authenticated area for staff/admin (currently just a placeholder dashboard)

The organization likely needs this platform to:
- Attract international donors and funding bodies
- Recruit volunteers for field operations
- Establish credibility with institutional partners
- Communicate impact data to stakeholders

---

## Current Architecture Audit

### Strengths

- Clean MVC structure with proper separation of controllers, models, services, and form requests
- Inertia.js integration is correct — shared props pattern is implemented
- Route naming is consistent and uses Wayfinder correctly where used
- Tailwind CSS 4 + Radix UI = solid accessible component foundation
- Two-factor auth via Fortify is a real differentiator for an NGO (admin account security)
- Proper password policy enforcement in production (AppServiceProvider)
- Soft route model binding on BlogPost (slug-based)
- ActionResource transformer is the right pattern — but only applied to one model

### Structural Red Flags

- **No API routes** (`routes/api.php` absent or empty) — makes mobile readiness impossible
- **No admin routes** — there is no backoffice, content management is impossible without direct DB access
- **No queue configuration** — jobs table exists, but no jobs are dispatched anywhere
- **No file storage strategy** — image fields exist across every model but there is no upload logic, disk config, or asset pipeline
- **`routes/web.php` is a mixed concern** — some routes are closures (`Inertia::render(...)` directly), some use controllers, inconsistently
- **One seeder** — only seeds a single test user; no categories, actions, blog posts, or programs — making development impossible without manual DB inserts

---

## Backend Audit

### Controllers

| Controller | Status | Issues |
|---|---|---|
| HomeController | Fake data | Stats and featured projects are PHP arrays — no DB queries |
| ActionController | Fake data | `show()` returns randomly selected fake action from a hardcoded pool — NEVER hits DB |
| BlogPostController | Real + broken | `index()` and `show()` query DB correctly; `store()` and `update()` exist but have no auth middleware protecting them |
| DonateController | Real but incomplete | Saves to DB but no payment processor, no email confirmation |
| VolunteerController | Stub | `index()` only renders a page — no `store()` method exists |
| OpenContactController | Real | Correct service injection, proper form request — the most complete module |
| MissionController | Static | Returns hardcoded PHP arrays — not DB-driven |
| WaterHealthController | Static | 502-line educational page fully hardcoded — no DB |
| ProgramsController | Stub | `index()` renders nothing — no data |
| ProductController | Stub | Same |

**Critical**: `BlogPostController::store()` and `update()` are not protected by `auth` middleware. Any unauthenticated user can create or modify blog posts if they hit the endpoint directly.

### Models

- `BlogPostCategory` model exists alongside `Category` model — **duplicate concept**. `BlogPost` references `category_id` FK pointing to `categories` table. `BlogPostCategory` appears to be dead code that was never cleaned up.
- `Action` model is fully defined but `ActionController` never queries it — all action data is hardcoded arrays in the controller.
- `Donation` model has `status` enum cast but the enum values (`pending`, `completed`, `failed`) are hardcoded strings, not PHP 8.1 backed enums.
- `Tag` model exists, pivot table is migrated, but no tag management exists anywhere.
- No `Program` model. No `Product` model. No `Project` model. Pages for these exist in React but have zero data.
- `User::blogPosts()` relationship exists but `User` has no `role` field — any authenticated user is treated identically.

### Migrations

- All migrations are structurally sound.
- `donations` table migration (`2026_05_06_...`) is **uncommitted** (shown in git status as untracked `??`) — this table may not exist in any deployed environment.
- No `volunteers` table migration exists anywhere — volunteer form data cannot be persisted.
- No `programs` table. No `products` table. No `projects` table.
- `categories` table is shared between `actions` (correct) and `blog_posts` (questionable — blog categories and action categories are different concepts).

### Services

- `ContactMessageService` is correct and complete — good pattern.
- No service for donations, blog posts, volunteers, or actions — business logic is scattered in controllers.
- No payment service abstraction layer.

### Form Requests

- `StoreContactMessageRequest` — correct.
- `StoreBlogPostRequest` exists but is not used in `BlogPostController::store()` which uses inline `$request->validate()` instead.
- No `StoreDonationRequest` — validation is inline in `DonateController::store()`.
- No `StoreVolunteerRequest` — no volunteer store endpoint exists.

---

## Frontend Audit

### React / Inertia Patterns

- Pages correctly use `usePage()` and typed props — good TypeScript discipline.
- `useForm()` from Inertia is used correctly in Contact and Donate pages.
- Route calls use Wayfinder (`route('blog.index')` etc.) — correct.

### Hardcoded Frontend Data

Multiple React pages embed business-critical data directly in JSX as constants:

- `Actions/Index.tsx` — 5 hardcoded action objects with fake images, dates, participant counts
- `welcome.tsx` — Receives props from HomeController but those props are hardcoded PHP arrays
- `WaterHealth/Index.tsx` — 502 lines of hardcoded educational content that belongs in a CMS
- `Mission/About.tsx` and `Mission/Value.tsx` — Static content, not DB-driven

This creates a **dual hardcoding problem**: fake data exists in BOTH the PHP controller AND the React component — making it unclear which layer is the source of truth.

### Security Issue — XSS

```tsx
// resources/js/pages/marketing/Blog/Details.tsx
<div dangerouslySetInnerHTML={{ __html: post.content }} />
```

Blog post content is rendered as raw HTML with no sanitization. If an admin account is compromised or if the `store()` endpoint is hit by an unauthenticated attacker (see above), arbitrary scripts can be injected into every blog post page. **This is a production blocker.**

### UI Issues

- `Programs/Index.tsx`, `Products/Index.tsx`, `Projects/Index.tsx` — render nothing meaningful (placeholders). These routes are publicly accessible and show empty pages.
- The volunteer form is 3 steps, fully built, but submits to a non-existent route — clicking submit will throw a 404/500 in production.
- The donation "thank you" page (`GET /donate/merci`) renders the same `Donate` component used for the form — this is likely a bug. It should render a separate confirmation page.
- Blog search input in `Blog/Index.tsx` is a controlled React state input — it does **not** query the server. It only filters the already-loaded paginated page. Search across all posts does not work.
- Pagination in blog uses Inertia links correctly.
- Dark mode is hidden via CSS (per git commit message) — appearance toggle in settings has no effect. This is confusing UX.

### TypeScript

- Most page components have inline prop typing, which works but doesn't scale.
- No shared `types/` directory for domain types (`BlogPost`, `Action`, `Donation`, etc.) — types are redefined per component.
- `ActionResource.php` exists but its TypeScript equivalent is not enforced anywhere.

---

## Security & Performance

### Security Issues (Severity Order)

| Issue | Severity | Detail |
|---|---|---|
| Unauthenticated blog post write | Critical | `store()` and `update()` in BlogPostController have no `auth` middleware |
| XSS via `dangerouslySetInnerHTML` | Critical | Blog content rendered unsanitized |
| No CSRF on API potential | High | If API routes are added later without CSRF consideration, this becomes an attack surface |
| Mass assignment in Donation | Medium | `Donation::create($request->validated())` — `status` field is fillable and could be set to 'completed' by a crafted request |
| No rate limiting on donation endpoint | Medium | Bots can flood the donations table |
| No rate limiting on contact form | Medium | Spam vector is open |
| Session fixation not addressed | Low | Default Laravel behavior — acceptable |

### Performance Issues

- No image optimization pipeline — `image` fields store raw paths/filenames with no resizing, WebP conversion, or CDN integration.
- No caching on any public page — every request to `/`, `/blog`, `/actions` hits PHP regardless of content freshness.
- `WaterHealth/Index.tsx` is 502 lines of inlined JSX — no lazy loading of sections, heavy initial bundle.
- `Donate.tsx` is 536 lines — same issue.
- No Vite code splitting configured beyond defaults.
- No database query optimization — `BlogPost::with(['author', 'category', 'tags'])` is correct (eager loading), but other controllers don't follow this pattern.

---

## Incomplete Features

### 1. Volunteer Module — 80% UI, 0% Backend
- Form exists with 3-step wizard (personal info, skills, availability, motivation)
- No `volunteers` table migration
- No `Volunteer` model
- No `VolunteerController::store()` method
- No route for form submission
- Form data is lost on submit

**Impact**: The volunteer CTA on multiple pages leads to a dead-end form.

### 2. Donation Module — 60% UI, 40% Backend
- Beautiful 2-step donation form with preset amounts and frequency toggle
- Backend stores records to DB (if migration is run)
- No payment processor (no Stripe, PayDunya, Orange Money, MTN Mobile Money integration)
- No email confirmation sent to donor after donation
- No webhook handling for payment status updates
- `status` always stays `pending` — donation is never completed

**Impact**: The organization cannot receive actual money. This is the most critical missing feature for an NGO.

### 3. Actions Module — 100% UI, 5% Backend
- Full detail pages, filter UI, gallery display
- `Action` model and migration are complete
- Controller NEVER queries the model — always uses hardcoded fake data
- No admin interface to create/manage actions

**Impact**: All displayed campaign data is fabricated.

### 4. Blog Admin — 0%
- `BlogPostController` has `store()`, `update()`, `destroy()` methods
- No admin routes protecting these
- No admin UI for creating posts (no rich text editor, no image upload, no draft management)
- Content creation requires direct database access

**Impact**: The blog cannot be updated by non-technical staff.

### 5. Programs/Products/Projects — 100% Missing
- Three public routes exist rendering empty pages
- No models, no migrations, no data, no controllers
- Pages are publicly accessible and show nothing

**Impact**: Three navigation items lead to empty pages — damages organizational credibility.

### 6. Homepage — Fake Data
- `HomeController` returns hardcoded stats (25,000 beneficiaries, 48 projects, 320 volunteers, 12M liters)
- Featured projects are hardcoded PHP arrays with fake images
- Recent news is hardcoded

**Impact**: The organization's claimed impact figures are not real.

---

## Recommended Next Features

### Priority 1 — Critical (Build These First)

#### 1.1 Payment Integration for Donations

**Business value**: The NGO cannot receive donations without this. Every donor who fills out the form today loses their money to `/dev/null`.

**Technical value**: Unblocks the entire revenue stream.

**Suggested implementation**:
- Integrate **PayDunya** or **CinetPay** (both support Cameroon/FCFA + mobile money)
- Fallback: Stripe with international cards
- Backend: `app/Services/PaymentService.php` with driver abstraction
- New migration: add `payment_reference`, `payment_provider`, `paid_at` to `donations`
- Webhook route: `POST /webhooks/payment` → `PaymentWebhookController`
- After payment confirmation: set `status = 'completed'`, trigger `DonationConfirmed` event
- Email: Send tax receipt to donor (`DonationReceiptMail`)

**Files affected**: `DonateController`, `Donation` model, `donations` migration, new `PaymentService`, new `DonationReceiptMail`, new webhook route

**Complexity**: High (1-2 weeks)

---

#### 1.2 Admin Panel (Backoffice)

**Business value**: Non-technical staff cannot manage any content. The platform is unusable without developer access.

**Technical value**: Unlocks all other features.

**Suggested implementation**:
- Add `role` column to `users` table: `enum('admin', 'editor', 'user')` with default `'user'`
- Create `admin` middleware checking `auth()->user()->role === 'admin'`
- Admin route group: `Route::prefix('admin')->middleware(['auth', 'admin'])->group(...)`
- Modules needed:
  - Blog post CRUD with rich text editor (Tiptap or Quill via npm)
  - Action/Campaign CRUD
  - Donation list with status + export to CSV
  - Contact message inbox (read/resolve status)
  - Volunteer application list with status management
  - Stats management (make homepage stats configurable)

**Files affected**: `users` migration, new `AdminController`, new `Admin/` pages directory, new admin middleware

**Complexity**: High (2-3 weeks)

---

#### 1.3 Volunteer Form Backend

**Business value**: Volunteer acquisition is a stated organizational goal. The form is already built but loses all data.

**Technical value**: Simple backend work, high immediate impact.

**Suggested implementation**:
```php
// New migration
Schema::create('volunteers', function (Blueprint $table) {
    $table->id();
    $table->string('first_name');
    $table->string('last_name');
    $table->string('email');
    $table->string('phone', 30)->nullable();
    $table->string('location')->nullable();
    $table->json('skills')->nullable();
    $table->string('commitment')->nullable();
    $table->text('availability')->nullable();
    $table->text('motivation')->nullable();
    $table->text('experience')->nullable();
    $table->enum('status', ['pending', 'contacted', 'active', 'inactive'])->default('pending');
    $table->timestamps();
});
```
- New `Volunteer` model
- `VolunteerController::store()` with `StoreVolunteerRequest`
- `POST /get-involved` route
- Send confirmation email to volunteer + notification to admin
- Admin list view

**Files affected**: New `volunteers` migration, `Volunteer` model, `VolunteerController`, routes, new `StoreVolunteerRequest`

**Complexity**: Low-Medium (2-3 days)

---

#### 1.4 Fix Blog Security Issues

**Business value**: Prevents organizational data breach and reputation damage.

**Technical value**: Closes two critical vulnerabilities.

**Changes required**:

1. Add auth middleware to blog write routes:
```php
// routes/web.php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/blog', [BlogPostController::class, 'store']);
    Route::put('/blog/{blogPost}', [BlogPostController::class, 'update']);
    Route::delete('/blog/{blogPost}', [BlogPostController::class, 'destroy']);
});
```

2. Sanitize blog content before storage and before render. Install `mews/purifier` and apply on `store()` and `update()`. On the frontend, consider using `DOMPurify` before `dangerouslySetInnerHTML`.

**Files affected**: `routes/web.php`, `BlogPostController`, `Blog/Details.tsx`

**Complexity**: Low (half a day)

---

### Priority 2 — High Value

#### 2.1 Email Notification System

**Business value**: Every form submission (contact, donation, volunteer) currently goes into a database black hole. Staff has no awareness of new submissions.

**Notifications needed**:
- `NewContactMessageMail` → to admin email on new contact form submission
- `DonationPendingMail` → to donor acknowledging receipt
- `DonationConfirmedMail` → to donor after payment confirmed (with PDF receipt)
- `VolunteerApplicationMail` → to volunteer confirming submission + to admin
- `DonationThankYouMail` → monthly summary to recurring donors

**Implementation**:
- Configure `MAIL_MAILER` in `.env` (recommend Resend or Mailgun for transactional)
- Create `app/Mail/` directory with Mailable classes
- Use queued mail: `Mail::to($email)->queue(new NewContactMessageMail($message))`
- Requires queue worker (`php artisan queue:work`)

**Files affected**: `DonateController`, `VolunteerController`, `OpenContactController`, new `app/Mail/` directory

**Complexity**: Medium (3-4 days)

---

#### 2.2 Database-Driven Homepage & Stats

**Business value**: The homepage currently shows fabricated statistics. This is ethically problematic for a registered NGO claiming specific impact numbers to potential donors.

**Suggested implementation**:
- Create `settings` table (key-value store) for configurable stats
- Or: compute stats from real data (`Donation::sum('amount')`, `Volunteer::count()`, etc.)
- Update `HomeController::stats()` to query the database
- Update `HomeController::featuredProjects()` to query `actions` table where `featured = true`
- Update `HomeController::recentNews()` to query `blog_posts` ordered by `published_at`

**Files affected**: `HomeController`, potentially new `settings` migration, `welcome.tsx`

**Complexity**: Low-Medium (1-2 days)

---

#### 2.3 Connect Actions to Database

**Business value**: All campaign work displayed on the site is fictional. This undermines credibility.

**Changes**:
- Remove all hardcoded arrays from `ActionController`
- Replace with `Action::with(['category', 'gallery'])->paginate()`
- For `show()`, use route model binding: `public function show(Action $action)`
- Add `scopePublished()` to `Action` model
- Seed real categories and actions

**Files affected**: `ActionController`, `Action` model, `database/seeders/`

**Complexity**: Low (1 day, plus content entry time)

---

#### 2.4 Programs, Products, Projects Modules

**Business value**: Three public navigation links lead to empty pages — this damages first impressions with donors and partners.

**For Programs**:
```php
Schema::create('programs', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('slug')->unique();
    $table->text('description');
    $table->text('long_description')->nullable();
    $table->string('image')->nullable();
    $table->string('icon')->nullable();
    $table->boolean('featured')->default(false);
    $table->enum('status', ['active', 'completed', 'planned'])->default('active');
    $table->timestamps();
});
```

Same pattern for `products` and `projects`.

**Files affected**: New migrations, models, controllers, and data for 3 modules

**Complexity**: Medium (3-4 days per module)

---

#### 2.5 Blog Server-Side Search

**Business value**: Blog search currently only filters the current page. Users cannot find posts.

**Implementation**:
```php
// BlogPostController::index()
$query = BlogPost::published()->with(['author', 'category', 'tags']);

if ($search = $request->get('search')) {
    $query->where(function($q) use ($search) {
        $q->where('title', 'like', "%{$search}%")
          ->orWhere('excerpt', 'like', "%{$search}%")
          ->orWhere('content', 'like', "%{$search}%");
    });
}

if ($category = $request->get('category')) {
    $query->where('category_id', $category);
}
```
- Update `Blog/Index.tsx` to use Inertia's `router.get()` on search change (with debounce)
- Pass search and category as preserved query params

**Files affected**: `BlogPostController`, `Blog/Index.tsx`

**Complexity**: Low (half a day)

---

### Priority 3 — Scalability

#### 3.1 File Storage & Image Upload

**Business value**: Every model has an `image` field but there is no mechanism to store images. Content creation is blocked.

**Implementation**:
- Configure `FILESYSTEM_DISK=s3` for production (or local for dev)
- Add image upload endpoints in admin controllers
- Use `Intervention/Image` for resizing: generate thumbnail + full size
- Store paths in DB, serve via signed URLs or public storage
- Consider Cloudflare Images or BunnyCDN for an NGO's budget

**Files affected**: All admin controllers, `config/filesystems.php`, new `ImageService`

**Complexity**: Medium (2-3 days)

---

#### 3.2 Roles & Permissions System

**Business value**: A real NGO has editors, admins, volunteers, donors — all with different access levels.

**Recommended approach**:
- Add `role` enum to users: `admin`, `editor`, `user`
- For more granular control: integrate `spatie/laravel-permission`
- Role-based middleware for admin routes
- React: Pass user role in shared Inertia props, conditionally render admin nav items

**Files affected**: `users` migration, `User` model, `HandleInertiaRequests`, new middleware

**Complexity**: Low-Medium (1-2 days)

---

#### 3.3 API Layer for Mobile Readiness

**Business value**: If the organization ever builds a mobile app or third-party integrations, there is no API.

**Implementation**:
- Create `routes/api.php` with versioned routes: `/api/v1/`
- Apply `ActionResource` (already exists!) and create equivalents for BlogPost, Program
- Add API token authentication (Laravel Sanctum)
- Document with Scribe or L5-Swagger

**Files affected**: `routes/api.php`, new API controllers, new Resource classes

**Complexity**: Medium (3-4 days)

---

### Priority 4 — UX Improvements

#### 4.1 Donation Thank You Page

**Business value**: The current "thank you" page renders the donation form again — confusing and unprofessional.

**Fix**: Create a dedicated `resources/js/pages/marketing/Engage/DonationThankYou.tsx` and update the `donation.thank-you` route to render it with donor name/amount props passed from the redirect.

**Complexity**: Low (2 hours)

---

#### 4.2 Newsletter Subscription Standalone Module

**Business value**: The blog index has a newsletter signup section. Donation form has a newsletter checkbox. These are disconnected.

**Implementation**:
- `newsletter_subscribers` table: `email`, `source`, `status`
- `NewsletterController::store()` — handles both sources
- Integration with Brevo (Sendinblue), Mailchimp, or self-hosted Listmonk

**Complexity**: Low-Medium (1 day + provider setup)

---

#### 4.3 Social Sharing on Blog Posts

**Business value**: NGOs depend on content virality for awareness. Blog posts have no sharing mechanism.

**Implementation**:
- Add Open Graph meta tags to `Blog/Details.tsx` via Inertia Head
- Add Twitter/X, Facebook, WhatsApp share buttons (pure URL construction, no SDK needed)
- Add canonical URL meta tag

**Complexity**: Low (2-3 hours)

---

#### 4.4 Proper Error Pages (404, 500)

**Business value**: Programs, Products, Projects pages are empty. 404s are generic Laravel defaults.

**Implementation**:
- Custom `resources/views/errors/404.blade.php` with NGO branding
- Inertia-aware error handling in `bootstrap/app.php`

**Complexity**: Low (2-3 hours)

---

### Priority 5 — Developer Experience

#### 5.1 Database Seeders for Development

**Business value**: Developers cannot work without data. Currently only one test user exists.

**Needed seeders**:
- `CategorySeeder` — 5-6 action categories
- `ActionSeeder` — 10-15 sample actions with galleries
- `BlogPostSeeder` — 10 posts with categories and tags
- `ProgramSeeder`, `ProjectSeeder` (once models exist)
- `UserSeeder` — admin user + editor user

**Files affected**: `database/seeders/`, `database/factories/`

**Complexity**: Low (1 day)

---

#### 5.2 Shared TypeScript Domain Types

**Business value**: Types are redefined per component. Refactoring models causes silent type drift.

**Implementation**:
```typescript
// resources/js/types/domain.ts
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  published_at: string;
  read_time: string | null;
  author: User;
  category: Category;
  tags: Tag[];
}
// etc.
```

**Complexity**: Low (half a day)

---

#### 5.3 Test Coverage

**Business value**: Zero tests exist. Any refactoring is a gamble.

**Priority tests to write**:
- `DonateControllerTest` — validation rules, creation, status
- `BlogPostControllerTest` — auth protection on write routes, public read
- `ContactMessageTest` — service create + controller integration
- `VolunteerTest` (once backend exists)
- React: Vitest + Testing Library for form components

**Files affected**: `tests/Feature/`, `tests/Unit/`

**Complexity**: Medium (ongoing — 1-2 weeks for baseline)

---

## Technical Debt

| Item | Severity | Location |
|---|---|---|
| `BlogPostCategory` model is dead code duplicate | High | `app/Models/BlogPostCategory.php` |
| `ActionController` never queries `Action` model | High | `ActionController::show()` |
| `routes/web.php` has inline `Inertia::render()` closures | Medium | Lines for projects, donation thank-you |
| `StoreBlogPostRequest` exists but is unused in controller | Medium | `BlogPostController::store()` uses inline validation |
| Hardcoded stats in `HomeController` | High | `HomeController::stats()` |
| Hardcoded featured projects in `HomeController` | High | `HomeController::featuredProjects()` |
| Hardcoded recent news in `HomeController` | High | `HomeController::recentNews()` |
| WaterHealthController is 500+ lines of hardcoded educational content | Medium | Belongs in a CMS table |
| No shared TypeScript types for domain models | Medium | All page components |
| `donations` migration is untracked in git | Critical | `database/migrations/2026_05_06_*` |
| `categories` table used for both actions AND blog posts | Medium | Conceptual ambiguity |
| Dark mode toggle in settings does nothing visible | Low | `appearance.tsx` |

---

## Refactoring Roadmap

### Sprint 1 (Week 1-2): Security & Data Integrity

1. Add `auth` middleware to blog write routes
2. Sanitize `dangerouslySetInnerHTML` with DOMPurify
3. Add `rate limiting` to donation and contact routes
4. Commit and run `donations` migration
5. Remove `BlogPostCategory` dead model
6. Move inline `Inertia::render()` closures to proper controllers

### Sprint 2 (Week 3-4): Connect Real Data

1. Replace hardcoded actions with DB queries in `ActionController`
2. Replace hardcoded stats/projects/news in `HomeController`
3. Implement volunteer backend (migration + model + controller + route)
4. Fix blog server-side search
5. Fix donation thank-you page

### Sprint 3 (Week 5-6): Content Management Foundation

1. Add `role` field to users
2. Create admin middleware
3. Build admin dashboard with blog post CRUD (rich text editor)
4. Build action/campaign CRUD in admin
5. Image upload system with storage

### Sprint 4 (Week 7-8): Engagement Flows

1. Integrate payment processor (PayDunya/CinetPay)
2. Build email notification system
3. Implement newsletter module
4. Programs/Products/Projects models + admin CRUD + public pages

### Sprint 5 (Week 9-10): Polish & Production

1. SEO: Open Graph, structured data (JSON-LD), canonical URLs
2. Performance: page-level caching, image optimization
3. Error pages (404, 500) with NGO branding
4. Test coverage baseline (Feature tests for all controllers)
5. Seeder suite for development environment

---

## Production Readiness

| Category | Status | Notes |
|---|---|---|
| Authentication | Ready | Fortify + 2FA is solid |
| Blog (read) | Ready (with XSS fix) | After sanitizing `dangerouslySetInnerHTML` |
| Blog (write) | Not ready | No auth protection, no admin UI |
| Contact form | Ready | Complete with service + validation |
| Donations | Not ready | No payment processor, `pending` forever |
| Volunteer form | Not ready | No backend, data is lost |
| Actions pages | Not ready | All data is hardcoded fake |
| Programs/Products/Projects | Not ready | Empty pages |
| Homepage | Misleading | Fake impact statistics |
| Admin panel | Not ready | Does not exist |
| Email system | Not ready | No notifications sent |
| File uploads | Not ready | No upload pipeline |
| Tests | Not ready | Zero tests |
| Error handling | Minimal | Default Laravel errors |
| Monitoring | Not ready | No Sentry, no logging |

**Production readiness score: 3/10**

The application is safe to deploy as a read-only informational site (mission, values, water health education, blog). It should NOT be promoted to donors or volunteers until payments and form backends are functional.

---

## Final Verdict

AsproQualee is being built by someone who knows how to write clean code. The architecture choices are sensible, the component library is mature, and the data models are well-designed. The problem is not code quality — it's **completion rate**.

The scaffold is excellent. Roughly 35% of the intended functionality exists in a working state. The remaining 65% is either:
- A beautiful form that silently discards its data
- A page that shows fabricated content as if it were real
- A database table with no application layer above it
- A UI section that leads to an empty page

For an NGO whose mission is environmental protection and whose funding depends on donor trust, **shipping fake impact statistics on a homepage is a reputational risk**. The donation form appearing to accept money but never processing it is a legal risk.

**Immediate action items (this week)**:
1. Fix the blog auth vulnerability
2. Sanitize blog content rendering
3. Commit the donations migration
4. Either remove or stub the volunteer submit button (prevent 404s)
5. Either connect the homepage stats to real data or clearly label them as targets/goals

**Then**: Build the admin panel. Everything else depends on it.
