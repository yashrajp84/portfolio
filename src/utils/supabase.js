import { createClient } from '@supabase/supabase-js';
import Papa from 'papaparse';

// Initialize Supabase client with database configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials. Please check your environment variables.');
}

// Create Supabase client with additional database options
export const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Function to fetch all projects
export const fetchProjects = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        project_gallery(image_url)
      `);

    if (error) throw error;

    // Transform the data to match the existing projects structure
    return data.map(project => ({
      id: project.id,
      name: project.name,
      category: project.category,
      image: project.image,
      heroImage: project.hero_image,
      backgroundGradient: project.background_gradient,
      client: project.client,
      year: project.year,
      role: project.role,
      technologies: project.technologies,
      description: project.description,
      challenge: project.challenge,
      solution: project.solution,
      gallery: project.project_gallery.map(item => item.image_url),
      testimonial: {
        quote: project.testimonial_quote,
        author: project.testimonial_author
      }
    }));
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    return [];
  }
};

// Function to fetch a single project by ID
export const fetchProjectById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        project_gallery(image_url)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      category: data.category,
      image: data.image,
      heroImage: data.hero_image,
      backgroundGradient: data.background_gradient,
      client: data.client,
      year: data.year,
      role: data.role,
      technologies: data.technologies,
      description: data.description,
      challenge: data.challenge,
      solution: data.solution,
      gallery: data.project_gallery.map(item => item.image_url),
      testimonial: {
        quote: data.testimonial_quote,
        author: data.testimonial_author
      }
    };
  } catch (error) {
    console.error(`Error fetching project ${id}:`, error.message);
    return null;
  }
};

// Helper function to validate project data
const validateProjectData = (data) => {
  const requiredFields = ['name', 'category', 'description'];
  const errors = [];

  requiredFields.forEach(field => {
    if (!data[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  // Validate data types
  if (data.technologies && !Array.isArray(data.technologies.split(','))) {
    errors.push('Technologies must be a comma-separated string');
  }

  if (data.gallery && !Array.isArray(data.gallery.split(','))) {
    errors.push('Gallery must be a comma-separated string');
  }

  return errors;
};

// Function to import CSV data to Supabase
export const importProjectsFromCSV = async (file) => {
  try {
    // Parse CSV file
    const results = await new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: resolve,
        error: reject,
        skipEmptyLines: true
      });
    });

    const { data } = results;
    const errors = [];
    const successfulImports = [];

    // Validate and process each project
    for (const project of data) {
      const validationErrors = validateProjectData(project);
      
      if (validationErrors.length > 0) {
        errors.push({ project: project.name, errors: validationErrors });
        continue;
      }

      try {
        // Insert project data
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .insert([
            {
              name: project.name,
              category: project.category,
              image: project.image,
              hero_image: project.heroImage,
              background_gradient: project.backgroundGradient,
              background_image: project.backgroundImage,
              client: project.client,
              year: project.year,
              role: project.role,
              technologies: project.technologies.split(','),
              description: project.description,
              challenge: project.challenge,
              solution: project.solution,
              testimonial_quote: project.testimonialQuote,
              testimonial_author: project.testimonialAuthor
            }
          ])
          .select();

        if (projectError) throw projectError;

        // Insert gallery images
        if (project.gallery) {
          const galleryImages = project.gallery.split(',');
          const galleryData = galleryImages.map(imageUrl => ({
            project_id: projectData[0].id,
            image_url: imageUrl.trim()
          }));

          const { error: galleryError } = await supabase
            .from('project_gallery')
            .insert(galleryData);

          if (galleryError) throw galleryError;
        }

        successfulImports.push(project.name);
      } catch (error) {
        errors.push({
          project: project.name,
          error: error.message
        });
      }
    }

    return {
      success: successfulImports.length > 0,
      successfulImports,
      errors: errors.length > 0 ? errors : null
    };
  } catch (error) {
    throw new Error(`Failed to import CSV: ${error.message}`);
  }
};