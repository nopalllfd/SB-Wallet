import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import Pagination from '../../components/Pagination';
import { DEFAULT_PROFILE_IMAGE_SRC, getProfileImageSrc } from '../../utils/profileImage';

function ListSection(props) {
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.register);
  const { user: currentUser } = useSelector((state) => state.user);
  const pageSize = 6;
  const handleClick = (id) => {
    navigate(`/transfer/${id}`);
  };

  const data = useMemo(() => users.filter((user) => user?.id != currentUser?.id), [users, currentUser?.id]);

  const filteredData = useMemo(() => {
    const q = String(props.searchQuery || '').toLowerCase();
    return data.filter((item) => String(item.fullName || '').toLowerCase().includes(q));
  }, [data, props.searchQuery]);

  const pageCount = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const safePage = Math.min(props.page || 1, pageCount);
  const pageStart = (safePage - 1) * pageSize;
  const pagedData = filteredData.slice(pageStart, pageStart + pageSize);

  return (
    <section className="flex flex-col gap-3 py-6 z-0 relative">
      {pagedData.length > 0 ? (
        pagedData.map((d, idx) => (
          <div
            key={idx}
            onClick={() => {
              handleClick(d.id);
            }}
            className={`flex justify-between bg-gray-100 p-3 cursor-pointer hover:bg-white rounded-md ${idx % 2 == 0 ? 'bg-white hover:bg-gray-100' : ''}`}
          >
            <img
              src={getProfileImageSrc(d)}
              onError={(e) => {
                e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC;
              }}
              alt={`${d.fullName} icon`}
              className="w-13"
            />
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
      <Pagination page={safePage} pageCount={pageCount} onPageChange={props.onPageChange} />
    </section>
  );
}

export default ListSection;
