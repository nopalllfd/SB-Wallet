import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { InputGroup } from '../../../components/Input';
import { Button } from '../../../components/Button';
import Modal from '../../../components/Modal/Modal';
import AuthLink from '../../Auth/AuthLink';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import PinInput from './PinInput';
import { DEFAULT_PROFILE_IMAGE_SRC, getProfileImageSrc } from '../../../utils/profileImage';
import { getUserDetail } from '../../../redux/slice/authSlice';
import { transfer } from '../../../redux/slice/transactionSlice';
import { toast } from 'sonner';

function TransferDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);

  const [successInfo, setSuccessInfo] = useState(null);
  const [failedMessage, setFailedMessage] = useState('');
  const [inputData, setInputData] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();

  const { register, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const selectedUser = useSelector((state) => state.auth.selectedUser);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(getUserDetail(userId));
  }, [dispatch, userId]);

  if (loading) {
    return <div className="flex justify-center py-10">Loading...</div>;
  }

  if (!selectedUser) {
    return <div className="flex justify-center py-10">Loading...</div>;
  }

  const handlePinSubmit = async (finalPin) => {
    try {
      const finalData = {
        amount: inputData.amount,
        description: inputData.description,
        pin: finalPin,
        receiver_wallet_id: inputData.receiverWalletID,
      };

      await dispatch(transfer(finalData)).unwrap();

      setIsModalOpen(false);

      setSuccessInfo({
        toName: selectedUser.full_name,
      });

      setIsSuccessModalOpen(true);
    } catch (err) {
      const message = err;

      if (message.toLowerCase().includes('pin')) {
        toast.error('Invalid PIN');
        return;
      }

      setIsModalOpen(false);
      setFailedMessage(message);
      setIsFailedModalOpen(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setSuccessInfo(null);
    navigate('/transfer');
  };

  const onSubmitData = (data) => {
    const finalData = {
      receiverWalletID: selectedUser.wallet_id,
      amount: Number(data.amount),
      description: data.desc,
    };

    setInputData(finalData);
    setIsModalOpen(true);
  };

  return (
    <div>
      {/* USER INFO */}
      <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-md">
        <img
          src={getProfileImageSrc(selectedUser)}
          onError={(e) => {
            e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC;
          }}
          alt="receiver"
          className="w-16"
        />

        <div>
          <p className="text-xl font-bold">{selectedUser.full_name}</p>
          <p className="text-gray-600">{selectedUser.phone}</p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmitData)} className="flex flex-col gap-4 ps-1">
        <div>
          <label className="block text-md font-medium mb-1 mt-2">Amount</label>

          <InputGroup
            {...register('amount', { required: true })}
            iconSrc="/assets/transfer/money.svg"
            iconAlt="money icon"
            placeholder="Enter nominal transfer"
            type="number"
          >
            <p className="text-sm text-gray-600 mb-2">Type the amount you want to transfer and then press continue to the next steps.</p>
          </InputGroup>
        </div>

        <div>
          <label className="block text-md font-medium mb-1">Notes</label>

          <p className="text-sm text-gray-600 mb-2">You can add some notes for this transfer.</p>

          <textarea
            {...register('desc')}
            placeholder="Enter some notes"
            className="w-full border border-gray-400 p-3 rounded-xl resize-none"
            rows="3"
          />
        </div>

        <Button buttonColor="bg-blue-700" className="text-white py-3 rounded-md font-semibold">
          Submit & Transfer
        </Button>
      </form>

      {/* PIN MODAL */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p className="text-sm font-bold text-gray-500">Transfer to {selectedUser.full_name}</p>

        <div className="border-b border-gray-400"></div>

        <div className="pt-10 flex flex-col gap-3">
          <h1 className="text-2xl">Enter Your Pin 👋</h1>

          <p className="text-gray-500">Enter Your Pin For Transaction</p>

          <PinInput onSubmit={handlePinSubmit} />

          <AuthLink link="/auth/reset-pin" type="Reset">
            Forgot Your Pin?
          </AuthLink>
        </div>
      </Modal>

      {/* SUCCESS MODAL */}
      <Modal open={isSuccessModalOpen} onClose={handleCloseSuccessModal}>
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="flex justify-center gap-3 border-b w-full border-gray-400">
            <img src="/assets/utils/verified.svg" alt="success" className="w-7 h-7" />

            <h2 className="text-md font-semibold text-gray-700">Transfer to {successInfo?.toName}</h2>
          </div>

          <img src="/assets/transfer/success.svg" className="w-1/2" alt="" />

          <p className="text-2xl">
            Yeay Transfer <span className="font-semibold text-green-500">Success</span>
          </p>

          <p className="text-sm text-gray-600">Thank you for using this application</p>

          <div className="pt-3 w-full">
            <Button buttonColor="bg-blue-700" buttonTextColor="text-white" className="rounded-md w-full" onClick={handleCloseSuccessModal}>
              Done
            </Button>
          </div>
        </div>
      </Modal>

      {/* FAILED MODAL */}
      <Modal open={isFailedModalOpen} onClose={() => setIsFailedModalOpen(false)}>
        <div className="flex flex-col gap-3 justify-center items-center">
          {/* HEADER (disamakan dengan success) */}
          <div className="flex justify-center gap-3 border-b w-full border-gray-400">
            <h2 className="text-md font-semibold text-gray-700">Transfer to {selectedUser.full_name}</h2>
          </div>

          {/* ILLUSTRATION (disamakan ukuran layout success) */}
          <img src="/assets/transfer/transfer-failed.svg" className="w-1/2" alt="transfer failed" />

          {/* TITLE */}
          <p className="text-2xl">
            Oops Transfer <span className="font-semibold text-red-500">Failed</span>
          </p>

          {/* MESSAGE */}
          <p className="text-sm text-gray-600">{failedMessage || 'Sorry there is an issue with your transfer, try again later!'}</p>

          {/* BUTTON */}
          <div className="pt-3 w-full">
            <Button buttonColor="bg-blue-700" buttonTextColor="text-white" className="rounded-md w-full" onClick={() => setIsFailedModalOpen(false)}>
              Try Again
            </Button>
          </div>

          {/* BACK BUTTON (tetap, cuma gak diubah) */}
          <button
            onClick={() => {
              setIsFailedModalOpen(false);
              navigate('/dashboard');
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            Back to Dashboard
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default TransferDetail;
