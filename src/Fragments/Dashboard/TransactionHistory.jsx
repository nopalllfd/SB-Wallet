import { useDispatch, useSelector } from 'react-redux';
import { currencyFormatter } from '../../utils/currency';
import { Link } from 'react-router';
import { useEffect } from 'react';
import { getTransactions } from '../../redux/slice/transactionSlice';

// MUI
import Avatar from '@mui/material/Avatar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

function TransactionHistory() {
  const { transactions: data } = useSelector((state) => state.transaction);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions({ limit: '7' }));
  }, [dispatch]);

  const getIcon = (flow) => {
    return flow === 'in' ? TrendingUpIcon : TrendingDownIcon;
  };

  return (
    <section className="mt-6 px-2">
      <div className="mx-auto max-w-5xl bg-white border border-gray-100 shadow-sm rounded-xl p-4 md:p-5">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-4">
          <div className="flex justify-between gap-2 text-gray-700">
            <ReceiptLongIcon fontSize="small" />
            <h2 className="text-sm md:text-base font-semibold">Riwayat Transaksi</h2>
          </div>

          <Link to="/history" className="text-blue-600 text-sm hover:underline">
            Lihat Semua
          </Link>
        </header>

        {/* LIST */}
        <div className="flex flex-col gap-3">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((d, idx) => {
              const Icon = getIcon(d?.FlowType);

              return (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition">
                  {/* LEFT */}
                  <div className="flex items-center gap-3">
                    <Avatar sx={{ bgcolor: '#f1f5f9' }}>
                      <Icon
                        fontSize="small"
                        style={{
                          color: d?.FlowType === 'in' ? '#16a34a' : '#ef4444',
                        }}
                      />
                    </Avatar>

                    <div className="flex flex-col">
                      <p className="font-medium text-sm text-gray-800">{d?.CounterpartyName ?? '-'}</p>
                      <p className="text-xs text-gray-500">{d?.FlowType === 'in' ? 'Income' : 'Expense'}</p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <p className={`font-semibold text-sm ${d?.FlowType === 'out' ? 'text-red-500' : 'text-green-600'}`}>
                    {d?.FlowType === 'out' ? '-' : '+'}
                    {currencyFormatter.format(d?.Amount ?? 0)}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-6 text-sm">Tidak ada data transaksi</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TransactionHistory;
