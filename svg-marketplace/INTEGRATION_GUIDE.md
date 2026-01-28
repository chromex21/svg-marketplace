# How to Integrate Image Upload into Your Marketplace

## Quick Integration

The ImageUpload component is ready to use. Here's how to integrate it into your existing CreateListingForm:

### Step 1: Import the Component

```tsx
import ImageUpload from '@/components/ImageUpload';
// or
import ImageUploadStep from '@/components/ImageUploadStep';
```

### Step 2: Add to Form State

In your `CreateListingForm` component, modify the `formData` state:

```tsx
const [formData, setFormData] = useState({
  title: '',
  price: '',
  condition: 'Brand New',
  category: 'Electronics',
  description: '',
  listingType: 'regular',
  images: [],  // ← ADD THIS
  specs: {},
  seller: { /* ... */ }
});
```

### Step 3: Add Image Upload Step

Modify your step flow to include images. Change from 3 steps to 4:

```tsx
// Step 1: Basic Info
// Step 2: Images ← NEW
// Step 3: Specifications  
// Step 4: Contact Info
```

### Step 4: Add ImageUploadStep Component

After Step 1 (Basic Info), add:

```tsx
{/* Step 2: Images */}
{step === 2 && (
  <ImageUploadStep
    images={formData.images}
    onImagesChange={(images) => setFormData({ ...formData, images })}
    onNext={() => setStep(3)}
    onBack={() => setStep(1)}
  />
)}
```

### Step 5: Update Progress Indicators

Change your progress steps from [1, 2, 3] to [1, 2, 3, 4]:

```tsx
{[1, 2, 3, 4].map((s) => (
  // ... progress indicator
))}
```

### Step 6: Update Step Transitions

Update all "Next" button clicks to account for new step:

```tsx
// Step 1
onClick={() => setStep(2)}  // was setStep(2)

// Step 2 (Images)
onClick={() => setStep(3)}  // NEW

// Step 3 (Specs)  
onClick={() => setStep(4)}  // was setStep(3)
onBack={() => setStep(2)}   // was setStep(1)
```

## Complete Example

Here's a simplified example of the updated CreateListingForm:

```tsx
const CreateListingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    images: [],  // NEW
    // ... other fields
  });

  return (
    <div>
      {/* Progress: 4 steps instead of 3 */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={step >= s ? 'active' : 'inactive'}>
            {s}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div>
          {/* Your existing Step 1 content */}
          <button onClick={() => setStep(2)}>Next: Add Images</button>
        </div>
      )}

      {/* Step 2: Images - NEW! */}
      {step === 2 && (
        <ImageUploadStep
          images={formData.images}
          onImagesChange={(imgs) => setFormData({ ...formData, images: imgs })}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {/* Step 3: Specs (was Step 2) */}
      {step === 3 && (
        <div>
          {/* Your existing Step 2 content */}
          <button onClick={() => setStep(2)}>Back</button>
          <button onClick={() => setStep(4)}>Next</button>
        </div>
      )}

      {/* Step 4: Contact (was Step 3) */}
      {step === 4 && (
        <div>
          {/* Your existing Step 3 content */}
          <button onClick={() => setStep(3)}>Back</button>
          <button onClick={handleSubmit}>Publish</button>
        </div>
      )}
    </div>
  );
};
```

## Using Just the ImageUpload Component

If you want more control, use the base component directly:

```tsx
<ImageUpload
  images={formData.images}
  onImagesChange={(images) => setFormData({ ...formData, images })}
  maxImages={5}
  compress={true}
/>
```

## Props

### ImageUpload

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `string[]` | required | Array of image URLs |
| `onImagesChange` | `(images: string[]) => void` | required | Callback when images change |
| `maxImages` | `number` | `5` | Maximum number of images |
| `compress` | `boolean` | `true` | Auto-compress images >1MB |

### ImageUploadStep

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `string[]` | required | Array of image URLs |
| `onImagesChange` | `(images: string[]) => void` | required | Callback when images change |
| `onNext` | `() => void` | required | Next step callback |
| `onBack` | `() => void` | required | Previous step callback |

## Testing Without Cloudinary

For testing, you can use placeholder images:

```tsx
const [formData, setFormData] = useState({
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
  ],
  // ... other fields
});
```

## Error Handling

The component handles all errors internally and displays them to users:

- File size validation (5MB max)
- File type validation (JPG, PNG, WebP, GIF)
- Upload errors with retry button
- Network errors
- Configuration errors

No additional error handling needed in parent component!

## Styling

The component uses Tailwind CSS and matches your app's design. To customize:

1. Colors: Edit the component file
2. Size: Adjust `maxImages` prop
3. Layout: Grid is responsive (2 cols mobile, 3 cols desktop)

## Performance

- Images are compressed before upload (if >1MB)
- Uploads happen in parallel
- Progress bars show real-time status
- Failed uploads don't block others

Enjoy! 🎉
