-- Create projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    hero_image VARCHAR(255),
    background_gradient VARCHAR(255),
    background_image VARCHAR(255),
    client VARCHAR(255),
    year VARCHAR(4),
    role VARCHAR(255),
    technologies TEXT[],
    description TEXT,
    challenge TEXT,
    solution TEXT,
    testimonial_quote TEXT,
    testimonial_author VARCHAR(255)
);

-- Create project_gallery table for gallery images
CREATE TABLE project_gallery (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    image_url VARCHAR(255) NOT NULL
);

-- Create function to split array string
CREATE OR REPLACE FUNCTION split_string_to_array(p_string text, p_delimiter text DEFAULT ',')
RETURNS text[] AS $$
BEGIN
    RETURN string_to_array(p_string, p_delimiter);
END;
$$ LANGUAGE plpgsql;

-- Import data transformation
WITH imported_data AS (
    SELECT 
        id::integer,
        name,
        category,
        image,
        heroImage as hero_image,
        backgroundGradient as background_gradient,
        backgroundImage as background_image,
        client,
        year,
        role,
        split_string_to_array(technologies) as technologies,
        description,
        challenge,
        solution,
        testimonialQuote as testimonial_quote,
        testimonialAuthor as testimonial_author,
        split_string_to_array(gallery) as gallery_images
    FROM csv_import_table
)
INSERT INTO projects (
    id, name, category, image, hero_image, background_gradient, 
    background_image, client, year, role, technologies, description, 
    challenge, solution, testimonial_quote, testimonial_author
)
SELECT 
    id, name, category, image, hero_image, background_gradient,
    background_image, client, year, role, technologies, description,
    challenge, solution, testimonial_quote, testimonial_author
FROM imported_data;

-- Insert gallery images
WITH imported_data AS (
    SELECT 
        id,
        unnest(split_string_to_array(gallery)) as image_url
    FROM csv_import_table
)
INSERT INTO project_gallery (project_id, image_url)
SELECT id, image_url FROM imported_data;