I developed a responsive website that allows users to search for games or browse through them by scrolling. The site features a switch for dark and light modes and is optimized for use on phones and tablets. Chakra UI was used as the CSS framework, with Bootstrap icons integrated for design elements.

main window:
![צילום מסך 2024-08-21 140755](https://github.com/user-attachments/assets/e7bfb553-3ae3-4818-a2e7-389ad210c730)

using Search bar:
![צילום מסך 2024-08-21 141045](https://github.com/user-attachments/assets/064109eb-bf53-4653-a40e-8f7fe3f5defe)


tablets in a light mode
:![צילום מסך 2024-08-21 141211](https://github.com/user-attachments/assets/6abec9d7-53a5-4bb2-8af0-9bcd2ebb6b3f)


Similar Implemetation in JavaScript:

app.jsx:

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;


HomePage.jsx:

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "../styles/home.css";

// const API_KEY = "9977c172";

// function HomePage() {
//   const [movies, setMovies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOrder, setSortOrder] = useState("newest");

//   const fetchMovies = async () => {
//     if (!searchTerm) return;
//     try {
//       const res = await fetch(
//         `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
//       );
//       const data = await res.json();
//       if (data.Search) {
//         setMovies(data.Search);
//       } else {
//         setMovies([]);
//       }
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };

//   const sortedMovies = [...movies].sort((a, b) => {
//     const yearA = parseInt(a.Year);
//     const yearB = parseInt(b.Year);
//     return sortOrder === "newest" ? yearB - yearA : yearA - yearB;
//   });

//   return (
//     <div className="home-container">
//       <h1>🎬 חפש סרט</h1>
//       <input
//         type="text"
//         placeholder="חפש סרט..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && fetchMovies()}
//       />
//       <button onClick={fetchMovies}>🔍 חפש</button>

//       <div className="sort-container">
//         <label>
//           מיון לפי תאריך:
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//           >
//             <option value="newest">מהחדש לישן</option>
//             <option value="oldest">מהישן לחדש</option>
//           </select>
//         </label>
//       </div>

//       <div className="movies-grid">
//         {sortedMovies.map((movie) => (
//           <Link
//             to={`/movie/${movie.imdbID}`}
//             key={movie.imdbID}
//             className="movie-card"
//           >
//             <img src={movie.Poster} alt={movie.Title} />
//             <h3>{movie.Title}</h3>
//             <p>📅 {movie.Year}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default HomePage;


HomePage.css:

.home-container {
  text-align: center;
  padding: 20px;
  background-color: #121212;
  color: white;
  min-height: 100vh;
  width: 100vw;
}

h1 {
  margin-bottom: 20px;
}

input {
  padding: 12px;
  width: 60%;
  font-size: 18px;
  border-radius: 8px;
  border: none;
  outline: none;
  margin-bottom: 10px;
}

button {
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #ff9900;
  color: white;
}

button:hover {
  background-color: #ff6600;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.movie-card {
  text-decoration: none;
  color: white;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
}

.movie-card img {
  width: 100%;
  border-radius: 10px;
}

.sort-container {
  margin: 1rem 0;
}

.sort-container select {
  margin-right: 0.5rem;
  padding: 0.4rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}


MovieDetails.jsx:

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/details.css";

const API_KEY = "9977c172";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.error("Error fetching movie details:", err));
  }, [id]);

  if (!movie) return <p>טוען...</p>;

  return (
    <div className="movie-details">
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} />
      <p>{movie.Plot}</p>
      <p>📅 שנה: {movie.Year}</p>
      <p>⭐ דירוג: {movie.imdbRating}</p>
      <p>🎭 ז'אנר: {movie.Genre}</p>
      <p>⏳ משך: {movie.Runtime}</p>
    </div>
  );
}

export default MovieDetails;


details.css:

.movie-details {
  text-align: center;
  padding: 20px;
  background-color: #1e1e1e;
  color: white;
  min-height: 100vh;
}

.movie-details img {
  max-width: 300px;
  border-radius: 10px;
  margin: 20px 0;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
}

.movie-details p {
  font-size: 18px;
  margin: 10px 0;
}



