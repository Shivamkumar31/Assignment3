// src/components/Card.jsx
const Card = ({ title, value, icon, className = 'bg-white' }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md flex items-center justify-between ${className}`}>
      <div className="flex flex-col">
        <p className="text-sm font-medium text-gray-600 uppercase">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className="text-indigo-500 bg-indigo-100 p-3 rounded-full">
        {icon}
      </div>
    </div>
  );
};

export default Card;