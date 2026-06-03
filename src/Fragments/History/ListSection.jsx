import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { currencyFormatter } from '../../utils/currency';
import Pagination from '../../components/Pagination';
import { DEFAULT_PROFILE_IMAGE_SRC, getProfileImageSrc } from '../../utils/profileImage';
import { getTransactions } from '../../redux/slice/transactionSlice';

function ListSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState([]);

  // ✅ pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const dispatch = useDispatch();

  // ambil data + meta
  const { transactions: data, meta } = useSelector((state) => state.transaction);

  // fetch data setiap page berubah
  useEffect(() => {
    dispatch(getTransactions({ page, limit }));
  }, [dispatch, page, limit]);

  const handleClick = (item) => {
    if (!isModalOpen) {
      setUserDetail([item]);
    }
    setIsModalOpen(!isModalOpen);
  };

  return (
    <section className="flex flex-col">
      {/* LIST */}
      {console.log(data)}
      {data?.length === 0 || !data ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-gray-500">Belum ada transaksi</p>
        </div>
      ) : (
        data.map((d, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(d)}
            className={`grid grid-cols-3 md:grid-cols-5 items-center gap-4 border-b border-gray-300 px-4 py-3 cursor-pointer ${
              idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'
            }`}
          >
            {/* avatar */}
            <img
              src={getProfileImageSrc(d.user)}
              onError={(e) => {
                e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC;
              }}
              alt="avatar"
              className="w-10 h-10 rounded-full hidden md:block"
            />

            {/* name */}
            <p className="text-sm md:text-base text-gray-700 truncate">{d.CounterpartyName}</p>

            {/* phone */}
            <p className="text-sm md:text-base text-gray-500 truncate">{d.CounterpartyPhone}</p>

            {/* amount */}
            <p className={`text-sm md:text-base font-semibold whitespace-nowrap ${d.FlowType !== 'out' ? 'text-green-500' : 'text-red-500'}`}>
              {d.FlowType === 'out' ? '-' : '+'}
              {currencyFormatter.format(d.Amount)}
            </p>

            {/* delete */}
            <button className="justify-self-end hidden md:block">
              <img src="/assets/utils/trash-red.svg" alt="trash icon" />
            </button>
          </div>
        ))
      )}

      {/* ✅ PAGINATION */}
      {meta?.total_pages > 1 && <Pagination page={page} pageCount={meta.total_pages} onPageChange={setPage} />}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <button type="button" className="absolute inset-0 bg-black/50" onClick={handleClick} />

          <div className="relative mx-auto mt-18 w-[min(92vw,34rem)] rounded-xl bg-white px-8 py-6 shadow-lg">
            {userDetail.map((d, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className="text-xs font-semibold">DETAIL TRANSAKSI {d.counterparty_name}</div>

                <hr />

                <img
                  src={getProfileImageSrc(d.user)}
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC;
                  }}
                  alt="photo"
                  className="w-20"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h1 className="font-semibold text-sm">Nama:</h1>
                    <p>{d.counterparty_name}</p>
                  </div>

                  <div>
                    <h1 className="font-semibold text-sm">Status:</h1>
                    <p>Transfer berhasil</p>
                  </div>

                  <div>
                    <h1 className="text-sm">Nominal:</h1>
                    <p className={d.flow_type === 'out' ? 'text-red-500' : 'text-green-500'}>
                      {d.flow_type === 'out' ? '-' : '+'}
                      {currencyFormatter.format(d.amount)}
                    </p>
                  </div>
                </div>

                <button className="bg-white text-sm border-2 py-2 font-semibold rounded-lg border-red-500 text-red-500">HAPUS</button>

                <Button buttonColor="bg-blue-700" buttonTextColor="text-white" className="rounded-md" onClick={handleClick}>
                  Kembali
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default ListSection;
