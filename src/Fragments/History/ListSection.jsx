import { useMemo, useState } from 'react';
import { Button } from '../../components/Button';
import { useSelector } from 'react-redux';
import { currencyFormatter } from '../../utils/currency';
import Pagination from '../../components/Pagination';
import { DEFAULT_PROFILE_IMAGE_SRC, getProfileImageSrc } from '../../utils/profileImage';

function ListSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetail, setUserDetail] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const { transactions: data } = useSelector((state) => state.transaction);
  const { userMap } = useSelector((state) => state.register);
  const { user } = useSelector((state) => state.user);

  const result = useMemo(() => {
    const transferOutData = data.filter((item) => item.toUserId !== null && item.userId == user.id);
    return transferOutData.map((item) => ({
      ...item,
      user: userMap[item.toUserId],
    }));
  }, [data, user.id, userMap]);

  const pageCount = Math.max(1, Math.ceil(result.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const pageStart = (safePage - 1) * pageSize;
  const pagedResult = result.slice(pageStart, pageStart + pageSize);

  const handleClick = (item) => {
    if (!isModalOpen) {
      setUserDetail([item]);
    }
    return setIsModalOpen(!isModalOpen);
  };

  return (
    <section className="flex flex-col">
      {pagedResult.map((d, idx) => (
        <div
          key={idx}
          onClick={() => {
            handleClick(d, idx);
          }}
          className={`grid grid-cols-[1fr_auto] md:grid-cols-[auto_auto_auto_auto] items-center gap-3 border-b cursor-pointer border-gray-300 px-4 py-3 rounded-md ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
        >
          <img
            src={getProfileImageSrc(d.user)}
            onError={(e) => {
              e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC;
            }}
            alt={`${d.user?.fullName} icon`}
            className="w-13 hidden md:block"
          />
          <div className="min-w-0 flex flex-col gap-1 md:grid md:grid-cols-[18rem_1fr] md:items-center">
            <p className="text-base md:text-lg md:text-left md:ps-20  text-gray-700 truncate">{d.user?.fullName}</p>
          </div>

          <p className={`${d.type !== 'TRANSFER_OUT' ? 'text-green-500' : 'text-red-500'} text-base md:text-lg font-semibold whitespace-nowrap pe-10`}>
            {d.type == 'TRANSFER_OUT' ? '-' : '+'}
            {currencyFormatter.format(d.amount)}
          </p>
          <button className="delete hidden md:block">
            <img src="/assets/utils/trash-red.svg" alt="trash icon" />
          </button>
        </div>
      ))}
      <Pagination page={safePage} pageCount={pageCount} onPageChange={setPage} />
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <button type="button" className="absolute inset-0 bg-black/50" onClick={handleClick} aria-label="Close modal" />
          <div className="relative mx-auto mt-18 w-[min(92vw,34rem)] rounded-xl bg-white px-8 py-6 shadow-lg">
            {userDetail.map((d, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className="header text-xs">DETAIL TRANSAKSI {d.user.fullName}</div>

                <hr />
                <img
                  src={getProfileImageSrc(d.user)}
                  onError={(e) => {
                    e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC;
                  }}
                  alt={`${d.user.fullName} photo`}
                  className="w-20"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h1 className="font-semibold text-sm">Nama:</h1>
                    <p>{d.user.fullName}</p>
                  </div>
                  <div>
                    <h1 className="font-semibold text-sm">Status:</h1>
                    <p>Transfer berhasil</p>
                  </div>
                  <div>
                    <h1 className="text-sm">Nominal:</h1>
                    <p className={`${d.type == 'TRANSFER_OUT' ? 'text-red-500' : 'text-green-500'}`}>
                      {d.type == 'TRANSFER_OUT' ? '-' : '+'}
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
