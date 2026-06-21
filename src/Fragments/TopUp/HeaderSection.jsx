import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

function HeaderSection() {
  return (
    <div className="flex items-center gap-3">
      <AccountBalanceIcon className="text-blue-700" />
      <h1 className="font-semibold text-gray-900 text-base sm:text-lg">
        Account Information
      </h1>
    </div>
  );
}

export default HeaderSection;