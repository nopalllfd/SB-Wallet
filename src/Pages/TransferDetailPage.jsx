import { useParams } from 'react-router';
import { DashboardLayout } from '../Layouts/DashboardLayout';
import TransferDetail from '../Fragments/Transfer/Detail/TransferDetail';
import HeaderSectionDesktopOnly from '../Fragments/Transfer/HeaderSectionDesktopOnly';

function TransferDetailPage() {
  const { userId } = useParams();
  return (
    <DashboardLayout locationDetail="transfer">
      <main className="max-md:py-6 px-6 flex flex-col gap-8 relative">
        <HeaderSectionDesktopOnly step={2} />
        <TransferDetail userId={userId} />
      </main>
    </DashboardLayout>
  );
}

export default TransferDetailPage;
