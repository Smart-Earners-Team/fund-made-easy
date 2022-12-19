import classNames from "classnames";
import React from "react";

interface MetricChipProps {
    label: string;
    value: string;
    symbol: string;
    borderColorClassName?: string;
    icon: React.ReactNode;
    actionContainer?: JSX.Element;
  }
  
  const MetricChip = ({
    label,
    value,
    symbol,
    borderColorClassName,
    icon,
    actionContainer,
  }: MetricChipProps) => {
    return (
      <div className="bg-white py-2 px-3 shadow-md rounded-lg text-base w-full flex gap-4 justify-between items-center border">
        <div className="space-y-1 w-full">
          <div className="flex items-center text-xs space-x-1">
            {icon}
            <span>{symbol}</span>
          </div>
          <div
            className={classNames(
              "border-l-4 pl-3 w-full",
              borderColorClassName,
              {
                "border-red-500": !borderColorClassName,
              }
            )}
          >
            <div className="font-medium">{label}</div>
            <div className="font-medium text-gray-500">{value}</div>
          </div>
        </div>
        {actionContainer && <div className="w-full">{actionContainer}</div>}
      </div>
    );
  };

  export default MetricChip;