import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import Loading from "../components/Loading";
import Error from "../components/Error";
import useFavorites from "../hooks/useFavorites";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.some(f => f.id === Number(id));

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  const director = movie.credits.crew.find(c => c.job === "Director")?.name;
  const cast = movie.credits.cast.slice(0, 5).map(c => c.name).join(", ");

  return (
    <div className="p-5 text-white">
      <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
      <div className="flex flex-col md:flex-row gap-5">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://via.placeholder.com/300x450'}
          alt={movie.title}
          className="rounded"
        />
        <div>
          <p className="mb-2"><strong>Sinopse:</strong> {movie.overview}</p>
          <p className="mb-2"><strong>Diretor:</strong> {director}</p>
          <p className="mb-2"><strong>Elenco:</strong> {cast}</p>
          <p className="mb-2"><strong>Avaliação:</strong> {movie.vote_average}</p>
          <button
            onClick={() => toggleFavorite(movie)}
            className="bg-yellow-500 px-4 py-2 rounded mt-3"
          >
            {isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
}
