import HeaderSection from '../Fragments/Transfer/HeaderSection';
import HeaderSectionDesktopOnly from '../Fragments/Transfer/HeaderSectionDesktopOnly';
import ListSection from '../Fragments/Transfer/ListSection';
import { DashboardLayout } from '../Layouts/DashboardLayout';

function TransferPage() {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Transfer', path: '/transfer' },
    { name: 'Transaction', path: '/transaction' },
    { name: 'Top up', path: '/top-up' },
    { name: 'Profile', path: '/profile' },
    { name: 'Logout', path: '/auth/logout', isLogout: true },
  ];

  return (
    <DashboardLayout
      location="dashboard"
      locationDetail="transfer"
      navItems={navItems}
    >
      <main className="max-md:py-6 px-6 flex flex-col gap-8 ">
        <HeaderSectionDesktopOnly />
        <div className="md:border md:p-6 md:border-gray-300 md:rounded-md md:py-4">
          <HeaderSection />
          <ListSection />
        </div>
      </main>
    </DashboardLayout>
  );
}

export default TransferPage;
