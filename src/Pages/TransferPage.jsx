import { useEffect, useState } from 'react';
import HeaderSection from '../Fragments/Transfer/HeaderSection';
import HeaderSectionDesktopOnly from '../Fragments/Transfer/HeaderSectionDesktopOnly';
import ListSection from '../Fragments/Transfer/ListSection';
import { useDebounce } from '../hooks/useDebounce';
import { DashboardLayout } from '../Layouts/DashboardLayout';
import { useSearchParams } from 'react-router';

function TransferPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(inputValue, 700);

  useEffect(() => {
    if (debouncedSearch) {
      setSearchParams({ search: debouncedSearch }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [debouncedSearch, setSearchParams]);

  const handleChange = (val) => {
    setInputValue(val);
    setPage(1);
  };

  const searchQuery = searchParams.get('search') || '';

  return (
    <DashboardLayout locationDetail="transfer">
      <main className="px-4 md:px-6 py-6 flex flex-col gap-6 max-w-5xl mx-auto w-full">
        {/* STEP HEADER */}
        <HeaderSectionDesktopOnly step={1} />

        {/* CONTENT WRAPPER */}
        <div className="md:bg-white border border-gray-100 rounded-xl shadow-sm p-4 md:p-6">
          <HeaderSection searchQuery={inputValue} onSearchChange={handleChange} />

          <div className="mt-4">
            <ListSection searchQuery={searchQuery} page={page} onPageChange={setPage} />
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}

export default TransferPage;
