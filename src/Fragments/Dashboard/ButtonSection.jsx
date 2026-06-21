import { Button } from '../../components/Button';
import { useNavigate } from 'react-router';

// MUI ICONS
import AddCardIcon from '@mui/icons-material/AddCard';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

function ActionButton({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        group flex items-center gap-2 
        bg-blue-700 text-white 
        px-4 py-1 rounded-xl md:rounded-lg
        shadow-sm hover:shadow-md
        transition-all duration-300
        active:scale-[0.98]
      "
    >
      <span className="p-1 rounded-md group-hover:scale-110 transition-transform">
        <Icon fontSize="small" />
      </span>
      <p className="text-sm font-medium">{label}</p>
    </button>
  );
}

function ButtonSection() {
  const navigate = useNavigate();

  return (
    <section className="max-sm:mt-2 mt-10 md:mt-6 px-4">
      <div className="mx-auto max-w-5xl md:bg-white md:border md:border-gray-100 md:shadow-sm md:rounded-xl md:p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-sm md:text-base font-semibold text-gray-700 hidden md:block">Fast Service</h1>

          {/* FIX HERE */}
          <div className="flex w-full md:w-auto gap-3 justify-center md:justify-end">
            <ActionButton icon={AddCardIcon} label="Top Up" onClick={() => navigate('/topup')} />

            <ActionButton icon={SwapHorizIcon} label="Transfer" onClick={() => navigate('/transfer')} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ButtonSection;
