function HeaderSectionDesktopOnly(props) {
  const headerData = [
    {
      id: 1,
      text: 'Find People',
    },
    {
      id: 2,
      text: 'Set Nominal',
    },
    {
      id: 3,
      text: 'Finish',
    },
  ];
  return (
    <header className="hidden md:block">
      <div className="flex gap-4 mb-6">
        <img
          src="/assets/utils/transfer-blue.svg"
          alt="transfer icon"
        />
        <h2 className="font-semibold text-gray-900">Transfer Money</h2>
      </div>
      <div className="flex items-center justify-start w-full max-w-3xl p-4 font-sans">
        {headerData.map((d) => (
          <>
            <div
              key={d.id}
              className="flex items-center gap-3"
            >
              <div className={`flex items-center justify-center w-6 h-6 text-sm ${d.id == props.step ? 'bg-blue-700' : 'bg-gray-500'} text-white rounded-full`}>{d.id}</div>
              <span className={`text-base ${d.id == props.step ? 'text-blue-700' : 'text-gray-500'}`}>{d.text}</span>
            </div>

            {d.id < 3 ? <div className="w-16 mx-4 border-t-2 border-gray-300 border-dashed sm:w-20"></div> : ''}
          </>
        ))}
      </div>
    </header>
  );
}

export default HeaderSectionDesktopOnly;
