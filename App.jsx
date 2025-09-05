import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import MovieDetail from "./pages/MovieDetail";
import FavoritesPage from "./pages/FavoritesPage";

export default function App() {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen">
        <nav className="p-4 bg-gray-800 flex gap-4 text-white">
          <Link to="/">Busca</Link>
          <Link to="/favorites">Favoritos</Link>
        </nav>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </Router>
  );
}
