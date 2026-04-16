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

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Transfer', path: '/transfer' },
    { name: 'Transaction', path: '/transaction' },
    { name: 'Top up', path: '/topup' },
    { name: 'Profile', path: '/profile' },
    { name: 'Logout', path: '/auth/logout', isLogout: true },
  ];

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
  };

  const searchQuery = searchParams.get('search') || '';
  return (
    <DashboardLayout location="dashboard" locationDetail="transfer" navItems={navItems}>
      <main className="max-md:py-6 px-6 flex flex-col gap-8 relative">
        <>
          <HeaderSectionDesktopOnly step={1} />
          <div className="md:border md:p-6 md:border-gray-300 md:rounded-md md:py-4">
            <HeaderSection searchQuery={inputValue} onSearchChange={handleChange} />
            <ListSection searchQuery={searchQuery} />
          </div>
        </>
      </main>
    </DashboardLayout>
  );
}

export default TransferPage;
