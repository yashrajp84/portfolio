import Papa from 'papaparse';

// Function to validate file type
const validateFileType = (file) => {
  const validTypes = ['text/csv', 'text/tab-separated-values'];
  const fileName = file.name.toLowerCase();
  const fileType = file.type;

  if (!validTypes.includes(fileType) && !fileName.endsWith('.csv') && !fileName.endsWith('.tsv')) {
    throw new Error('Only CSV or TSV files are accepted');
  }
};

// Function to validate and transform CSV/TSV data for Supabase import
export const transformProjectData = (file) => {
  validateFileType(file);
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      delimiter: file.name.toLowerCase().endsWith('.tsv') ? '\t' : ',',
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const transformedData = results.data.map(project => ({
            projects: {
              name: project.name,
              category: project.category,
              image: project.image,
              hero_image: project.heroImage || null,
              background_gradient: project.backgroundGradient || null,
              background_image: project.backgroundImage || null,
              client: project.client,
              year: project.year,
              role: project.role,
              technologies: project.technologies.split(',').map(tech => tech.trim()),
              description: project.description,
              challenge: project.challenge,
              solution: project.solution,
              testimonial_quote: project.testimonialQuote,
              testimonial_author: project.testimonialAuthor
            },
            gallery: project.gallery
              ? project.gallery.split(',').map(url => ({
                  image_url: url.trim()
                }))
              : []
          }));

          resolve(transformedData);
        } catch (error) {
          reject(new Error(`Failed to transform data: ${error.message}`));
        }
      },
      error: (error) => reject(new Error(`Failed to parse CSV: ${error}`)),
    });
  });
};

// Function to validate transformed data
export const validateTransformedData = (data) => {
  const errors = [];
  
  data.forEach((item, index) => {
    const project = item.projects;
    
    // Required fields validation
    ['name', 'category', 'description'].forEach(field => {
      if (!project[field]) {
        errors.push(`Row ${index + 1}: Missing required field '${field}'`);
      }
    });

    // Data type validation
    if (!Array.isArray(project.technologies)) {
      errors.push(`Row ${index + 1}: Technologies must be an array`);
    }

    if (!Array.isArray(item.gallery)) {
      errors.push(`Row ${index + 1}: Gallery must be an array`);
    }

    // URL format validation for images
    const imageFields = ['image', 'hero_image', 'background_image'];
    imageFields.forEach(field => {
      if (project[field] && !project[field].startsWith('/')) {
        errors.push(`Row ${index + 1}: ${field} must be a valid path starting with '/'`);
      }
    });

    // Gallery image validation
    item.gallery.forEach((galleryItem, galleryIndex) => {
      if (!galleryItem.image_url.startsWith('/')) {
        errors.push(`Row ${index + 1}, Gallery ${galleryIndex + 1}: Invalid image URL format`);
      }
    });
  });

  return errors;
};