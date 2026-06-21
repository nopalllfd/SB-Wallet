import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { currencyFormatter } from '../../utils/currency';
import { topup } from '../../redux/slice/transactionSlice';

// MUI ICON
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PercentIcon from '@mui/icons-material/Percent';

function Cart({ amount, paymentMethod, resetForm }) {
  const dispatch = useDispatch();

  const adminFee = 2500;
  const tax = adminFee * 0.12;
  const total = Number(amount || 0) + adminFee + tax;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!Number(amount) || Number(amount) <= 0) {
      toast.error('Nominal top up harus lebih dari Rp0');
      return;
    }

    if (!paymentMethod) {
      toast.error('Pilih metode pembayaran terlebih dahulu');
      return;
    }

    try {
      await dispatch(topup({ amount, method_id: paymentMethod })).unwrap();
      toast.success('Top up berhasil');
      resetForm();
    } catch (error) {
      toast.error(error.message || 'failed topup');
    }
  };

  return (
    <form className="w-full max-w-md bg-white border border-gray-100 shadow-sm rounded-xl p-4 sm:p-5" onSubmit={onSubmit}>

      <div className="flex items-center gap-2 mb-5">
        <AccountBalanceWalletIcon className="text-blue-700" />
        <h2 className="text-lg font-semibold">Payment</h2>
      </div>

      <div className="space-y-3 text-sm">

        <div className="flex justify-between">
          <span className="flex items-center gap-1 text-gray-600">
            <ReceiptIcon fontSize="small" /> Order
          </span>
          <span className="font-semibold">{currencyFormatter.format(amount || 0)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Admin Fee</span>
          <span className="font-semibold">{currencyFormatter.format(adminFee)}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-1 text-gray-600">
            <PercentIcon fontSize="small" /> Tax 12%
          </span>
          <span className="font-semibold">{currencyFormatter.format(tax)}</span>
        </div>

      </div>

      <hr className="my-4" />

      <div className="flex justify-between font-semibold mb-6">
        <span>Total</span>
        <span>{currencyFormatter.format(total)}</span>
      </div>

      <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg transition">
        Submit
      </button>

      <p className="text-xs text-gray-500 mt-3">
        *Get Discount if you pay with Bank Central Asia
      </p>
    </form>
  );
}

export default Cart;