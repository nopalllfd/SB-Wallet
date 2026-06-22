import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';

function HeaderSection() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <HistoryIcon className="text-blue-700" />
      <h1 className="text-lg md:text-xl font-semibold text-gray-900 text-left">Search History</h1>

      <div className="w-full md:w-1/3 relative">
        <SearchIcon fontSize="small" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          name="search"
          placeholder="Cari nama atau nomor..."
          className="
            w-full pl-10 pr-3 py-2
            border border-gray-200 rounded-lg
            text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
      </div>
    </div>
  );
}

export default HeaderSection;
