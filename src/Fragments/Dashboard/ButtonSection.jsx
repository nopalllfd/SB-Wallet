import { Button } from '../../components/Button';

function ButtonSection() {
  return (
    <section className="mt-16 flex px-8 gap-4">
      <Button
        buttonColor={'bg-blue-700'}
        buttonTextColor={'text-white'}
        className={'rounded-xl'}
      >
        <p>Top Up</p>
      </Button>
      <Button
        buttonColor={'bg-blue-700'}
        buttonTextColor={'text-white'}
        className={'rounded-xl'}
      >
        <p>Transfer</p>
      </Button>
    </section>
  );
}

export default ButtonSection;
