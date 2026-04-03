function AuthTitle(props) {
  return (
    <section className="title">
      <h1 className="text-xl text-black md:text-2xl">{props.children}</h1>
    </section>
  );
}

export default AuthTitle;
