import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { currencyFormatter } from '../../utils/currency';
import { topup } from '../../redux/slice/transactionSlice';

function Cart({ amount, paymentMethod, resetForm }) {
  const dispatch = useDispatch();
  console.log(amount, paymentMethod);
  // const user = useSelector((state) => state.user);
  const delivery = 2500;
  const tax = delivery * 0.12;
  const total = Number(tax) + Number(amount) + delivery;
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!Number(amount) || Number(amount) <= 0) {
        toast.error('Nominal top up harus lebih dari Rp0');
        return;
      }
      if (!paymentMethod) {
        toast.error('Pilih metode pembayaran terlebih dahulu');
        return;
      }
      const payload = {
        amount,
        method_id: paymentMethod,
      };
      await dispatch(topup(payload)).unwrap();
      toast.success('Top up berhasil');
      resetForm();
    } catch (error) {
      toast.error(error.message || 'failed topup');
    }
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
          <span className="font-medium text-gray-600">Admin Fee</span>
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
