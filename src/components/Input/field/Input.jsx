export const Input = ({ type, onChange, ...props }) => {
  return (
    <input
      {...props}
      type={type}
      onChange={onChange}
    />
  );
};
