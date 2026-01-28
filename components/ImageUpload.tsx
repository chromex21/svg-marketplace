'use client'

import React, { useState, useRef } from 'react';
import { Upload, X, AlertCircle, CheckCircle, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadToCloudinary, validateImage, compressImage, type UploadProgress } from '@/lib/imageUpload';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  compress?: boolean;
}

interface ImageState {
  url: string;
  uploading: boolean;
  progress: number;
  error?: string;
}

export default function ImageUpload({ 
  images, 
  onImagesChange, 
  maxImages = 5,
  compress = true 
}: ImageUploadProps) {
  const [imageStates, setImageStates] = useState<ImageState[]>(
    images.map(url => ({ url, uploading: false, progress: 100 }))
  );
  const [dragActive, setDragActive] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setGlobalError(null);

    // Check total images limit
    const currentCount = imageStates.length;
    const newCount = files.length;
    
    if (currentCount + newCount > maxImages) {
      setGlobalError(`Maximum ${maxImages} images allowed. You can add ${maxImages - currentCount} more.`);
      return;
    }

    // Create placeholder states for new images
    const newStates: ImageState[] = Array.from(files).map(() => ({
      url: '',
      uploading: true,
      progress: 0,
    }));

    setImageStates(prev => [...prev, ...newStates]);

    // Upload each file
    const uploadPromises = Array.from(files).map(async (file, index) => {
      const stateIndex = currentCount + index;

      try {
        // Validate file
        const validation = validateImage(file);
        if (!validation.valid) {
          setImageStates(prev => {
            const updated = [...prev];
            updated[stateIndex] = {
              ...updated[stateIndex],
              uploading: false,
              error: validation.error,
            };
            return updated;
          });
          return null;
        }

        // Compress if enabled
        let fileToUpload = file;
        if (compress && file.size > 1024 * 1024) { // Compress if > 1MB
          try {
            fileToUpload = await compressImage(file);
          } catch (error) {
            console.warn('Compression failed, using original:', error);
          }
        }

        // Upload to Cloudinary
        const result = await uploadToCloudinary(fileToUpload, (progress: UploadProgress) => {
          setImageStates(prev => {
            const updated = [...prev];
            updated[stateIndex] = {
              ...updated[stateIndex],
              progress: progress.percentage,
            };
            return updated;
          });
        });

        if (result.success && result.url) {
          setImageStates(prev => {
            const updated = [...prev];
            updated[stateIndex] = {
              url: result.url!,
              uploading: false,
              progress: 100,
            };
            return updated;
          });
          return result.url;
        } else {
          setImageStates(prev => {
            const updated = [...prev];
            updated[stateIndex] = {
              ...updated[stateIndex],
              uploading: false,
              error: result.error || 'Upload failed',
            };
            return updated;
          });
          return null;
        }
      } catch (error) {
        setImageStates(prev => {
          const updated = [...prev];
          updated[stateIndex] = {
            ...updated[stateIndex],
            uploading: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
          return updated;
        });
        return null;
      }
    });

    // Wait for all uploads and update parent
    const results = await Promise.all(uploadPromises);
    const successfulUrls = results.filter((url): url is string => url !== null);
    
    if (successfulUrls.length > 0) {
      const allUrls = [...images, ...successfulUrls];
      onImagesChange(allUrls);
    }

    // Remove failed uploads from state
    setImageStates(prev => prev.filter(state => !state.error));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    setImageStates(prev => prev.filter((_, i) => i !== index));
  };

  const retryUpload = (index: number) => {
    setImageStates(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        uploading: true,
        progress: 0,
        error: undefined,
      };
      return updated;
    });
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {imageStates.length < maxImages && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
            onChange={handleChange}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>

            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Click to upload
              </button>
              <span className="text-gray-600"> or drag and drop</span>
            </div>

            <p className="text-sm text-gray-500">
              PNG, JPG, WebP or GIF (max 5MB each)
            </p>

            <p className="text-xs text-gray-400">
              {imageStates.length} / {maxImages} images uploaded
            </p>
          </div>
        </div>
      )}

      {/* Global Error */}
      {globalError && (
        <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">Upload Error</p>
            <p className="text-sm text-red-700">{globalError}</p>
          </div>
          <button
            onClick={() => setGlobalError(null)}
            className="ml-auto text-red-600 hover:text-red-700"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Image Grid */}
      {imageStates.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {imageStates.map((state, index) => (
            <div
              key={index}
              className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group"
            >
              {/* Image or Placeholder */}
              {state.url ? (
                <img
                  src={state.url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}

              {/* Uploading Overlay */}
              {state.uploading && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                  <div className="w-3/4 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${state.progress}%` }}
                    />
                  </div>
                  <p className="text-white text-sm font-medium">{state.progress}%</p>
                </div>
              )}

              {/* Error Overlay */}
              {state.error && (
                <div className="absolute inset-0 bg-red-900/90 flex flex-col items-center justify-center gap-2 p-4">
                  <AlertCircle className="w-8 h-8 text-white" />
                  <p className="text-white text-xs text-center">{state.error}</p>
                  <button
                    onClick={() => retryUpload(index)}
                    className="px-3 py-1 bg-white text-red-900 rounded text-sm font-semibold hover:bg-gray-100"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Success Indicator */}
              {state.url && !state.uploading && !state.error && (
                <div className="absolute top-2 left-2 bg-green-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition">
                  <CheckCircle size={16} />
                </div>
              )}

              {/* Remove Button */}
              {state.url && !state.uploading && (
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-red-700"
                >
                  <X size={16} />
                </button>
              )}

              {/* Image Number Badge */}
              {state.url && !state.uploading && !state.error && (
                <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-semibold">
                  {index + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Help Text */}
      {imageStates.length === 0 && (
        <p className="text-sm text-gray-500 text-center">
          Add up to {maxImages} images to showcase your product
        </p>
      )}
    </div>
  );
}
