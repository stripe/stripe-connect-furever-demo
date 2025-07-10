'use client';

import React, {useState, useEffect, useContext} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Loader2, Check, X} from 'lucide-react';
import {useSession} from 'next-auth/react';
import {SettingsContext} from '@/app/contexts/settings/SettingsContext';

const CompanyNameInput = () => {
  const {data: session, update} = useSession();
  const settings = useContext(SettingsContext);
  const [companyName, setCompanyName] = useState(
    settings.companyName || 'Furever'
  );
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName?.trim()) return;

    setLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/company_name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({companyName: companyName.trim()}),
      });

      if (response.ok) {
        settings.handleUpdate({companyName: companyName.trim()});
        await update({
          user: {
            ...session?.user,
            companyName: companyName.trim(),
          },
        });
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error updating company name:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Label htmlFor="company-name">Company Name</Label>
        <Input
          id="company-name"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter your company name"
          maxLength={100}
          disabled={loading}
        />
      </div>
      <Button
        type="submit"
        disabled={loading || !companyName.trim()}
        className="w-full"
        size="sm"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : status === 'success' ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Saved!
          </>
        ) : status === 'error' ? (
          <>
            <X className="mr-2 h-4 w-4" />
            Error
          </>
        ) : (
          'Save Company Name'
        )}
      </Button>
    </form>
  );
};

export default CompanyNameInput;
