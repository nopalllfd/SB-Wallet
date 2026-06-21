import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PaymentsIcon from '@mui/icons-material/Payments';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function HeaderSectionDesktopOnly(props) {
  const headerData = [
    {
      id: 1,
      text: 'Find People',
      icon: PersonSearchIcon,
    },
    {
      id: 2,
      text: 'Set Nominal',
      icon: PaymentsIcon,
    },
    {
      id: 3,
      text: 'Finish',
      icon: CheckCircleIcon,
    },
  ];

  return (
    <header className="hidden md:block mb-6">
      {/* TITLE */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg text-blue-700">
          <AccountBalanceIcon fontSize="small" />
        </div>

        <h2 className="font-semibold text-gray-900 text-lg">Transfer Money</h2>
      </div>

      {/* STEPPER */}
      <div className="flex items-center w-full max-w-3xl">
        {headerData.map((d, index) => {
          const isActive = d.id === props.step;
          const Icon = d.icon;

          return (
            <div key={d.id} className="flex items-center">
              {/* STEP ITEM */}
              <div className="flex items-center gap-2">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    transition-all duration-200
                    ${isActive ? 'bg-blue-700 text-white shadow-md' : 'bg-gray-200 text-gray-500'}
                  `}
                >
                  <Icon fontSize="small" />
                </div>

                <span
                  className={`
                    text-sm font-medium
                    transition-colors duration-200
                    ${isActive ? 'text-blue-700' : 'text-gray-400'}
                  `}
                >
                  {d.text}
                </span>
              </div>

              {/* CONNECTOR */}
              {index < headerData.length - 1 && (
                <div
                  className={`
                    w-16 mx-4 border-t-2 border-dashed
                    ${isActive ? 'border-blue-400' : 'border-gray-300'}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </header>
  );
}

export default HeaderSectionDesktopOnly;
