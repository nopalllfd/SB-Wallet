export const Input = ({ type, onChange, ...props }) => {
  return (
    <input
      {...props}
      type={type}
      className="outline-none"
      onChange={onChange}
    />
  );
};
