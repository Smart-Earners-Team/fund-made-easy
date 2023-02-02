import React from "react";
import CountUp from "react-countup";

type Props = {
  amount: number;
  label: string;
  prefix: string;
};

export default function StatCard({ amount, label, prefix }: Props) {
  return (
    <div className="p-5 text-center w-full md:w-1/2">
      <CountUp
        start={0}
        end={amount}
        duration={2.75}
        separator=","
        decimal="."
        prefix={prefix}
      >
        {({ countUpRef }) => (
          <em
            ref={countUpRef}
            className="text-4xl font-bold -mt-4 text-primary-900 mb-5"
          >
            {amount}
          </em>
        )}
      </CountUp>
      <div className="text-primary-900 text-3xl font-light">{label}</div>
    </div>
  );
}
