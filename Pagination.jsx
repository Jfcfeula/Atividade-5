export default function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="flex justify-center gap-3 mt-4">
      <button
        onClick={() => setPage(p => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <span className="text-white">{page} / {totalPages}</span>
      <button
        onClick={() => setPage(p => Math.min(p + 1, totalPages))}
        disabled={page === totalPages}
        className="bg-gray-700 text-white px-3 py-1 rounded disabled:opacity-50"
      >
        Próxima
      </button>
    </div>
  );
}
