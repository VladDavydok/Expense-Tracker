import { useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import SignUp from './pages/auth/sign-up.jsx';
import SignIn from './pages/auth/sign-in.jsx';
import Settings from './pages/settings.jsx';
import AccountPage from './pages/account-page.jsx';
import useStore from './store';
import { setAuthToken } from './libs/apiCall';
import { Toaster } from 'sonner';
import Transactions from './pages/transactions.jsx';
import Dashboard from './pages/dashbaord.jsx';

const RootLayout = () => {
  const { user } = useStore((state) => state);

  setAuthToken(user?.token || '');

  return !user ? (
    <Navigate to="sign-in" replace={true} />
  ) : (
    <>
      <div className="min-h-[cal(h-screen-100px)]">
        <Outlet />
      </div>
    </>
  );
};

function App() {
  return (
    <main>
      <div className="w-full min-h-screen px-6 bg-gray-100 md:px-20 dark:bg-slate-900">
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/accounts" element={<AccountPage />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>

      <Toaster richColors position="top-center" />
    </main>
  );
}

export default App;
