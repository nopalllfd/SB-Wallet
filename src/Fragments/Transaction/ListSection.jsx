import { useState } from 'react';
import { Button } from '../../components/Button';
import { useSelector } from 'react-redux';

function ListSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState([]);
  const { transactions: data } = useSelector((state) => state.transaction);
  const { userMap } = useSelector((state) => state.register);
  const { user } = useSelector((state) => state.user);

  const transferOutData = data.filter((data) => data.toUserId !== null && data.userId == user.id);
  const result = transferOutData.map((data) => ({
    ...data,
    user: userMap[data.toUserId],
  }));
  // const data = [
  //   {
  //     name: 'Ghaluh',
  //     telp: '(239) 555-0108',
  //     value: '50.000',
  //     isProfit: true,
  //   },
  //   {
  //     name: 'Albert Flores',
  //     telp: '(239) 555-0108',
  //     value: '50.000',
  //     isProfit: false,
  //   },
  //   {
  //     name: 'Bessie Cooper',
  //     telp: '(239) 555-0108',
  //     value: '50.000',
  //     isProfit: true,
  //   },
  //   {
  //     name: 'Ghaluh',
  //     telp: '(239) 555-0108',
  //     value: '50.000',
  //     isProfit: true,
  //   },
  //   {
  //     name: 'Albert Flores',
  //     telp: '(239) 555-0108',
  //     value: '50.000',
  //     isProfit: false,
  //   },
  //   {
  //     name: 'Bessie Cooper',
  //     telp: '(239) 555-0108',
  //     value: '50.000',
  //     isProfit: true,
  //   },
  // ];
  const handleClick = (item) => {
    if (!isModalOpen) {
      setUserDetail([item]);
    }
    return setIsModalOpen(!isModalOpen);
  };
  console.log(result);
  return (
    <section className="flex flex-col">
      {result.map((d, idx) => (
        <div
          key={idx}
          onClick={() => {
            handleClick(d, idx);
          }}
          className={`grid grid-cols-[1fr_auto] md:grid-cols-[auto_auto_auto_auto] items-center gap-3 border-b cursor-pointer border-gray-300 px-4 py-3 rounded-md ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
        >
          <img src="/assets/users/Ghaluh.svg" alt={`${d.user?.fullName} icon`} className="w-13 hidden md:block" />
          <div className="min-w-0 flex flex-col gap-1 md:grid md:grid-cols-[18rem_1fr] md:items-center">
            <p className="text-base md:text-lg md:text-left md:ps-20  text-gray-700 truncate">{d.user?.fullName}</p>
            {/* <p className="text-sm md:text-left text-gray-600 md:pe-20 truncate">{d.telp}</p> */}
          </div>

          <p
            className={`${d.type !== 'TRANSFER_OUT' ? 'text-green-500' : 'text-red-500'} text-base md:text-lg font-semibold whitespace-nowrap pe-10`}
          >
            {d.amount}
          </p>
          <button className="delete hidden md:block">
            <img src="/assets/utils/trash-red.svg" alt="trash icon" />
          </button>
        </div>
      ))}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <button type="button" className="absolute inset-0 bg-black/50" onClick={handleClick} aria-label="Close modal" />
          <div className="relative mx-auto mt-18 w-[min(92vw,34rem)] rounded-xl bg-white px-8 py-6 shadow-lg">
            {userDetail.map((d, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className="header text-xs">DETAIL TRANSACTION {d.user.name}</div>

                <hr />
                <img src="/assets/users/Ghaluh.svg" alt={`${d.user.name} photo`} className="w-20" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h1 className="font-semibold text-sm">Name:</h1>
                    <p>{d.user.name}</p>
                  </div>
                  <div>
                    {/* <h1 className="font-semibold text-sm">Phone:</h1>
                    <p>{d.telp}</p> */}
                  </div>
                  <div>
                    <h1 className="font-semibold text-sm">Status:</h1>
                    <p>Transfer Success</p>
                  </div>
                  <div>
                    <h1 className="text-sm">Amount:</h1>
                    <p className={`${d.type == 'TRANSFER_OUT' ? 'text-red-500' : 'text-green-500'}`}>{d.amount}</p>
                  </div>
                </div>
                <button className="bg-white text-sm border-2 py-2 font-semibold rounded-lg border-red-500 text-red-500">DELETE</button>
                <Button buttonColor="bg-blue-700" buttonTextColor="text-white" className="rounded-md" onClick={handleClick}>
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
