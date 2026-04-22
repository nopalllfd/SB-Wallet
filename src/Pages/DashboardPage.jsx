import BalanceSection from '../Fragments/Dashboard/BalanceSection';
import ButtonSection from '../Fragments/Dashboard/ButtonSection';
import ChartSection from '../Fragments/Dashboard/ChartSection';
import TransactionHistory from '../Fragments/Dashboard/TransactionHistory';
import { DashboardLayout } from '../Layouts/DashboardLayout';

function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="md:grid md:grid-cols-3 md:gap-2">
        <div className="flex flex-col gap-6 md:col-span-2">
          <BalanceSection />
          <ButtonSection />
          <ChartSection />
        </div>
        <div className="mt-6 md:mt-0">
          <TransactionHistory />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;
