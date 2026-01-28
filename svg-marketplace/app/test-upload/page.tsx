'use client'

import { useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TestUploadPage() {
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Marketplace
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Image Upload Test</h1>
          <p className="text-gray-600 mb-8">
            Test the image upload functionality before integrating into your marketplace.
          </p>

          <div className="space-y-6">
            <ImageUpload
              images={images}
              onImagesChange={setImages}
              maxImages={5}
              compress={true}
            />

            {images.length > 0 && (
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Uploaded Images ({images.length})</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(images, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Setup Status</h2>
              <div className="space-y-3">
                <StatusItem
                  label="Cloudinary Cloud Name"
                  value={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                />
                <StatusItem
                  label="Upload Preset"
                  value={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                />
              </div>

              {(!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
                !process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="font-semibold text-yellow-900 mb-2">⚠️ Configuration Required</p>
                  <p className="text-sm text-yellow-800 mb-3">
                    Image upload is not configured. Follow these steps:
                  </p>
                  <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
                    <li>Create a Cloudinary account (free)</li>
                    <li>Create an unsigned upload preset</li>
                    <li>Add credentials to <code className="bg-yellow-100 px-1">.env.local</code></li>
                    <li>Restart the dev server</li>
                  </ol>
                  <p className="text-sm text-yellow-800 mt-3">
                    See <code className="bg-yellow-100 px-1">IMAGE_UPLOAD_GUIDE.md</code> for detailed instructions.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusItem({ label, value }: { label: string; value?: string }) {
  const isConfigured = !!value;
  
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
      <span className="font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-2">
        {isConfigured ? (
          <>
            <span className="text-sm text-gray-600 font-mono">{value}</span>
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
              ✓ Configured
            </span>
          </>
        ) : (
          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
            ✗ Not Set
          </span>
        )}
      </div>
    </div>
  );
}
