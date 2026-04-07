import { useParams } from 'react-router';
import { DashboardLayout } from '../Layouts/DashboardLayout';
import TransferDetail from '../Fragments/Transfer/Detail/TransferDetail';

function TransferDetailPage() {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Transfer', path: '/transfer' },
    { name: 'Transaction', path: '/transaction' },
    { name: 'Top up', path: '/top-up' },
    { name: 'Profile', path: '/profile' },
    { name: 'Logout', path: '/auth/logout', isLogout: true },
  ];

  const { userId } = useParams();
  return (
    <DashboardLayout
      location="dashboard"
      locationDetail="transfer"
      navItems={navItems}
    >
      <main className="max-md:py-6 px-6 flex flex-col gap-8 relative">
        <TransferDetail userId={userId} />
      </main>
    </DashboardLayout>
  );
}

export default TransferDetailPage;
