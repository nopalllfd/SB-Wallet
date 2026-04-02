export const Icon = ({ iconSrc, iconAlt, onClick }) => {
  return (
    <img
      className="w-4"
      src={iconSrc}
      alt={iconAlt}
      onClick={onClick}
    />
  );
};
