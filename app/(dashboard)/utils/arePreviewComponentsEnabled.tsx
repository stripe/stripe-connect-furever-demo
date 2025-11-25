const arePreviewComponentsEnabled =
  process.env.NEXT_PUBLIC_ENABLE_PREVIEW_COMPONENTS === '1' ||
  process.env.NEXT_PUBLIC_ENABLE_PREVIEW_COMPONENTS?.toLowerCase() === 'true';

export {arePreviewComponentsEnabled};
