'use client';

import React, { useState, useRef, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, Check, X, Upload } from 'lucide-react';
import Image from 'next/image';
import { SettingsContext } from '@/app/contexts/settings/SettingsContext';
import { useSession } from 'next-auth/react';

const CompanyLogoUpload = () => {
  const settings = useContext(SettingsContext);
  const {data: session, update} = useSession();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [logoUrl, setLogoUrl] = useState<string | null>(settings.companyLogoUrl || null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    handleUpload(file);
  };

  const handleUpload = async (file: File) => {
    setLoading(true);
    setStatus('idle');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/company_logo', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setLogoUrl(data.companyLogoUrl);
        setStatus('success');
        settings.handleUpdate({companyLogoUrl: data.companyLogoUrl});
        await update({
          user: {
            ...session?.user,
            companyLogoUrl: data.companyLogoUrl
          }
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Upload failed');
        setStatus('error');
        setPreview(null);
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      setStatus('error');
      setPreview(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/company_logo', {
        method: 'DELETE',
      });

      if (response.ok) {
        setLogoUrl(null);
        setPreview(null);
        setStatus('success');
        settings.handleUpdate({companyLogoUrl: undefined});
        await update({
          user: {
            ...session?.user,
            companyLogoUrl: undefined
          }
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Delete failed');
        setStatus('error');
      }
    } catch (error) {
      console.error('Error deleting logo:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <Label>Company Logo</Label>
      
      {/* Current logo display */}
      {logoUrl && !preview && (
        <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden group">
          <Image
            src={logoUrl}
            alt="Company Logo"
            fill
            className="object-cover"
          />
          <button
            onClick={handleDelete}
            className="absolute top-0 right-0 p-1 bg-black/50 text-white rounded-bl opacity-0 group-hover:opacity-100 transition-opacity"
            title="Remove logo"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Preview display */}
      {preview && (
        <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden group">
          <Image
            src={preview}
            alt="Logo Preview"
            fill
            className="object-cover"
          />
          <button
            onClick={handleDelete}
            className="absolute top-0 right-0 p-1 bg-black/50 text-white rounded-bl opacity-0 group-hover:opacity-100 transition-opacity"
            title="Remove logo"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Upload button */}
      <Button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="w-full"
        size="sm"
        variant="outline"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {status === 'idle' ? 'Processing...' : 'Deleting...'}
          </>
        ) : status === 'success' ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            {logoUrl ? 'Uploaded!' : 'Removed!'}
          </>
        ) : status === 'error' ? (
          <>
            <X className="mr-2 h-4 w-4" />
            Error
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Logo
          </>
        )}
      </Button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <p className="text-xs text-gray-500">
        Upload an image file (max 5MB)
      </p>
    </div>
  );
};

export default CompanyLogoUpload; 