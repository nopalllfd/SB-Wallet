import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserBalance } from '../../redux/slice/registerSlice';
import { updateBalance } from '../../redux/slice/userSlice';
import { addTransaction } from '../../redux/slice/transactionSlice';
import toast from 'react-hot-toast';

function Cart({ amount, setAmount }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const tax = amount * 0.2;
  const total = Number(tax) + Number(amount);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    dispatch(
      updateUserBalance({
        id: user.id,
        amount: amount,
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
      }),
    );
    toast.success('Top up berhasil');
    setAmount('');
  };
  return (
    <form onSubmit={onSubmit} className="max-w-md bg-gray-100 px-4 h-full py-5 max-md:mt-5 rounded-xl font-sans text-gray-800">
      <h2 className="text-lg font-semibold mb-6 text-gray-900">Payment</h2>

      <div className="space-y-4 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Order</span>
          <span className="font-semibold text-gray-900">Rp. {amount || 0}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Delivery</span>
          <span className="font-semibold text-gray-900">Rp. 0</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Tax</span>
          <span className="font-semibold text-gray-900">Rp. {tax}</span>
        </div>
      </div>

      <hr className="border-gray-200 my-4" />

      <div className="flex justify-between items-center mb-6 text-sm">
        <span className="font-semibold text-gray-700">Sub Total</span>
        <span className="font-semibold text-gray-900">{total}</span>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200">Submit</button>

      <p className="text-sm text-gray-500 mt-4 leading-relaxed">*Get Discount if you pay with Bank Central Asia</p>
    </form>
  );
}

export default Cart;
