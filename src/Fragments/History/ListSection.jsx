import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { currencyFormatter } from '../../utils/currency';
import Pagination from '../../components/Pagination';
import { DEFAULT_PROFILE_IMAGE_SRC, getProfileImageSrc } from '../../utils/profileImage';
import { getTransactions } from '../../redux/slice/transactionSlice';

function ListSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 10;

  const dispatch = useDispatch();
  const { transactions: data, meta } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(getTransactions({ page, limit }));
  }, [dispatch, page]);

  const handleClick = (item) => {
    setUserDetail(item);
    setIsModalOpen(true);
  };

  return (
    <section className="flex flex-col gap-3">
      {/* LIST */}
      {data?.length ? (
        data.map((d, idx) => (
          <div
            key={d.id || idx}
            onClick={() => handleClick(d)}
            className="
              flex items-center justify-between
              gap-3 px-4 py-3
              border border-gray-100 rounded-lg
              hover:bg-gray-50
              cursor-pointer
            "
          >
            {/* AVATAR */}
            <img
              src={getProfileImageSrc(d.user)}
              onError={(e) => (e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC)}
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* INFO */}
            <div className="flex flex-1 justify-between items-center px-2">
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-800 truncate max-w-[140px]">{d.CounterpartyName}</p>

                <p className="text-xs text-gray-500">{d.CounterpartyPhone}</p>
              </div>

              <p
                className={`
                font-semibold text-sm whitespace-nowrap
                ${d.FlowType === 'out' ? 'text-red-500' : 'text-green-500'}
              `}
              >
                {d.FlowType === 'out' ? '-' : '+'}
                {currencyFormatter.format(d.Amount)}
              </p>
            </div>

            <DeleteIcon className="text-red-500" fontSize="small" />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 py-10">Belum ada transaksi</p>
      )}

      {/* PAGINATION */}
      {meta?.total_pages > 1 && <Pagination page={page} pageCount={meta.total_pages} onPageChange={setPage} />}

      {/* MODAL */}
      {isModalOpen && userDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/50" />

          <div
            className="
            relative
            w-[92%] md:w-[420px]
            bg-white rounded-xl shadow-lg
            p-5
            flex flex-col gap-4
          "
          >
            {/* HEADER */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-sm font-semibold">Detail Transaction</h2>

              <CloseIcon className="cursor-pointer text-gray-500" onClick={() => setIsModalOpen(false)} />
            </div>

            {/* CONTENT */}
            <div className="flex items-center gap-3">
              <img
                src={getProfileImageSrc(userDetail.user)}
                onError={(e) => (e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC)}
                className="w-14 h-14 rounded-full"
              />

              <div>
                <p className="font-semibold">{userDetail.CounterpartyName}</p>
                <p className="text-sm text-gray-500">{userDetail.CounterpartyPhone}</p>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Status: <span className="text-green-600 font-semibold">Success</span>
            </div>

            <div className="text-sm">
              Amount:
              <span
                className={`
                ml-2 font-semibold
                ${userDetail.FlowType === 'out' ? 'text-red-500' : 'text-green-500'}
              `}
              >
                {userDetail.FlowType === 'out' ? '-' : '+'}
                {currencyFormatter.format(userDetail.Amount)}
              </span>
            </div>

            {/* ACTION */}
            <button className="flex items-center justify-center gap-2 text-red-500 border border-red-500 rounded-lg py-2 text-sm">
              <DeleteIcon fontSize="small" />
              Hapus
            </button>

            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-blue-700 text-white rounded-lg py-2 text-sm flex items-center justify-center gap-2"
            >
              <VisibilityIcon fontSize="small" />
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ListSection;
