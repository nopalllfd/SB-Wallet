export const Input = ({ type, ...props }) => {
  console.log(type);
  return (
    <input
      className="outline-none border-0 w-full "
      {...props}
      type={type}
    />
  );
};
