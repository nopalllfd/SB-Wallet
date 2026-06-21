import { DashboardLayout } from '../Layouts/DashboardLayout';
import TransferDetail from '../Fragments/Transfer/Detail/TransferDetail';
import HeaderSectionDesktopOnly from '../Fragments/Transfer/HeaderSectionDesktopOnly';

function TransferDetailPage() {
  return (
    <DashboardLayout locationDetail="transfer">
      <main
        className="
        px-4 md:px-6
        py-6
        flex flex-col gap-6
        w-full
        max-w-5xl
        mx-auto
      "
      >
        {/* STEP HEADER (desktop only inside component) */}
        <HeaderSectionDesktopOnly step={2} />

        {/* CONTENT CARD */}
        <div
          className="
          bg-white
          border border-gray-100
          rounded-xl
          shadow-sm
          p-4 md:p-6
        "
        >
          <TransferDetail />
        </div>
      </main>
    </DashboardLayout>
  );
}

export default TransferDetailPage;
