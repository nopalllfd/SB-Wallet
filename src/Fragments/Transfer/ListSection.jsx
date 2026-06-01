import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/Pagination';
import { DEFAULT_PROFILE_IMAGE_SRC, getProfileImageSrc } from '../../utils/profileImage';
import { useEffect } from 'react';
import { getReceivers } from '../../redux/slice/transactionSlice';
import { useNavigate } from 'react-router';
import HeaderSection from './HeaderSection';

function ListSection({ searchQuery, page, onPageChange }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { receivers: users, meta, loading } = useSelector((state) => state.transaction);

  const handleClick = (id) => {
    navigate(`/transfer/${id}`);
  };
  console.log(meta?.total_pages || 'page kosong');

  useEffect(() => {
    const payloadParam = {
      page,
      limit: 10,
      search: searchQuery,
    };

    dispatch(getReceivers(payloadParam));
  }, [dispatch, page, searchQuery]);

  return (
    <section className="flex flex-col gap-6 py-6 relative">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : users?.length > 0 ? (
        users.map((d, idx) => (
          <div
            key={d.Id}
            onClick={() => handleClick(d.Id)}
            className={`flex justify-between p-3 cursor-pointer rounded-md transition
              ${idx % 2 === 0 ? 'bg-white hover:bg-gray-100' : 'bg-gray-100 hover:bg-white'}
            `}
          >
            <img
              src={getProfileImageSrc(d)}
              onError={(e) => {
                e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC;
              }}
              alt={d.FullName}
              className="w-12 h-12 rounded-full"
            />

            <div className="flex flex-1 ms-20 me-50 gap-10 md:ms-10 max-sm:justify-around max-sm:ms-0 max-sm:me-0 items-center justify-between">
              {/* NAME */}
              <div className="flex flex-col">
                <p className="text-base  font-semibold text-gray-800 truncate max-w-[220px]">{d.FullName}</p>
              </div>

              {/* PHONE */}
              <p className="text-sm font-medium text-start text-gray-700 max-sm:truncate whitespace-nowrap">{d.Phone || '0000000000'}</p>
            </div>

            <img src="/assets/utils/star.svg" alt="star icon" />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Tidak ada data</p>
      )}

      {/* PAGINATION */}
      {meta && meta.total_pages > 1 && <Pagination page={meta.page} pageCount={meta.total_pages} onPageChange={onPageChange} />}
    </section>
  );
}

export default ListSection;
