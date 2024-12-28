import { useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import SignUp from './pages/sign-up.jsx';
import useStore from './store';
import { setAuthToken } from './libs/apiCall';
import { Toaster } from 'sonner';

const RootLayout = () => {
  const { user } = useStore((state) => state);

  setAuthToken(user?.token || '');

  return !user ? (
    <Navigate to="sign-in" replace={true} />
  ) : (
    <>
      <Navbar />
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
          </Route>
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </div>

      <Toaster richColors position="top-center" />
    </main>
  );
}

export default App;
