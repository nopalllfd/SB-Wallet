function BalanceSection() {
  return (
    <section className="relative flex">
      <div className="bg-blue-700 h-30 border-t border-gray-200 absolute -z-1 w-full"></div>
      <div className="container w-full h-full relative flex flex-col items-center justify-center">
        <div className="balance-card h-30 bg-white relative w-5/6 flex gap-8 text-xs py-5 justify-between px-6 rounded-2xl top-10">
          <div className="flex flex-col gap-2">
            <h2>Balance</h2>
            <p className="value flex">
              Rp. <span className="font-bold">500.000</span>
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2>Income</h2>
            <p className="value flex">
              Rp. <span className="font-bold">500.000</span>
            </p>
            <p className="text-green-400 text-xs">+11.01%</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2>Expense</h2>
            <p className="value flex">
              Rp. <span className="font-bold">500.000</span>
            </p>
            <p className="text-red-500">-5.06%</p>
          </div>
        </div>
        <img
          className="absolute -bottom-10 rounded-b-2xl w-5/6"
          src="assets/wave.svg"
          alt="wave icon"
        />
      </div>
    </section>
  );
}

export default BalanceSection;
