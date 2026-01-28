# Image Upload Flow

## User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    User Opens Form                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Navigate to Images Step                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
    ┌────────────────┐      ┌────────────────┐
    │  Click Upload  │      │  Drag & Drop   │
    └────────┬───────┘      └────────┬───────┘
             │                       │
             └───────────┬───────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Select Files                                │
│            (1-5 images, <5MB each)                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Validate Files                                  │
│   • Check size (<5MB)                                       │
│   • Check type (JPG/PNG/WebP/GIF)                          │
│   • Check count (<= max)                                    │
└────────────────────────┬────────────────────────────────────┘
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
    ┌────────────────┐      ┌────────────────┐
    │  Valid Files   │      │  Invalid Files │
    └────────┬───────┘      └────────┬───────┘
             │                       │
             │                       ▼
             │              ┌────────────────┐
             │              │  Show Error    │
             │              │  with Details  │
             │              └────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│              Compress Images (if >1MB)                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                Upload to Cloudinary                          │
│            Show Progress: 0% → 100%                         │
└────────────────────────┬────────────────────────────────────┘
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
    ┌────────────────┐      ┌────────────────┐
    │    Success     │      │     Failed     │
    └────────┬───────┘      └────────┬───────┘
             │                       │
             ▼                       ▼
    ┌────────────────┐      ┌────────────────┐
    │  Show Preview  │      │  Show Error +  │
    │  with ✓ Icon   │      │  Retry Button  │
    └────────┬───────┘      └────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│              Save URLs to Form State                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│               Continue to Next Step                          │
└─────────────────────────────────────────────────────────────┘
```

## Technical Flow

```
┌─────────────────────────────────────────────────────────────┐
│                 ImageUpload Component                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              handleFiles(files)                              │
│   • FileList from input or drop                            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│           Validation Loop (for each file)                    │
│                                                              │
│   validateImage(file)                                       │
│   ├─ Check size: file.size <= 5MB                          │
│   ├─ Check type: ALLOWED_TYPES.includes(file.type)         │
│   └─ Return: { valid: boolean, error?: string }            │
└────────────────────────┬────────────────────────────────────┘
                         │
             ┌───────────┴───────────┐
             │                       │
        Valid Files            Invalid Files
             │                       │
             ▼                       ▼
    ┌────────────────┐      ┌────────────────┐
    │   Continue     │      │  Update State  │
    │                │      │  with Error    │
    └────────┬───────┘      └────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│          Compression (if enabled && >1MB)                    │
│                                                              │
│   compressImage(file, maxWidth, quality)                   │
│   ├─ Create Image element                                   │
│   ├─ Draw to Canvas (resized)                              │
│   ├─ Convert to Blob                                        │
│   └─ Return: compressed File                                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│         uploadToCloudinary(file, onProgress)                │
│                                                              │
│   1. Create FormData                                        │
│   2. Append file                                            │
│   3. Append upload_preset                                   │
│   4. Append folder                                          │
│                                                              │
│   5. XMLHttpRequest                                         │
│      ├─ POST to Cloudinary API                             │
│      ├─ Track upload.progress                               │
│      ├─ Call onProgress callback                            │
│      └─ Handle load/error/abort                             │
│                                                              │
│   6. Parse Response                                         │
│      ├─ Extract secure_url                                  │
│      ├─ Extract public_id                                   │
│      └─ Return: UploadResult                                │
└────────────────────────┬────────────────────────────────────┘
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
    ┌────────────────┐      ┌────────────────┐
    │  Success       │      │  Failure       │
    │  (status 200)  │      │  (status 4xx)  │
    └────────┬───────┘      └────────┬───────┘
             │                       │
             ▼                       ▼
    ┌────────────────┐      ┌────────────────┐
    │  Update State  │      │  Update State  │
    │  url: result   │      │  error: msg    │
    │  progress: 100 │      │  with Retry    │
    └────────┬───────┘      └────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│           onImagesChange(newUrls[])                         │
│     • Parent component receives URLs                        │
│     • Saves to form state                                   │
└─────────────────────────────────────────────────────────────┘
```

## State Management

```
Component State:
├─ imageStates: ImageState[]
│  └─ Each image:
│     ├─ url: string
│     ├─ uploading: boolean
│     ├─ progress: number (0-100)
│     └─ error?: string
│
├─ dragActive: boolean
├─ globalError: string | null
└─ fileInputRef: RefObject<HTMLInputElement>

Props:
├─ images: string[]              (from parent)
├─ onImagesChange: (urls) => void (to parent)
├─ maxImages: number
└─ compress: boolean
```

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Error Occurs                              │
└────────────────────────┬────────────────────────────────────┘
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
    ┌────────────────┐      ┌────────────────┐
    │ Validation     │      │  Upload        │
    │ Error          │      │  Error         │
    └────────┬───────┘      └────────┬───────┘
             │                       │
             ▼                       ▼
    ┌────────────────┐      ┌────────────────┐
    │ Show in UI     │      │ Show in UI     │
    │ • Red badge    │      │ • Red overlay  │
    │ • Error msg    │      │ • Error msg    │
    │ • No retry     │      │ • Retry button │
    └────────────────┘      └────────┬───────┘
                                     │
                                     ▼
                            ┌────────────────┐
                            │  User Clicks   │
                            │  Retry Button  │
                            └────────┬───────┘
                                     │
                                     ▼
                            ┌────────────────┐
                            │  Restart       │
                            │  Upload        │
                            └────────────────┘
```

## Component Hierarchy

```
CreateListingForm
  └─ ImageUploadStep
      ├─ Photography Tips
      ├─ ImageUpload
      │   ├─ Upload Area
      │   │   ├─ Drag & Drop Zone
      │   │   ├─ File Input (hidden)
      │   │   └─ Upload Icon + Text
      │   │
      │   ├─ Global Error Alert
      │   │
      │   └─ Image Grid
      │       └─ For each image:
      │           ├─ Image Preview
      │           ├─ Progress Overlay (if uploading)
      │           ├─ Error Overlay (if failed)
      │           ├─ Success Badge (if done)
      │           └─ Remove Button
      │
      └─ Navigation Buttons
          ├─ Back Button
          └─ Next Button (disabled if no images)
```

## Data Flow

```
User Action
    │
    ▼
Local Handler (onChange, onDrop)
    │
    ▼
handleFiles(files)
    │
    ├─ Validate
    ├─ Compress
    ├─ Upload
    └─ Track Progress
    │
    ▼
Update Local State (imageStates)
    │
    ▼
Render UI Updates
    │
    ▼
On Success: Call onImagesChange(urls)
    │
    ▼
Parent Updates Form State
    │
    ▼
Data Ready for Submit
```

## File Naming Convention

```
Original:  IMG_1234.jpg
Cloudinary: /svg-marketplace/abc123xyz.jpg

Where:
- svg-marketplace = folder (from config)
- abc123xyz = unique ID (from Cloudinary)
- .jpg = original extension
```

## Upload States

```
IDLE
  └─ No upload in progress
  └─ UI shows upload area

VALIDATING
  └─ Checking file size/type
  └─ UI shows "Checking..."

COMPRESSING
  └─ Reducing file size
  └─ UI shows "Optimizing..."

UPLOADING
  └─ Sending to Cloudinary
  └─ UI shows progress bar (0-100%)

SUCCESS
  └─ Upload complete
  └─ UI shows ✓ and preview

ERROR
  └─ Upload failed
  └─ UI shows ⚠ and retry button
```

