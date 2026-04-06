import { useState } from 'react';
import { Button } from '../../components/Button';

function ListSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState([]);
  const data = [
    {
      name: 'Ghaluh',
      telp: '(239) 555-0108',
      value: '50.000',
      isProfit: true,
    },
    {
      name: 'Albert Flores',
      telp: '(239) 555-0108',
      value: '50.000',
      isProfit: false,
    },
    {
      name: 'Bessie Cooper',
      telp: '(239) 555-0108',
      value: '50.000',
      isProfit: true,
    },
  ];
  const handleClick = (item) => {
    if (!isModalOpen) {
      setUserDetail([item]);
    }
    return setIsModalOpen(!isModalOpen);
  };
  return (
    <section className="flex flex-col">
      {data.map((d, idx) => (
        <div
          key={idx}
          onClick={() => {
            handleClick(d, idx);
          }}
          className={`grid grid-cols-[1fr_auto] md:grid-cols-[3.25rem_1fr_auto] items-center gap-3 border-b cursor-pointer border-gray-300 px-4 py-3 rounded-md ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
        >
          <img
            src="/assets/users/Ghaluh.svg"
            alt={`${d.name} icon`}
            className="w-13 hidden md:block"
          />
          <div className="min-w-0 flex flex-col gap-1 md:grid md:grid-cols-[25rem_1fr] md:items-center md:gap-6">
            <p className="text-base md:text-lg md:text-left md:ps-30 text-gray-700 truncate">{d.name}</p>
            <p className="text-sm md:text-left text-gray-600 truncate">{d.telp}</p>
          </div>

          <p className={`${d.isProfit ? 'text-green-500' : 'text-red-500'} text-base md:text-lg font-semibold whitespace-nowrap`}>{d.value}</p>
        </div>
      ))}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={handleClick}
            aria-label="Close modal"
          />
          <div className="relative mx-auto mt-18 w-[min(92vw,34rem)] rounded-xl bg-white px-8 py-6 shadow-lg">
            {userDetail.map((d, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-4"
              >
                <div className="header text-xs">DETAIL TRANSACTION {d.name}</div>

                <hr />
                <img
                  src="/assets/users/Ghaluh.svg"
                  alt={`${d.name} photo`}
                  className="w-20"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h1 className="font-semibold text-sm">Name:</h1>
                    <p>{d.name}</p>
                  </div>
                  <div>
                    <h1 className="font-semibold text-sm">Phone:</h1>
                    <p>{d.telp}</p>
                  </div>
                  <div>
                    <h1 className="font-semibold text-sm">Status:</h1>
                    <p>Transfer Success</p>
                  </div>
                  <div>
                    <h1 className="text-sm">Amount:</h1>
                    <p className={`${!d.isProfit ? 'text-red-500' : 'text-green-500'}`}>{d.value}</p>
                  </div>
                </div>
                <button className="bg-white text-sm border-2 py-2 font-semibold rounded-lg border-red-500 text-red-500">DELETE</button>
                <Button
                  buttonColor="bg-blue-700"
                  buttonTextColor="text-white"
                  className="rounded-md"
                  onClick={handleClick}
                >
                  Back
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default ListSection;
