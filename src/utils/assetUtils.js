import { supabase } from './supabase';

// Function to get public URL for an asset from Supabase storage
export const getAssetUrl = async (assetPath) => {
  try {
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