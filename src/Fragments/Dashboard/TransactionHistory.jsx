import { useDispatch, useSelector } from 'react-redux';
import { currencyFormatter } from '../../utils/currency';
import { Link } from 'react-router';
import { useEffect } from 'react';
import { getTransactions } from '../../redux/slice/transactionSlice';

function TransactionHistory() {
  const { transactions: data } = useSelector((state) => state.transaction);
  // const { user } = useSelector((state) => state.user);
  console.log(data);
  const limit = '7';
  const payload = {
    limit,
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions(payload));
  }, [dispatch]);

  return (
    <section className="transaction-history px-8 mt-5 pb-8 md:px-3 md:w-80 md:bg-white md:border-gray-200 md:rounded-sm md:mt-2 md:border md:py-2">
      <header className="flex justify-between">
        <h2 className="text-md font-semibold">Riwayat Transaksi</h2>
        <Link to="/history" className="text-blue-700">
          Lihat Semua
        </Link>
      </header>
      <div className="flex flex-col gap-4 mt-5">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((d, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <img src="/assets/transaction-profile.svg" alt="" />

              <div className="flex-2 ms-5 flex flex-col gap-1">
                <p className="font-semibold">{d?.counterparty_name ?? '-'}</p>
                <p>{d?.flow_type === 'in' ? 'Masuk' : 'Keluar'}</p>
              </div>

              <h2 className={`${d?.flow_type === 'out' ? 'text-red-500' : 'text-green-500'} font-bold`}>
                {d?.flow_type === 'out' ? '-' : '+'}
                {currencyFormatter.format(d?.amount ?? 0)}
              </h2>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">Tidak ada data transaksi</div>
        )}
      </div>
    </section>
  );
}

export default TransactionHistory;
