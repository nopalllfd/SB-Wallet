import { useState } from 'react';
import { useNavigate } from 'react-router';
import { InputGroup } from '../../../components/Input';
import { Button } from '../../../components/Button';
import Modal from '../../../components/Modal/Modal';
import AuthLink from '../../Auth/AuthLink';

function TransferDetail(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      name: 'Ghaluh',
      telp: '(239) 555-0108',
    },
    {
      id: 2,
      name: 'Albert Flores',
      telp: '(239) 555-0108',
    },
    {
      id: 3,
      name: 'Bessie Cooper',
      telp: '(239) 555-0108',
    },
    {
      id: 4,
      name: 'Ghaluh',
      telp: '(239) 555-0108',
    },
    {
      id: 5,
      name: 'Albert Flores',
      telp: '(239) 555-0108',
    },
    {
      id: 6,
      name: 'Bessie Cooper',
      telp: '(239) 555-0108',
    },
    {
      id: 7,
      name: 'Ghaluh',
      telp: '(239) 555-0108',
    },
    {
      id: 8,
      name: 'Albert Flores',
      telp: '(239) 555-0108',
    },
    {
      id: 9,
      name: 'Bessie Cooper',
      telp: '(239) 555-0108',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('[INFO] Submit & Transfer button clicked');
    return setIsModalOpen(!isModalOpen);
  };

  const handleSubmitPin = (e) => {
    e.preventDefault();
    return navigate('');
  };

  if (props.userId) {
    const selectedUser = data.find((d) => d.id == props.userId);

    if (!selectedUser) {
      return <div className="py-6 text-center text-red-500">User tidak ditemukan!</div>;
    }

    return (
      <div className="">
        <section className="flex flex-col gap-5 py-6">
          <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-md">
            <img src={`/assets/users/Ghaluh.svg`} alt={`${selectedUser.name} icon`} className="w-16" />
            <div>
              <p className="text-xl font-bold">{selectedUser.name}</p>
              <p className="text-gray-600">{selectedUser.telp}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-md font-medium mb-1">Amount</label>
              <InputGroup iconSrc={'/assets/transfer/money.svg'} iconAlt={'money icon'} placeholder={'Enter nominal transfer'} type={'number'}>
                <p className="text-sm text-gray-600 mb-2"> Type the amount you want to transfer and then press continue to the next steps.</p>
              </InputGroup>
            </div>
            <div>
              <label className="block text-md font-medium mb-1">Notes</label>
              <p className="text-sm text-gray-600 mb-2"> You can add some notes for this transfer such as payment coffee or something</p>

              <textarea placeholder="Enter some notes" className="w-full border border-gray-400 p-3 rounded-xl resize-none" rows="3"></textarea>
            </div>
            <Button
              buttonColor={'bg-blue-700'}
              className="text-white py-3 rounded-md font-semibold hover:bg-blue-100 hover:border transition hover:text-blue-700"
            >
              Submit & Transfer
            </Button>
          </form>
        </section>
        <>
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <p className="text-sm font-bold text-gray-500">Transfer to {selectedUser.name}</p>
            <div className="border-b border-gray-400"></div>
            <div className="text pt-10 flex flex-col gap-3">
              <h1 className="text-2xl">Enter Your Pin 👋</h1>
              <p className="text-gray-500">Enter Your Pin For Transaction</p>
              <div className="input">
                <form
                  onSubmit={handleSubmitPin}
                  className="
      input-group flex gap-2 mb-8 mt-6
      [&>input]:border-b
      [&>input]:w-1/8
      [&>input]:text-3xl
      [&>input]:pb-6
      [&>input]:outline-none
      [&>input]:text-center
      [&>input]:focus:border-blue-500
    "
                >
                  <input type="text" inputMode="numeric" pattern="[0-9]*" name="pin" maxLength="1" />
                  <input type="text" inputMode="numeric" pattern="[0-9]*" name="pin" maxLength="1" />
                  <input type="text" inputMode="numeric" pattern="[0-9]*" name="pin" maxLength="1" />
                  <input type="text" inputMode="numeric" pattern="[0-9]*" name="pin" maxLength="1" />
                  <input type="text" inputMode="numeric" pattern="[0-9]*" name="pin" maxLength="1" />
                  <input type="text" inputMode="numeric" pattern="[0-9]*" name="pin" maxLength="1" />
                  <input type="text" inputMode="numeric" pattern="[0-9]*" name="pin" maxLength="1" />
                </form>

                <section className="submit-button">
                  <Button buttonColor={'bg-blue-600'} buttonTextColor={'text-white'} className={'rounded-xl'}>
                    Next
                  </Button>
                </section>
              </div>
              <AuthLink link="/auth/reset-pin" type="Reset">
                Forgot Your Pin?
              </AuthLink>
            </div>
          </Modal>
        </>
      </div>
    );
  }
}

export default TransferDetail;
