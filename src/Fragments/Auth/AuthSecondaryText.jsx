function AuthSecondaryText(props) {
  return (
    <section className="secondary-text">
      <p className="text-md text-gray-500">{props.children}</p>
    </section>
  );
}

export default AuthSecondaryText;
