import { useState } from 'react';
import { useNavigate } from 'react-router';
import { InputGroup } from '../../../components/Input';
import { Button } from '../../../components/Button';
import Modal from '../../../components/Modal/Modal';
import AuthLink from '../../Auth/AuthLink';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { clearTransferDraft, setTransferDraft } from '../../../redux/slice/transferSlice';
import PinInput from './PinInput';
import { updateBalance } from '../../../redux/slice/userSlice';
import { updateUserBalance } from '../../../redux/slice/registerSlice';
import { addTransaction } from '../../../redux/slice/transactionSlice';
import { toast } from 'sonner';

function TransferDetail(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successInfo, setSuccessInfo] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({ mode: 'onChange' });
  const { draft } = useSelector((state) => state.transfer);
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.register);

  const currentUser = users.find((u) => u.id == user.id);
  if (props.userId) {
    const selectedUser = users.find((d) => d.id == props.userId);
    console.log(selectedUser);

    if (!selectedUser) {
      return <div className="py-6 text-center text-red-500">User tidak ditemukan!</div>;
    }

    const handlePinSubmit = (finalPin) => {
      let status = true;
      console.log(currentUser.pin, finalPin);
      if (currentUser.pin !== finalPin) {
        toast.error('PIN salah!');
        return;
      }
      if (status) {
        dispatch(
          updateUserBalance({
            id: user.id,
            amount: draft.amount,
            type: 'TRANSFER_OUT',
          }),
        );
        dispatch(
          updateBalance({
            amount: draft.amount,
            type: 'TRANSFER_OUT',
          }),
        );
        dispatch(
          addTransaction({
            ...draft,
            userId: user.id,
            type: 'TRANSFER_OUT',
          }),
        );
        setSuccessInfo({
          toName: selectedUser.fullName,
          amount: draft.amount,
        });
        dispatch(clearTransferDraft());
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
      }
    };

    const handleCloseSuccessModal = () => {
      setIsSuccessModalOpen(false);
      setSuccessInfo(null);
      navigate('/transfer');
    };

    const onSubmitData = (data) => {
      const finalData = {
        toUserId: selectedUser.id,
        amount: data.amount,
        description: data.desc,
      };
      console.log(finalData);
      dispatch(setTransferDraft(finalData));
      setIsModalOpen(true);
    };

    return (
      <div className="">
        <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-md">
          <img src={`/assets/users/Ghaluh.svg`} alt={`${selectedUser.fullName} icon`} className="w-16" />
          <div>
            <p className="text-xl font-bold">{selectedUser.fullName}</p>
            <p className="text-gray-600">{selectedUser.phone || '0000'}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmitData)} className="flex flex-col gap-4 ps-1">
          <div className="">
            <label className="block text-md font-medium mb-1 mt-2">Amount</label>
            <InputGroup
              {...register('amount')}
              iconSrc={'/assets/transfer/money.svg'}
              iconAlt={'money icon'}
              placeholder={'Enter nominal transfer'}
              type={'number'}
            >
              <p className="text-sm text-gray-600 mb-2"> Type the amount you want to transfer and then press continue to the next steps.</p>
            </InputGroup>
          </div>
          <div>
            <label className="block text-md font-medium mb-1">Notes</label>
            <p className="text-sm text-gray-600 mb-2"> You can add some notes for this transfer such as payment coffee or something</p>

            <textarea
              {...register('desc')}
              placeholder="Enter some notes"
              className="w-full border border-gray-400 p-3 rounded-xl resize-none"
              rows="3"
            ></textarea>
          </div>
          <Button
            buttonColor={'bg-blue-700'}
            className="text-white py-3 rounded-md font-semibold hover:bg-blue-100 hover:border transition hover:text-blue-700"
          >
            Submit & Transfer
          </Button>
        </form>

        <>
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <p className="text-sm font-bold text-gray-500">Transfer to {selectedUser.fullName}</p>
            <div className="border-b border-gray-400"></div>
            <div className="text pt-10 flex flex-col gap-3">
              <h1 className="text-2xl">Enter Your Pin 👋</h1>
              <p className="text-gray-500">Enter Your Pin For Transaction</p>

              <PinInput onSubmit={handlePinSubmit} />

              <AuthLink link="/auth/reset-pin" type="Reset">
                Forgot Your Pin?
              </AuthLink>
            </div>
          </Modal>
        </>

        <Modal open={isSuccessModalOpen} onClose={handleCloseSuccessModal}>
          <div className="flex flex-col gap-3 justify-center items-center">
            <div className="flex justify-center gap-3 border-b w-full border-gray-400">
              <img src="/assets/utils/verified.svg" alt="success icon" className="w-7 h-7" />
              <h2 className="text-md font-semibold text-gray-700">Transfer to {successInfo?.toName}</h2>
            </div>

            <img src="/assets/transfer/success.svg" className="w-1/2" alt="" />
            <p className="text-2xl">
              Yeay Transfer
              <span className="font-semibold text-green-500 text-2xl"> Success</span>
            </p>
            <p className="text-sm text-gray-600">Thank you for using this application for your financial</p>
            <div className="pt-3 w-full">
              <Button buttonColor="bg-blue-700" buttonTextColor="text-white" className="rounded-md w-full" onClick={handleCloseSuccessModal}>
                Done
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default TransferDetail;
