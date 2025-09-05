import useFavorites from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-white mb-4">Meus Favoritos</h2>
      {favorites.length === 0 ? (
        <p className="text-white">Nenhum favorito adicionado.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}
    </div>
  );
}
