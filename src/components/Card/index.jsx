/**
 * @param {object} props
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.icon]
 * @param {string} [props.text]
 * @param {string} [props.alt]
 * @returns {JSX.Element}
 */

function Card(props) {
  return (
    <div
      className=" rounded-xl py-8 px-5 md:px-3 md:py-6 bg-blue-500 flex flex-col gap-2 justify-center items-center
     text-white"
    >
      <img
        className="bg-white rounded-full w-1/6 md:w-1/3 p-3"
        src={props.icon}
        alt={props.alt}
      />
      <h1 className="font-semibold text-center">{props.children}</h1>
      <p className="text-center font-light">{props.text}</p>
    </div>
  );
}

export default Card;
