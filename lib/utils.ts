import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {Stripe} from 'stripe';
import {stripe} from '@/lib/stripe';
import {defaultPrimaryColor} from '@/app/contexts/themes/ThemeConstants';
import {Session} from 'next-auth';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function resolveStripeDashboardTypeParam(stripeDashboardType: {}): Stripe.AccountCreateParams.Controller.StripeDashboard.Type {
  if (stripeDashboardType === 'none') {
    return 'none';
  } else if (stripeDashboardType === 'express') {
    return 'express';
  } else {
    return 'full';
  }
}

export function resolveControllerParams({
  feePayer,
  paymentLosses,
  stripeDashboardType,
}: {
  feePayer: {};
  paymentLosses: {};
  stripeDashboardType: {};
}): Stripe.AccountCreateParams.Controller {
  return {
    fees: {
      payer: feePayer === 'application' ? 'application' : 'account',
    },
    losses: {
      payments: paymentLosses === 'application' ? 'application' : 'stripe',
    },
    stripe_dashboard: {
      type: resolveStripeDashboardTypeParam(stripeDashboardType),
    },
    requirement_collection:
      paymentLosses === 'application' && stripeDashboardType === 'none'
        ? 'application'
        : 'stripe',
  };
}

/**
 * Converts a hex color to RGBA format with specified opacity
 * @param hex - Hex color string (e.g., "#27AE60")
 * @param opacity - Opacity value between 0 and 1 (e.g., 0.25)
 * @returns RGBA color string
 */
export function hexToRgba(hex: string, opacity: number): string {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Parse RGB values
  const r = parseInt(cleanHex.substr(0, 2), 16);
  const g = parseInt(cleanHex.substr(2, 2), 16);
  const b = parseInt(cleanHex.substr(4, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Calculates a secondary color based on the primary color
 * The secondary color maintains visual contrast while being more subtle
 * @param primaryColor - Primary hex color (e.g., "#27AE60")
 * @param options - Configuration options for the secondary color
 * @returns Secondary color string
 */
export function calculateSecondaryColor(
  primaryColor: string,
  options: {
    opacity?: number;
    darkenAmount?: number;
  } = {}
): string {
  const {opacity = 0.25, darkenAmount = 0.1} = options;

  // Remove # if present
  const cleanHex = primaryColor.replace('#', '');

  // Parse RGB values
  let r = parseInt(cleanHex.substr(0, 2), 16);
  let g = parseInt(cleanHex.substr(2, 2), 16);
  let b = parseInt(cleanHex.substr(4, 2), 16);

  // Slightly darken the color for better contrast
  r = Math.floor(r * (1 - darkenAmount));
  g = Math.floor(g * (1 - darkenAmount));
  b = Math.floor(b * (1 - darkenAmount));

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Converts RGB values to hex color
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Hex color string
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Checks if the user has any custom branding values set
 * @param settings - Settings object containing primaryColor, companyName, and companyLogoUrl
 * @returns true if any custom branding is detected, false otherwise
 */
export function hasCustomBranding(settings: {
  primaryColor?: string;
  companyName?: string;
  companyLogoUrl?: string;
}): boolean {
  const {primaryColor, companyName, companyLogoUrl} = settings;

  // Check if primary color is set and differs from default
  const hasCustomColor = primaryColor && primaryColor !== defaultPrimaryColor;

  // Check if company name is set and differs from default
  const hasCustomName = companyName && companyName !== 'Furever';

  // Check if company logo is set
  const hasCustomLogo = companyLogoUrl && companyLogoUrl !== '';

  return Boolean(hasCustomColor || hasCustomName || hasCustomLogo);
}
