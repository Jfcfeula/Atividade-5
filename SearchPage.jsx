import { useState, useEffect } from "react";
import { searchMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query, page);
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMovies(); }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies();
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSearch} className="flex gap-2 mb-5">
        <input
          type="text"
          placeholder="Buscar filmes..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="p-2 flex-1 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">Buscar</button>
      </form>

      {loading && <Loading />}
      {error && <Error message={error} />}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>

      {totalPages > 1 && <Pagination page={page} setPage={setPage} totalPages={totalPages} />}
    </div>
  );
}
