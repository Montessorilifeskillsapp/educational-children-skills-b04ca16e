import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  productId: string;
  currentImage: string;
  onImageChange: (productId: string, imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  productId,
  currentImage,
  onImageChange
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Convert to base64 for local storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageChange(productId, result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlInput = (url: string) => {
    if (url.trim()) {
      onImageChange(productId, url.trim());
    }
  };

  return (
    <div className="space-y-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <p className="text-sm font-medium text-blue-800 mb-2">
        Customize Product Image
      </p>
      
      <div className="flex gap-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          id={`file-${productId}`}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => document.getElementById(`file-${productId}`)?.click()}
          disabled={isUploading}
          className="flex-1"
        >
          <Upload className="w-4 h-4 mr-1" />
          {isUploading ? 'Uploading...' : 'Upload File'}
        </Button>
      </div>
      
      <Input
        placeholder="Or paste image URL here"
        onBlur={(e) => handleUrlInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleUrlInput(e.currentTarget.value)}
        className="text-sm"
      />
    </div>
  );
};

export default ImageUploader;