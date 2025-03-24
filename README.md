# Team Member Tasks

## Melissa

- Created csv file
- Created EJS partials
- Created basic app and functionality (choosing a mood and genre to generate a random movie)
- Added images to generated movies 

## Arabella

- App styling
- Created "Surprise Me" button
- Added descriptions and trailers to generated movies

## Kelly 

- Created "Watch Later" and "Watched" pages
- Created "Add to Watch Later" button 

# Instructions 

1. Clone the repo
2. Navigate to the project folder (movie-recommendations)
3. Install dependencies
4. Set up database by creating a movies table in PostgreSQL with the schema:
   
   CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    movie TEXT,
    mood TEXT,
    genre TEXT,
    image_url TEXT,
    description TEXT,
    trailer TEXT
  );
   
6. Import the attached csv file (movies.csv) into the movies table using pgAdmin 
7. Create a .env in the root with database details
   
   DATABASE_URL=postgres://user:password@localhost:5432/yourdbname
  
9. Start the server using node index.js
10. Visit application at http://localhost:3000
   
