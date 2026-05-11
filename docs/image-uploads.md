# Image Upload Implementation Guide

> All image fields currently store URL strings. This guide covers the full
> implementation to replace them with real file uploads backed by Laravel Storage.

---

## 1. Recommended Library

**Spatie Laravel Media Library** (`spatie/laravel-medialibrary`)

- Handles storage, conversions, responsive images, and collections per model
- Generates optimised variants (thumbnail, webp) automatically
- Works with local disk and S3/R2/DigitalOcean Spaces

```bash
composer require spatie/laravel-medialibrary
php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-migrations"
php artisan migrate
```

---

## 2. Image Compression

### Server-side (required)

```bash
composer require spatie/image          # already a dependency of media library
```

Ensure the following binaries are installed on the server:

```bash
# Ubuntu/Debian
apt-get install jpegoptim optipng pngquant gifsicle webp libavif-dev
```

### npm / frontend (optional, for previews)

```bash
npm install browser-image-compression
```

Use before sending the file to the server to reduce upload size:

```ts
import imageCompression from 'browser-image-compression';

const compressed = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
});
```

---

## 3. Storage Configuration

### `config/filesystems.php` — add a public disk for uploads

```php
'uploads' => [
    'driver' => 'local',
    'root'   => storage_path('app/public/uploads'),
    'url'    => env('APP_URL') . '/storage/uploads',
    'visibility' => 'public',
],
```

Run once to symlink storage:

```bash
php artisan storage:link
```

### `.env` additions

```env
# Local (default)
FILESYSTEM_DISK=public

# For production with S3-compatible (e.g. DigitalOcean Spaces / Cloudflare R2)
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=
AWS_URL=
AWS_ENDPOINT=
```

---

## 4. Model Changes

For each model that has an image (Action, BlogPost, Program, Product, Project),
add the `InteractsWithMedia` trait and register collections:

```php
// Example: app/Models/Product.php
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Product extends Model implements HasMedia
{
    use InteractsWithMedia;

    // Remove the 'image' column from $fillable once migrated

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('image')
             ->singleFile()                        // replaces existing on update
             ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
             ->width(400)
             ->height(400)
             ->format('webp')
             ->nonQueued();

        $this->addMediaConversion('card')
             ->width(800)
             ->height(600)
             ->format('webp')
             ->nonQueued();

        $this->addMediaConversion('og')          // Open Graph / social sharing
             ->width(1200)
             ->height(630)
             ->format('webp')
             ->nonQueued();
    }
}
```

Apply the same pattern to: `Action`, `BlogPost`, `Program`, `Project`.

For `Action` (which has a gallery), register a second collection:

```php
$this->addMediaCollection('gallery')
     ->acceptsMimeTypes(['image/jpeg', 'image/png', 'image/webp']);
```

---

## 5. Migration Changes

For each model with an `image` column, rename it to keep the old URL as
fallback during transition, then remove it in a second migration once all
records are migrated:

```php
// Phase 1: make image nullable (already done on most models)
$table->string('image')->nullable()->change();

// Phase 2 (after migrating all records to media library): drop the column
$table->dropColumn('image');
```

### New migration to add temporary `legacy_image` column

```php
Schema::table('products', function (Blueprint $table) {
    $table->renameColumn('image', 'legacy_image');
});
// Repeat for: actions, blog_posts, programs, projects
```

---

## 6. Controller Changes

### Store (create)

```php
public function store(Request $request)
{
    $validated = $request->validate([
        'name'  => 'required|string|max:255',
        'image' => 'nullable|image|mimes:jpeg,png,webp,avif|max:5120', // 5 MB
        // ... other fields
    ]);

    $product = Product::create($validated);

    if ($request->hasFile('image')) {
        $product->addMediaFromRequest('image')
                ->toMediaCollection('image');
    }

    return redirect('/admin/products');
}
```

### Update

```php
if ($request->hasFile('image')) {
    // singleFile() collection auto-clears the previous file
    $product->addMediaFromRequest('image')
            ->toMediaCollection('image');
}
```

### Resource / serialisation

Replace `'image' => $this->image` with:

```php
'image'       => $this->getFirstMediaUrl('image', 'card'),
'image_thumb' => $this->getFirstMediaUrl('image', 'thumb'),
'image_og'    => $this->getFirstMediaUrl('image', 'og'),
```

---

## 7. Frontend Changes

### Form (Inertia `useForm`)

```tsx
import { useForm } from '@inertiajs/react';

const { data, setData, post, processing } = useForm({
    name:  '',
    image: null as File | null,
    // ...
});

// File input
<input
    type="file"
    accept="image/jpeg,image/png,image/webp"
    onChange={e => setData('image', e.target.files?.[0] ?? null)}
/>

// Submit — must use post() (multipart/form-data) or forceFormData
const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
        post(`/admin/products/${product.id}?_method=PUT`);   // method spoofing
    } else {
        post('/admin/products');
    }
};
```

**Important:** Inertia does not support `router.put()` with files. Use
`post()` with `?_method=PUT` or enable `forceFormData` on `router.put()`:

```ts
router.post(url, data, { forceFormData: true });
```

Or in Laravel route, use `Route::post` + `@method('PUT')` blade style:
add `_method=PUT` as a hidden field.

### Image preview before upload

```tsx
const [preview, setPreview] = useState<string | null>(product?.image ?? null);

const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setData('image', file);
    setPreview(URL.createObjectURL(file));
};

{preview && (
    <img src={preview} className="mt-2 h-32 w-32 rounded-xl object-cover" />
)}
```

---

## 8. Validation Rules (Backend)

```php
'image' => [
    'nullable',
    'image',
    'mimes:jpeg,jpg,png,webp,avif',
    'max:5120',          // 5 MB — compress on frontend before sending
    'dimensions:min_width=200,min_height=200,max_width=6000,max_height=6000',
],
```

---

## 9. Files to Create / Modify (Summary)

| File | Action |
|------|--------|
| `composer.json` | Add `spatie/laravel-medialibrary` |
| `config/filesystems.php` | Add `uploads` disk |
| `.env` | Add storage config |
| `app/Models/Action.php` | Add `HasMedia` + collections |
| `app/Models/BlogPost.php` | Add `HasMedia` + collections |
| `app/Models/Program.php` | Add `HasMedia` + collections |
| `app/Models/Product.php` | Add `HasMedia` + collections |
| `app/Models/Project.php` | Add `HasMedia` + collections |
| `app/Http/Resources/ActionResource.php` | Return media URLs |
| `app/Http/Controllers/Admin/AdminActionController.php` | Handle file in store/update |
| `app/Http/Controllers/Admin/AdminBlogController.php` | Handle file in store/update |
| `app/Http/Controllers/Admin/AdminProgramController.php` | Handle file in store/update |
| `app/Http/Controllers/Admin/AdminProductController.php` | Handle file in store/update |
| `app/Http/Controllers/Admin/AdminProjectController.php` | Handle file in store/update |
| `resources/js/pages/admin/Actions/Form.tsx` | Add file input + preview |
| `resources/js/pages/admin/Blog/Form.tsx` | Add file input + preview |
| `resources/js/pages/admin/Programs/Form.tsx` | Add file input + preview |
| `resources/js/pages/admin/Products/Form.tsx` | Add file input + preview |
| `resources/js/pages/admin/Projects/Form.tsx` | Add file input + preview |
| `database/migrations/..._rename_image_columns.php` | Phase 1 rename |
| `database/migrations/..._drop_legacy_image_columns.php` | Phase 2 cleanup |

---

## 10. Queue Setup (Recommended for Production)

Media conversions can be queued to avoid blocking the HTTP response:

```php
// Remove ->nonQueued() from registerMediaConversions()
// Then dispatch the queue worker:
php artisan queue:work --queue=media
```

Add to `supervisor` or `render.com` worker config for production.

---

## 11. Checklist Before Going Live

- [ ] `php artisan storage:link` run on server
- [ ] `storage/app/public` writable by web user
- [ ] S3 credentials in `.env` (if using cloud storage)
- [ ] Image conversion binaries installed (`jpegoptim`, `optipng`, etc.)
- [ ] Queue worker running for media conversions
- [ ] `APP_URL` set correctly so media URLs resolve
- [ ] Existing URL strings migrated to media library records
