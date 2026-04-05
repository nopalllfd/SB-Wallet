function ListSection() {
  const data = [
    {
      name: 'Ghaluh',
      telp: '(239) 555-0108',
    },
    {
      name: 'Albert Flores',
      telp: '(239) 555-0108',
    },
    {
      name: 'Bessie Cooper',
      telp: '(239) 555-0108',
    },
  ];
  return (
    <section className="flex flex-col gap-3 py-6">
      {data.map((d, idx) => (
        <div
          key={idx}
          className={`flex justify-between bg-gray-100 p-3 rounded-md ${idx % 2 == 0 ? 'bg-white' : ''}`}
        >
          <img
            src={`assets/users/Ghaluh.svg`}
            alt={`${d.name} icon`}
            className="w-13"
          />
          <div className="flex-2 ms-10 md:ms-30 md:me-30 md:flex md:gap-4 md:items-center md:justify-between">
            <p className="text-lg">{d.name}</p>
            <p>{d.telp}</p>
          </div>

          <img
            src={`assets/utils/star.svg`}
            alt={`star icon`}
          />
        </div>
      ))}
    </section>
  );
}

export default ListSection;
