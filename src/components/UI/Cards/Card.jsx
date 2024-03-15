import { string, object } from "prop-types";

const Card = ({ icon, title, children, className, color }) => {
  return (
    <div
      className={`bg-white rounded-xl border-[1px] border-border p-5 ${className}`}>
      <div className="flex gap-4 items-center">
        <div
          className={`w-10 h-10 flex justify-center items-center bg-opacity-10 rounded-md bg-${color}-500 text-${color}-500`}>
          {icon}
        </div>
        <h2 className="text-sm font-medium">{title}</h2>
      </div>
      {children}
    </div>
  );
};
export default Card;

Card.propTypes = {
  icon: string,
  title: string,
  children: object,
  className: string,
  color: string,
};
