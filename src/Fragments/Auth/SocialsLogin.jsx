import { Button } from '../../components/Button';

function SocialsLogin() {
  return (
    <section className="alternatif-login justify-center flex md:flex-col gap-2 mt-4">
      <span className="google-button">
        <Button
          border={'border'}
          className="max-sm:px-15 max-sm:py-2 px-18 py-4 cursor-pointer md:py-2 md:flex md:items-center md:justify-center md:gap-2 rounded-3xl border-gray-400"
        >
          <img
            src="/assets/inputs/google.svg"
            alt="google icon"
            className="w-12 md:w-8"
          />
          <p className="hidden md:inline text-gray-700">Sign In With Google</p>
        </Button>
      </span>
      <span className="facebook-button ">
        <Button
          border={'border'}
          className="max-sm:px-15 max-sm:py-2 px-18 py-4 cursor-pointer md:py-2 md:flex md:items-center md:justify-center md:gap-2 rounded-3xl border-gray-400"
        >
          <img
            src="/assets/inputs/facebook.svg"
            alt="facebook icon"
            className="w-12 md:w-8"
          />
          <p className="hidden md:inline text-gray-700">Sign In With Facebook</p>
        </Button>
      </span>
    </section>
  );
}

export default SocialsLogin;
