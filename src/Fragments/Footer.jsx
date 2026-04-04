import BrandHeader from './BrandHeader';
import { InputGroup } from '../components/Input';
import { Button } from '../components/Button';
function Footer() {
  const socials = [
    {
      name: 'twitter',
      width: '17px',
    },
    {
      name: 'facebook',
      width: '10px',
    },
    {
      name: 'instagram',
      width: '20px',
    },
    {
      name: 'github',
      width: '20px',
    },
  ];
  return (
    <footer className="bg-blue-700 py-10 px-5 flex flex-col gap-6">
      <BrandHeader textColor={'text-white'} />
      <p className="text-gray-100 w-2/3 font-extralight">Clarity gives you the blocks and components you need to create a truly professional website.</p>
      <div className="contact flex flex-col gap-3">
        <h2 className="text-white font-semibold text-xl">GET IN TOUCH</h2>

        <div className="flex gap-2 items-center">
          <img
            src="../../src/assets/home/footer/tel.svg"
            alt="telephone icon"
          />
          <p className="text-white">+62 5637 8882 9901</p>
        </div>
        <div className="flex gap-2 items-center">
          <img
            src="../../src/assets/home/footer/email.svg"
            alt="email icon"
          />
          <p className="text-white">contact@zwallet.com</p>
        </div>
      </div>
      <div className="socials flex gap-2 flex-col">
        <h2 className="text-white font-semibold text-xl">SOCIAL MEDIA</h2>{' '}
        <div className="icon-group flex gap-3">
          {socials.map((data) => (
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center">
              <img
                src={`../../src/assets/home/footer/${data.name}.svg`}
                alt={`${data.name} icon`}
                width={data.width}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="newsletter flex flex-col gap-4">
        <h2 className="text-white font-semibold text-xl">NEWSLETTER</h2>
        <InputGroup
          placeholder="Enter your email"
          className="bg-white"
          iconSrc="../../src/assets/inputs/form/email.svg"
          type="email"
          iconAlt="email icon"
        />
        <Button buttonTextColor="text-blue-700 font-semibold rounded-xl">Subscribe</Button>
      </div>
      <div className="mt-4 divider border-b-2 w-auto border-white"></div>
      <div className="copyright">
        <p className=" text-center font-light text-gray-200">© Copyright 2022, All Rights Reserved by ClarityUI</p>
      </div>
    </footer>
  );
}

export default Footer;
