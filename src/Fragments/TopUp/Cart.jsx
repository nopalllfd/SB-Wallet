import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserBalance } from '../../redux/slice/registerSlice';
import { updateBalance } from '../../redux/slice/userSlice';
import { addTransaction } from '../../redux/slice/transactionSlice';
import { toast } from 'sonner';
import { currencyFormatter } from '../../utils/currency';

function Cart({ amount, setAmount, paymentMethod, onSubmitAttempt, onAfterSubmit }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const tax = amount * 0.12;
  const delivery = 2000;
  const total = Number(tax) + Number(amount) + delivery;
  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitAttempt?.();
    if (!Number(amount) || Number(amount) <= 0) {
      toast.error('Nominal top up harus lebih dari Rp0');
      return;
    }
    if (!paymentMethod) {
      toast.error('Pilih metode pembayaran terlebih dahulu');
      return;
    }
    dispatch(
      updateUserBalance({
        id: user.id,
        amount,
        type: 'TOP_UP',
      }),
    );
    dispatch(
      updateBalance({
        amount: amount,
        type: 'TOP_UP',
      }),
    );
    dispatch(
      addTransaction({
        userId: user.id,
        type: 'TOP_UP',
        amount: total,
        paymentMethod,
      }),
    );
    toast.success('Top up berhasil');
    setAmount(0);
    onAfterSubmit?.();
  };
  return (
    <form onSubmit={onSubmit} className="max-w-md bg-gray-100 px-4 h-full py-5 max-md:mt-5 rounded-xl font-sans text-gray-800">
      <h2 className="text-lg font-semibold mb-6 text-gray-900">Payment</h2>

      <div className="space-y-4 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Order</span>
          <span className="font-semibold text-gray-900">{currencyFormatter.format(amount) || 0}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Delivery</span>
          <span className="font-semibold text-gray-900">{currencyFormatter.format(delivery) || 0}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Tax 12%</span>
          <span className="font-semibold text-gray-900">{currencyFormatter.format(tax) || 0}</span>
        </div>
      </div>

      <hr className="border-gray-200 my-4" />

      <div className="flex justify-between items-center mb-6 text-sm">
        <span className="font-semibold text-gray-700">Sub Total</span>
        <span className="font-semibold text-gray-900">{currencyFormatter.format(total) || 0}</span>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200">Submit</button>

      <p className="text-sm text-gray-500 mt-4 leading-relaxed">*Get Discount if you pay with Bank Central Asia</p>
    </form>
  );
}

export default Cart;
