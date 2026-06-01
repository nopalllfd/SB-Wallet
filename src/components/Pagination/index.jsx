function Pagination({ page = 1, pageCount = 1, onPageChange }) {
  if (!pageCount || pageCount <= 1) return null;

  const safePage = Math.min(Math.max(1, page), pageCount);

  const goToPage = (p) => {
    if (p >= 1 && p <= pageCount && p !== safePage) {
      onPageChange(p);
    }
  };

  const goPrev = () => goToPage(safePage - 1);
  const goNext = () => goToPage(safePage + 1);

  // generate array page number
  const getPages = () => {
    const pages = [];

    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
      {/* Prev */}
      <button
        onClick={goPrev}
        disabled={safePage === 1}
        className={`px-3 py-2 rounded border text-sm font-medium
          ${safePage === 1 ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-blue-600 border-blue-300 hover:bg-blue-50'}
        `}
      >
        Prev
      </button>

      {/* Number Pages */}
      {getPages().map((p) => (
        <button
          key={p}
          onClick={() => goToPage(p)}
          className={`px-3 py-2 rounded border text-sm font-medium
            ${p === safePage ? 'bg-blue-600 text-white border-blue-600' : 'text-gray-700 border-gray-300 hover:bg-gray-100'}
          `}
        >
          {p}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={goNext}
        disabled={safePage === pageCount}
        className={`px-3 py-2 rounded border text-sm font-medium
          ${safePage === pageCount ? 'text-gray-400 border-gray-200 cursor-not-allowed' : 'text-blue-600 border-blue-300 hover:bg-blue-50'}
        `}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
