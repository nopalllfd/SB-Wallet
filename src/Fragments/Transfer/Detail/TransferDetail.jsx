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

// MUI ICON
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NotesIcon from '@mui/icons-material/Notes';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

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

  const { register, handleSubmit } = useForm({ mode: 'onChange' });

  const selectedUser = useSelector((state) => state.auth.selectedUser);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(getUserDetail(userId));
  }, [dispatch, userId]);

  if (loading || !selectedUser) {
    return <div className="flex justify-center py-10 text-gray-500">Loading...</div>;
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
      setSuccessInfo({ toName: selectedUser.full_name });
      setIsSuccessModalOpen(true);
    } catch (err) {
      const message = err;

      if (message?.toLowerCase?.().includes('pin')) {
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
    setInputData({
      receiverWalletID: selectedUser.wallet_id,
      amount: Number(data.amount),
      description: data.desc,
    });

    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* USER INFO */}
      <div className="flex items-center gap-4 bg-white border border-gray-100 shadow-sm p-4 rounded-xl">
        <img
          src={getProfileImageSrc(selectedUser)}
          onError={(e) => (e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC)}
          alt="receiver"
          className="w-14 h-14 rounded-full object-cover"
        />

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <PersonIcon className="text-gray-400" fontSize="small" />
            <p className="text-lg font-semibold text-gray-800">{selectedUser.full_name}</p>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <PhoneIcon fontSize="small" />
            <p className="text-sm">{selectedUser.phone}</p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmitData)} className="flex flex-col gap-5">
        {/* AMOUNT */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-700">
            <AttachMoneyIcon fontSize="small" />
            Amount
          </label>

          <InputGroup
            {...register('amount', { required: true })}
            iconSrc="/assets/transfer/money.svg"
            placeholder="Enter nominal transfer"
            type="number"
          />
        </div>

        {/* NOTES */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-700">
            <NotesIcon fontSize="small" />
            Notes
          </label>

          <textarea
            {...register('desc')}
            placeholder="Enter some notes"
            className="w-full border border-gray-200 p-3 rounded-xl resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            rows="3"
          />
        </div>

        <Button buttonColor="bg-blue-700" buttonTextColor="text-white" className="py-3 rounded-xl font-semibold">
          Submit & Transfer
        </Button>
      </form>

      {/* PIN MODAL */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">
            Transfer to <span className="font-semibold">{selectedUser.full_name}</span>
          </p>

          <h2 className="text-xl font-semibold">Enter PIN</h2>

          <PinInput onSubmit={handlePinSubmit} />

          <AuthLink link="/auth/reset-pin" type="Reset">
            Forgot PIN?
          </AuthLink>
        </div>
      </Modal>

      {/* SUCCESS MODAL */}
      <Modal open={isSuccessModalOpen} onClose={handleCloseSuccessModal}>
        <div className="flex flex-col items-center gap-4 text-center">
          <CheckCircleIcon className="text-green-500" fontSize="large" />

          <h2 className="text-lg font-semibold">Transfer to {successInfo?.toName}</h2>

          <img src="/assets/transfer/success.svg" className="w-1/2" />

          <p className="text-2xl">
            Transfer <span className="text-green-500 font-semibold">Success</span>
          </p>

          <Button buttonColor="bg-blue-700" buttonTextColor="text-white" className="w-full rounded-xl" onClick={handleCloseSuccessModal}>
            Done
          </Button>
        </div>
      </Modal>

      {/* FAILED MODAL */}
      <Modal open={isFailedModalOpen} onClose={() => setIsFailedModalOpen(false)}>
        <div className="flex flex-col items-center gap-4 text-center">
          <ErrorIcon className="text-red-500" fontSize="large" />

          <h2 className="text-lg font-semibold">Transfer Failed</h2>

          <img src="/assets/transfer/transfer-failed.svg" className="w-1/2" />

          <p className="text-sm text-gray-600">{failedMessage || 'Something went wrong'}</p>

          <Button buttonColor="bg-blue-700" buttonTextColor="text-white" className="w-full rounded-xl" onClick={() => setIsFailedModalOpen(false)}>
            Try Again
          </Button>

          <button onClick={() => navigate('/dashboard')} className="text-sm text-blue-600 hover:underline">
            Back to Dashboard
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default TransferDetail;
