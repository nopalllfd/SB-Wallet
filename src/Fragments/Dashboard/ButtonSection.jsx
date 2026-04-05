import { Button } from '../../components/Button';

function ButtonSection() {
  return (
    <section className="mt-16 px-8 md:px-2 md:mt-2 md:border md:border-gray-200 md:rounded-md md:bg-white md:py-2">
      <div className="flex w-full gap-4 items-center">
        <h1 className="text-md font-semibold max-md:hidden md:w-1/2 ">Fast Service</h1>
        <div className="flex justify-end w-full md:w-full md:ps-50 gap-2">
          <Button
            buttonColor={'bg-blue-700'}
            buttonTextColor={'text-white'}
            className={'rounded-xl md:rounded-md'}
          >
            <p>Top Up</p>
          </Button>
          <Button
            buttonColor={'bg-blue-700'}
            buttonTextColor={'text-white'}
            className={'rounded-xl md:rounded-md'}
          >
            <p>Transfer</p>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ButtonSection;
