'use client'

import React from 'react';
import ImageUpload from './ImageUpload';
import { Camera } from 'lucide-react';

interface ImageUploadStepProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ImageUploadStep({ 
  images, 
  onImagesChange, 
  onNext, 
  onBack 
}: ImageUploadStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <Camera className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-semibold text-blue-900 mb-1">Photography Tips</p>
          <ul className="text-blue-700 space-y-1 list-disc list-inside">
            <li>Use good lighting - natural daylight works best</li>
            <li>Take photos from multiple angles</li>
            <li>Show any defects or wear honestly</li>
            <li>Include original packaging if available</li>
            <li>First image will be the main thumbnail</li>
          </ul>
        </div>
      </div>

      <ImageUpload
        images={images}
        onImagesChange={onImagesChange}
        maxImages={5}
        compress={true}
      />

      <div className="flex gap-4">
        <button
          onClick={onBack}
          type="button"
          className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
        >
          Back
        </button>
        <button
          onClick={onNext}
          type="button"
          disabled={images.length === 0}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {images.length > 0 ? `Continue with ${images.length} image${images.length > 1 ? 's' : ''}` : 'Add at least 1 image'}
        </button>
      </div>

      {images.length === 0 && (
        <p className="text-center text-sm text-gray-500">
          Products with images get 10x more views!
        </p>
      )}
    </div>
  );
}
