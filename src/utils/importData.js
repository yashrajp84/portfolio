import { supabase } from './supabase';
import { transformProjectData, validateTransformedData } from './transformData';

// Function to import projects data to Supabase
export const importProjectsToSupabase = async (csvFile) => {
  try {
    // Transform CSV data
    const transformedData = await transformProjectData(csvFile);
    
    // Validate transformed data
    const validationErrors = validateTransformedData(transformedData);
    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors
      };
    }

    const results = {
      success: true,
      imported: [],
      errors: []
    };

    // Import each project
    for (const item of transformedData) {
      try {
        // Insert project data
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .insert([item.projects])
          .select();

        if (projectError) {
          results.errors.push({
            project: item.projects.name,
            error: projectError.message
          });
          continue;
        }

        // Insert gallery images
        if (item.gallery.length > 0) {
          const galleryData = item.gallery.map(image => ({
            project_id: projectData[0].id,
            ...image
          }));

          const { error: galleryError } = await supabase
            .from('project_gallery')
            .insert(galleryData);

          if (galleryError) {
            results.errors.push({
              project: item.projects.name,
              error: `Gallery import failed: ${galleryError.message}`
            });
            continue;
          }
        }

        results.imported.push(item.projects.name);
      } catch (error) {
        results.errors.push({
          project: item.projects.name,
          error: error.message
        });
      }
    }

    results.success = results.imported.length > 0;
    return results;
  } catch (error) {
    return {
      success: false,
      error: `Import failed: ${error.message}`
    };
  }
};

// Function to check if tables exist and create them if needed
export const ensureTablesExist = async () => {
  try {
    // Check if projects table exists
    const { error: projectsError } = await supabase
      .from('projects')
      .select('id')
      .limit(1);

    if (projectsError && projectsError.code === '42P01') {
      // Table doesn't exist, create it using the SQL from schema.sql
      const { error } = await supabase.rpc('create_tables');
      if (error) throw error;
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: `Failed to ensure tables exist: ${error.message}`
    };
  }
};