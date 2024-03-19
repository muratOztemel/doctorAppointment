import { string, object, node } from "prop-types";

const Card = ({ icon, title, children, className, color }) => {
  const bgColor = `bg-${color}-500`;
  const textColor = `text-${color}-500`;
  return (
    <div
      className={`bg-white rounded-xl border-[1px] border-border p-5 ${className}`}>
      <div className="flex gap-4 items-center">
        <div
          className={`w-10 h-10 flex flex-col justify-center items-center bg-opacity-10 rounded-md  ${bgColor} ${textColor}`}>
          {icon}
        </div>
        <div>
          <h2 className="text-sm font-medium">{title}</h2>
        </div>
      </div>
      {children}
    </div>
  );
};
export default Card;

Card.propTypes = {
  icon: object,
  title: string,
  children: node,
  className: string,
  color: string,
};
