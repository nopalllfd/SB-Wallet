import { useNavigate } from 'react-router';

function ListSection() {
  const navigate = useNavigate();
  const data = [
    {
      id: 1,
      name: 'Ghaluh',
      telp: '(239) 555-0108',
    },
    {
      id: 2,
      name: 'Albert Flores',
      telp: '(239) 555-0108',
    },
    {
      id: 3,
      name: 'Bessie Cooper',
      telp: '(239) 555-0108',
    },
  ];
  const handleClick = (id) => {
    console.log('p');
    navigate(`/transfer/${id}`);
  };
  return (
    <section className="flex flex-col gap-3 py-6">
      {data.map((d, idx) => (
        <div
          key={idx}
          onClick={() => {
            handleClick(d.id);
          }}
          className={`flex justify-between bg-gray-100 p-3 cursor-pointer hover:bg-white rounded-md ${idx % 2 == 0 ? 'bg-white hover:bg-gray-100' : ''}`}
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
