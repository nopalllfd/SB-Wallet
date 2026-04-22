import { useSelector } from 'react-redux';

function TransactionHistory() {
  const { transactions: data } = useSelector((state) => state.transaction);
  const { userMap } = useSelector((state) => state.register);
  const { user } = useSelector((state) => state.user);
  console.log(userMap);
  const transferOutData = data.filter((transaction) => transaction.toUserId !== null && transaction.userId == user.id);
  console.log(transferOutData);

  const result = transferOutData.map((trx) => ({
    ...trx,
    user: userMap[trx.toUserId],
  }));
  console.log(result);
  return (
    <section className="transaction-history px-8 mt-5 pb-8 md:px-3 md:w-80 md:bg-white md:border-gray-200 md:rounded-sm md:mt-2 md:border md:py-2">
      <header className="flex justify-between">
        <h2 className="text-md font-semibold">Transaction History</h2>
        <p className="text-blue-700">See All</p>
      </header>
      <div className="flex flex-col gap-4 mt-5">
        {result.map((d, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <img src="/assets/transaction-profile.svg" alt="" className="" />
            <div className="flex-2 ms-5 flex flex-col gap-1">
              <p className="font-semibold">{d.user.fullName}</p>
              <p>{d.type == 'TRANSFER_OUT' ? 'Transfer Out' : 'Transfer In'}</p>
            </div>
            <h2 className={`${d.type == 'TRANSFER_OUT' ? 'text-red-500' : 'text-green-500'} font-bold`}>{d.amount}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TransactionHistory;
