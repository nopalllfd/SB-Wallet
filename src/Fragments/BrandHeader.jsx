function BrandHeader(props) {
  console.log(props.location);
  return (
    <section className={`icons flex justify-start items-center gap-3 ${props.location == 'home' ? '' : 'max-md:hidden'}`}>
      <img
        src="/assets/e-wallet.svg"
        alt="e-wallet icon"
      />
      <h2 className={`text-blue-800 font-normal text-2xl ${props.textColor}`}>SB-Wallet</h2>
    </section>
  );
}

export default BrandHeader;
