import HeaderSection from '../Fragments/Transaction/HeaderSection';
import ListSection from '../Fragments/Transaction/ListSection';
import { DashboardLayout } from '../Layouts/DashboardLayout';

function TransactionPage() {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Transfer', path: '/transfer' },
    { name: 'Transaction', path: '/transaction' },
    { name: 'Top up', path: '/top-up' },
    { name: 'Profile', path: '/profile' },
    { name: 'Logout', path: '/auth/logout', isLogout: true },
  ];
  return (
    <DashboardLayout navItems={navItems}>
      <section className="max-md:py-6 px-6 flex flex-col gap-8">
        <HeaderSection />
        <ListSection />
      </section>
    </DashboardLayout>
  );
}

export default TransactionPage;
