import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/Pagination';
import { DEFAULT_PROFILE_IMAGE_SRC, getProfileImageSrc } from '../../utils/profileImage';
import { useEffect } from 'react';
import { getReceivers } from '../../redux/slice/transactionSlice';
import { useNavigate } from 'react-router';

// MUI ICON
import StarIcon from '@mui/icons-material/Star';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';

function ListSection({ searchQuery, page, onPageChange }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { receivers: users, meta, loading } = useSelector((state) => state.transaction);

  const handleClick = (id) => {
    navigate(`/transfer/${id}`);
  };

  useEffect(() => {
    dispatch(
      getReceivers({
        page,
        limit: 10,
        search: searchQuery,
      }),
    );
  }, [dispatch, page, searchQuery]);

  return (
    <section className="flex flex-col gap-4 py-6">
      {/* LOADING */}
      {loading && <div className="text-center text-gray-500 py-10">Loading...</div>}

      {/* LIST */}
      {!loading &&
        users?.length > 0 &&
        users.map((d, idx) => (
          <div
            key={d.Id}
            onClick={() => handleClick(d.Id)}
            className={`
              flex items-center gap-4
              p-3 md:p-4
              rounded-xl
              cursor-pointer
              transition-all duration-200
              border border-gray-100
              hover:shadow-md hover:border-gray-200
              ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            `}
          >
            {/* AVATAR */}
            <img
              src={getProfileImageSrc(d)}
              onError={(e) => {
                e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC;
              }}
              alt={d.FullName}
              className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover"
            />

            {/* INFO */}
            <div className="flex flex-1 flex-col md:flex-row md:items-center md:justify-between gap-2">
              {/* NAME */}
              <div className="flex items-center gap-2 min-w-0">
                <PersonIcon className="text-gray-400" fontSize="small" />

                <p className="text-sm md:text-base font-semibold text-gray-800 truncate max-w-[180px] md:max-w-[260px]">{d.FullName}</p>
              </div>

              {/* PHONE */}
              <div className="flex items-center gap-2 text-gray-600">
                <PhoneIcon className="text-gray-400" fontSize="small" />

                <p className="text-xs md:text-sm font-medium whitespace-nowrap">{d.Phone || '0000000000'}</p>
              </div>
            </div>

            {/* STAR */}
            <div className="text-yellow-500">
              <StarIcon fontSize="small" />
            </div>
          </div>
        ))}

      {/* EMPTY STATE */}
      {!loading && users?.length === 0 && <div className="text-center text-gray-500 py-10">Tidak ada data</div>}

      {/* PAGINATION */}
      {meta && meta.total_pages > 1 && (
        <div className="mt-4">
          <Pagination page={meta.page} pageCount={meta.total_pages} onPageChange={onPageChange} />
        </div>
      )}
    </section>
  );
}

export default ListSection;
