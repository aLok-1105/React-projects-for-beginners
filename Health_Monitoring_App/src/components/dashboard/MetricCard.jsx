import { Footprints, Flame, Moon, Zap } from "lucide-react";

const Icon = ({ icon, className = "" }) => {
  const icons = {
    steps: <Footprints className={`w-8 h-8 ${className}`} />,
    calories: <Flame className={`w-8 h-8 ${className}`} />,
    sleep: <Moon className={`w-8 h-8 ${className}`} />,
    activity: <Zap className={`w-8 h-8 ${className}`} />,
  };
  return icons[icon] || null;
};

const MetricCard = ({ title, value, unit, icon, color, trend }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-400",
    green: "from-emerald-500 to-emerald-400",
    purple: "from-purple-500 to-purple-400",
    orange: "from-orange-500 to-orange-400",
  };

  const iconColorClasses = {
    blue: "text-blue-100",
    green: "text-emerald-100",
    purple: "text-purple-100",
    orange: "text-orange-100",
  };

  return (
    <div
      className={`bg-gradient-to-br ${colorClasses[color]} p-6 rounded-2xl shadow-lg text-white transform hover:-translate-y-1 transition-transform duration-300`}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold capitalize">{title}</h3>
        <div
          className={`p-2 bg-white/20 rounded-full ${iconColorClasses[color]}`}
        >
          <Icon icon={icon} className="w-6 h-6" />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-4xl font-bold">{value.toLocaleString()}</p>
        <p className="text-sm opacity-80">{unit}</p>
      </div>
      {trend && (
        <div className="mt-4 flex items-center space-x-1 text-sm font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`lucide lucide-trending-up ${
              trend.change > 0 ? "" : "transform rotate-180"
            }`}
          >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
          <span>
            {trend.change > 0 ? `+${trend.change}%` : `${trend.change}%`} vs
            last week
          </span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
