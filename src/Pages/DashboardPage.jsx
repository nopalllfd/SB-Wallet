import BalanceSection from '../Fragments/Dashboard/BalanceSection';
import ButtonSection from '../Fragments/Dashboard/ButtonSection';
import ChartSection from '../Fragments/Dashboard/ChartSection';
import TransactionHistory from '../Fragments/Dashboard/TransactionHistory';
import Header from '../Fragments/Header';

function DashboardPage() {
  return (
    <>
      <Header location="dashboard" />
      <BalanceSection />
      <ButtonSection />
      <ChartSection />
      <TransactionHistory />
    </>
  );
}

export default DashboardPage;
