function ListSection() {
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
  return (
    <section className="flex flex-col">
      {data.map((d, idx) => (
        <div
          key={idx}
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
    </section>
  );
}

export default ListSection;
