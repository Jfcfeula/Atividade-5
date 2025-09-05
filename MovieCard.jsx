import { Link } from "react-router-dom";
import useFavorites from "../hooks/useFavorites";

export default function MovieCard({ movie }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.some(f => f.id === movie.id);

  return (
    <div className="bg-gray-800 text-white p-3 rounded shadow-md flex flex-col items-center">
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200x300'}
        alt={movie.title}
        className="rounded mb-2"
      />
      <h3 className="text-lg font-bold">{movie.title} ({movie.release_date?.slice(0,4)})</h3>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => toggleFavorite(movie)}
          className="bg-yellow-500 px-2 py-1 rounded"
        >
          {isFav ? "Remover" : "Favorito"}
        </button>
        <Link to={`/movie/${movie.id}`} className="bg-blue-500 px-2 py-1 rounded">
          Detalhes
        </Link>
      </div>
    </div>
  );
}
