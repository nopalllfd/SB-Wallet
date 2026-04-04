function TransactionHistory() {
  const data = [
    {
      name: 'Floyd Miles',
      status: 'Send',
      total: '-50.000',
      isMinus: true,
    },
    {
      name: 'Floyd Miles',
      status: 'Send',
      total: '+60.000',
      isMinus: false,
    },
    {
      name: 'Floyd Miles',
      status: 'Send',
      total: '+100.000',
      isMinus: false,
    },
    {
      name: 'Floyd Miles',
      status: 'Send',
      total: '-100.000',
      isMinus: true,
    },
  ];
  console.log(data);
  return (
    <section className="transaction-history px-6 mt-5">
      <header className="flex justify-between">
        <h2 className="text-md font-semibold">Transaction History</h2>
        <p className="text-blue-700">See All</p>
      </header>
      <div className="flex flex-col gap-4 mt-5">
        {data.map((d) => (
          <div className="flex justify-between items-center">
            <img
              src="assets/transaction-profile.svg"
              alt=""
              className=""
            />
            <div className="flex-2 ms-5 flex flex-col gap-1">
              <p className="font-semibold">{d.name}</p>
              <p>{d.status}</p>
            </div>
            <h2 className={`${d.isMinus ? 'text-red-500' : 'text-green-500'} font-bold`}>{d.total}</h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TransactionHistory;
