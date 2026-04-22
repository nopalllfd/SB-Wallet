import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function ListSection(props) {
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.register);
  const { user: currentUser } = useSelector((state) => state.user);
  const handleClick = (id) => {
    navigate(`/transfer/${id}`);
  };

  const data = users.filter((user) => user?.id != currentUser?.id);

  const filteredData = data.filter((item) => {
    return item.fullName.toLowerCase().includes(props.searchQuery.toLowerCase());
  });

  return (
    <section className="flex flex-col gap-3 py-6 z-0 relative">
      {filteredData.length > 0 ? (
        filteredData.map((d, idx) => (
          <div
            key={idx}
            onClick={() => {
              handleClick(d.id);
            }}
            className={`flex justify-between bg-gray-100 p-3 cursor-pointer hover:bg-white rounded-md ${idx % 2 == 0 ? 'bg-white hover:bg-gray-100' : ''}`}
          >
            <img src={`/assets/users/Ghaluh.svg`} alt={`${d.fullName} icon`} className="w-13" />
            <div className="flex-2 ms-10 md:ms-30 md:me-30 md:flex md:gap-4 md:items-center md:justify-between">
              <p className="text-lg">{d.fullName}</p>
              <p>{d.phone || '0000000000'}</p>
            </div>

            <img src={`/assets/utils/star.svg`} alt={`star icon`} />
          </div>
        ))
      ) : (
        <p className="text-center">{`Tidak ada data`}</p>
      )}
    </section>
  );
}

export default ListSection;
