function Pagination({ page, pageCount, onPageChange }) {
  if (!pageCount || pageCount <= 1) return null;

  const safePage = Math.min(Math.max(1, page), pageCount);

  const goPrev = () => onPageChange(Math.max(1, safePage - 1));
  const goNext = () => onPageChange(Math.min(pageCount, safePage + 1));

  return (
    <div className="mt-5 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={goPrev}
        disabled={safePage === 1}
        className={`rounded-md border px-3 py-2 text-sm font-semibold ${
          safePage === 1 ? 'cursor-not-allowed border-gray-200 text-gray-400' : 'border-blue-200 text-blue-700 hover:bg-blue-50'
        }`}
      >
        Prev
      </button>
      <div className="text-sm text-gray-700">
        Halaman <span className="font-semibold">{safePage}</span> dari <span className="font-semibold">{pageCount}</span>
      </div>
      <button
        type="button"
        onClick={goNext}
        disabled={safePage === pageCount}
        className={`rounded-md border px-3 py-2 text-sm font-semibold ${
          safePage === pageCount ? 'cursor-not-allowed border-gray-200 text-gray-400' : 'border-blue-200 text-blue-700 hover:bg-blue-50'
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
