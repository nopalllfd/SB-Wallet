function AuthTitle(props) {
  return (
    <section className="title">
      <h1 className="text-xl text-black">{props.children}</h1>
    </section>
  );
}

export default AuthTitle;
