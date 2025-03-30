import { supabase } from './supabase';

// Function to get public URL for an asset from Supabase storage
export const getAssetUrl = async (assetPath) => {
  try {
    // Special case for Circular_vector asset
    if (assetPath === 'Circular_vector.svg' || assetPath === 'Circular_vector.png') {
      return 'https://ynmpuwsryqdnjxhesexm.supabase.co/storage/v1/object/sign/brand-assets/Circular_vector.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJicmFuZC1hc3NldHMvQ2lyY3VsYXJfdmVjdG9yLnBuZyIsImlhdCI6MTc0MzMzNDYzMCwiZXhwIjoxNzQzOTM5NDMwfQ.IZpYuey9XEi5Pu-poH3QUq7Be3_ldhVbJhzKNOSMw7M';
    }
    
    const { data: { publicUrl }, error } = supabase
      .storage
      .from('assets')
      .getPublicUrl(assetPath);

    if (error) {
      console.error('Error getting asset URL:', error.message);
      return null;
    }

    return publicUrl;
  } catch (error) {
    console.error('Error getting asset URL:', error.message);
    return null;
  }
};

// Function to upload an asset to Supabase storage
export const uploadAsset = async (file, path) => {
  try {
    const { data, error } = await supabase
      .storage
      .from('assets')
      .upload(path, file);

    if (error) {
      console.error('Error uploading asset:', error.message);
      return null;
    }

    return getAssetUrl(path);
  } catch (error) {
    console.error('Error uploading asset:', error.message);
    return null;
  }
};