import { Button } from '../../components/Button';
import { useNavigate } from 'react-router';

function ButtonSection() {
  const navigate = useNavigate();

  return (
    <section className="mt-16 px-8 md:px-2 md:mt-2 md:border md:border-gray-200 md:rounded-md md:bg-white md:py-2">
      <div className="flex w-full gap-4 items-center">
        <h1 className="text-md font-semibold max-md:hidden md:w-1/2 ">Fast Service</h1>
        <div className="flex w-full gap-2 md:justify-end">
          <Button
            buttonColor={'bg-blue-700'}
            buttonTextColor={'text-white'}
            className={'rounded-xl md:rounded-md flex max-md:justify-around justify-between items-center !w-1/2 md:!w-auto'}
            onClick={() => navigate('/topup')}
          >
            <img src={'assets/utils/topup.svg'} alt="top up icon" className="w-4" />
            <p>Top Up</p>
          </Button>
          <Button
            buttonColor={'bg-blue-700'}
            buttonTextColor={'text-white'}
            className={'rounded-xl md:rounded-md flex max-md:justify-around justify-between md:gap-2 md:px-2 md:pe-4 items-center !w-1/2 md:!w-auto'}
            onClick={() => navigate('/transfer')}
          >
            <img src={'assets/utils/transfer.svg'} alt="transfer icon" className="w-4" />

            <p>Transfer</p>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ButtonSection;
