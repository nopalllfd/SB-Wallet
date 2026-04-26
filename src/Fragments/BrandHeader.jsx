import { Link } from 'react-router';

function BrandHeader(props) {
  return (
    <Link to="/" className={`icons flex justify-start items-center gap-3 ${props.location == 'dashboard' ? 'max-md:hidden' : ''}`}>
      <img src="/assets/e-wallet.svg" alt="e-wallet icon" />
      <h2 className={`text-blue-800 font-normal text-2xl ${props.textColor}`}>SB-Wallet</h2>
    </Link>
  );
}

export default BrandHeader;
