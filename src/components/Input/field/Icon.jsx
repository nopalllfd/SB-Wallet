export const Icon = ({ iconSrc, iconAlt, onClick }) => {
  return (
    <img
      className="w-5"
      src={iconSrc}
      alt={iconAlt}
      onClick={onClick}
    />
  );
};
