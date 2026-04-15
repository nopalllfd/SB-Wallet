export const Icon = ({ iconSrc, iconAlt, onClick }) => {
  return <img className="w-5 cursor-pointer" src={iconSrc} alt={iconAlt} onClick={onClick} />;
};
