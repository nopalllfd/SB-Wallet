import HeaderSection from '../Fragments/Transaction/HeaderSection';
import ListSection from '../Fragments/Transaction/ListSection';
import { DashboardLayout } from '../Layouts/DashboardLayout';
import HeaderSectionDesktopOnly from '../Fragments/Transaction/HeaderSectionDesktopOnly';

function TransactionPage() {
  return (
    <DashboardLayout locationDetail="transaction">
      <section className="max-md:py-6 px-6 flex flex-col gap-8">
        <HeaderSectionDesktopOnly />
        <div className="bg-white md:border md:p-6 md:border-gray-300 md:rounded-md md:py-4">
          <HeaderSection />
          <ListSection />
        </div>
      </section>
    </DashboardLayout>
  );
}

export default TransactionPage;
