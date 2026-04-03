export const Input = ({ type, onChange, ...props }) => {
  console.log(type);
  return (
    <input
      className="outline-none border-0 w-full "
      {...props}
      type={type}
      onChange={onChange}
    />
  );
};
