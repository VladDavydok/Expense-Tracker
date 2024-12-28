import React from 'react';
import { BsCashCoin, BsCurrencyDollar } from 'react-icons/bs';
import { SiCashapp } from 'react-icons/si';

import { formatCurrency } from '../libs';
import { Card } from './ui/card';

const ICON_STYLES = [
  'bg-blue-300 text-blue-800',
  'bg-emerald-300 text-emerald-800',
  'bg-rose-300 text-rose-800',
];

const Stats = ({ dt }) => {
  const data = [
    {
      label: 'Total Balance',
      amount: dt?.balance,
      increase: 10.9,

      icon: <BsCurrencyDollar size={26} />,
    },
    {
      label: 'Total Income',
      amount: dt?.income,
      icon: <BsCashCoin size={26} />,
      increase: 8.9,
    },
    {
      label: 'Total Expense',
      amount: dt?.expense,
      icon: <SiCashapp size={26} />,
      increase: -10.9,
    },
  ];

  const ItemCard = ({ item, index }) => {
    return (
      <Card className="flex items-center justify-between w-full h-48 gap-5 px-4 py-12 shadow-1g 2x1:min-w-96 2x1:px-8 dark: border">
        <div className="flex items-center w-full h-full gap-4">
          <div
            className={`w-12 h-12 flex items-center justify-center rounded-full ${ICON_STYLES[index]}`}
          >
            {item.icon}
          </div>

          <div className="space-y-3">
            <span className="text-base text-gray-600 dark:text-gray-400 md:text-lg">
              {item.label}
            </span>
            <p className="text-2x1 font-medium text-black 2x1:text-3x1dark:text-gray-400">
              {formatCurrency(item?.amount || 0.0)}
            </p>
            <span className="text-xs text-gray-600 md:text-sm 2x1:text-base dark:text-gray-500">
              Overall {item.label}
            </span>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="flex flex-col items-center justify-between gap-8 mb-20 md:flex-row 2x1:gap-x-40">
      <div className="flex flex-col items-center justify-between w-full gap-10 md:flex-row 2x1:gap-20 ">
        {data?.map((item, index) => (
          <ItemCard key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Stats;
