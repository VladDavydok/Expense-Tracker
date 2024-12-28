import React, { useState, useEffect } from 'react';
import api from '../libs/apiCall';
import { toast } from 'sonner';
import Loading from '../components/loading';
import Info from '../components/info';
import Stats from '../components/stats';
import RecentTransactions from '../components/recent-transactions';
import Accounts from '../components/accounts';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDashboardStats = async () => {
    const URL = `/transaction/dashboard`;
    try {
      const { data } = await api.get(URL);

      setData(data);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          'Something unexpected happened. Try again later.'
      );
      if (error?.response?.data?.status === 'auth_failed') {
        localStorage.removeItem('user');
        window.location.reload();
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetchDashboardStats();
  }, []);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-[80vh]">
        <Loading />
      </div>
    );

  return (
    <div className="px-0 md:px-5 2xl:px-20">
      <Info title="Dashboard" subTitle={'Monitor your financial activities'} />
      <Stats
        dt={{
          balance: data?.availableBalance,
          income: data?.totalIncome,
          expense: data?.totalExpense,
        }}
      />

      <div className="flex flex-col-reverse gap-0 md:flex-row md:gap-10 2x1:gap-20">
        <RecentTransactions data={data?.lastTransactions} />
        {data?.lastAccount?.length > 0 && <Accounts data={data?.lastAccount} />}
      </div>
    </div>
  );
};

export default Dashboard;