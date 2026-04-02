import { Button } from '../../../components/Button';

function AlternatifRegister() {
  return (
    <section className="alternatif-login flex gap-2 mt-4">
      <span className="google-button">
        <Button
          border={'border'}
          className="px-20 py-4 rounded-3xl border-gray-400"
        >
          <img
            src="../src/assets/inputs/google.svg"
            alt="google icon"
          />
        </Button>
      </span>
      <span className="facebook-button">
        <Button
          border={'border'}
          className="px-20 py-4 rounded-3xl border-gray-400"
        >
          <img
            src="../src/assets/inputs/facebook.svg"
            alt="facebook icon"
          />
        </Button>
      </span>
    </section>
  );
}

export default AlternatifRegister;
