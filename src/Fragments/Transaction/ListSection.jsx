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
  console.log(userDetail);
  return (
    <section className="flex flex-col relative">
      {data.map((d, idx) => (
        <div
          key={idx}
          onClick={() => {
            handleClick(d, idx);
          }}
          className={`flex justify-between items-center bg-gray-100 border-b border-gray-300 p-3 rounded-md ${idx % 2 == 0 ? 'bg-white' : ''}`}
        >
          <img
            src={`assets/users/Ghaluh.svg`}
            alt={`${d.name} icon`}
            className="w-13 max-md:hidden"
          />
          <div className="flex-2 max-md:ms-0 md:ms-30 md:me-30 md:flex md:gap-4 md:items-center md:justify-between">
            <p className="text-lg text-gray-700">{d.name}</p>
            <p className="text-gray-700">{d.telp}</p>
          </div>

          <p className={`${d.isProfit ? 'text-green-500' : 'text-red-500'} text-lg font-semibold`}>{d.value}</p>
        </div>
      ))}
      {isModalOpen && (
        <>
          <div className="absolute z-10 bg-black opacity-50 -top-60 -right-6 h-screen w-screen"></div>
          <div className="absolute z-20 bg-white h-auto w-full p-10 rounded-lg">
            {userDetail.map((d, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-4"
              >
                <div className="header text-xs">DETAIL TRANSACTION {d.name}</div>

                <hr />
                <img
                  src={`assets/users/Ghaluh.svg`}
                  alt={`${d.name} photo`}
                  className="w-20"
                />
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
                  <p>{!d.isProfit ? `Transfer Success` : `Transfer Success`}</p>
                </div>
                <div>
                  <h1 className="text-sm">Amount:</h1>
                  <p className={`${!d.isProfit ? `text-red-500` : `text-green-500`}`}>{d.value}</p>
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
        </>
      )}
    </section>
  );
}

export default ListSection;
