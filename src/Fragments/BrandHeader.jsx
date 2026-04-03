function BrandHeader(props) {
  return (
    <section className={`icons flex justify-start items-center gap-3`}>
      <img
        src="../src/assets/e-wallet.svg"
        alt="e-wallet icon"
      />
      <h2 className={`text-blue-800 font-normal text-2xl ${props.textColor}`}>E-Wallet</h2>
    </section>
  );
}

export default BrandHeader;
