import HistoryIcon from '@mui/icons-material/History';

function HeaderSectionDesktopOnly() {
  return (
    <header className="hidden md:block mb-4">
      <div className="flex items-center gap-2 text-gray-800">
        <HistoryIcon />
        <h2 className="font-semibold">Transactions History</h2>
      </div>
    </header>
  );
}

export default HeaderSectionDesktopOnly;
