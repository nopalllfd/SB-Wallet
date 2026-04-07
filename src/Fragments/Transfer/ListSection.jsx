import { useNavigate } from 'react-router';
import { Input } from '../../components/Input/field/Input';
import { InputGroup } from '../../components/Input';
import { Button } from '../../components/Button';
import { useState } from 'react';

function ListSection(props) {
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

  const handleClick = (id) => {
    navigate(`/transfer/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('[INFO] Submit & Transfer button clicked');
    return setIsModalOpen(!isModalOpen);
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
            <img
              src={`/assets/users/Ghaluh.svg`}
              alt={`${selectedUser.name} icon`}
              className="w-16"
            />
            <div>
              <p className="text-xl font-bold">{selectedUser.name}</p>
              <p className="text-gray-600">{selectedUser.telp}</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-md font-medium mb-1">Amount</label>
              <InputGroup
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
        </section>
        {isModalOpen ? <div className="-top-8 -left-10 absolute w-screen h-[130vh] z-10 opacity-50 bg-black transition-all">p</div> : ''}
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-3 py-6 z-0 relative">
      {data.map((d, idx) => (
        <div
          key={idx}
          onClick={() => {
            handleClick(d.id);
          }}
          className={`flex justify-between bg-gray-100 p-3 cursor-pointer hover:bg-white rounded-md ${idx % 2 == 0 ? 'bg-white hover:bg-gray-100' : ''}`}
        >
          <img
            src={`/assets/users/Ghaluh.svg`}
            alt={`${d.name} icon`}
            className="w-13"
          />
          <div className="flex-2 ms-10 md:ms-30 md:me-30 md:flex md:gap-4 md:items-center md:justify-between">
            <p className="text-lg">{d.name}</p>
            <p>{d.telp}</p>
          </div>

          <img
            src={`/assets/utils/star.svg`}
            alt={`star icon`}
          />
        </div>
      ))}
    </section>
  );
}

export default ListSection;
