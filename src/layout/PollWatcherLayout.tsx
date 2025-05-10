import alert_logo from "@/assets/logo.png"
import Tabs from '@/pages/poll-watcher/components/Tabs'
import ElectionDay from "@/pages/poll-watcher/pages/ElectionDay";
import MyAccount from "@/pages/poll-watcher/pages/MyAccount";
import Reports from "@/pages/admin/Reports";
import { useTokenStore } from "@/store/useTokenStore";
import useUserStore from "@/store/useUserStore";
import { useState } from 'react';
import { Outlet, useLocation } from "react-router";

const tabs = ['Election Day', 'Reports', 'My Account', 'Sign Out'];

const PollWatcherLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const clearToken = useTokenStore()?.resetToken
  const clearUser = useUserStore()?.clearUser
  const location = useLocation();

  const isRootPollWatcher = location.pathname === "/app/poll-watcher";
  const isNestedRoute = location.pathname !== "/app/poll-watcher";

  const logout = () => {
    clearToken()
    clearUser()
  }

  return (
    <div className='w-full h-full'>
      <header className='flex p-2 border-b-2 border-gray-200'>
        <div className='w-12 md:w-20'>
          <img src={alert_logo} alt="Tambuli Alert Logo" />
        </div>
        <div className='flex-grow flex justify-center items-center px-4'>
          <Tabs
            activeTab={activeTab}
            setActiveTab={isNestedRoute ? () => { } : setActiveTab}
            onLogout={logout}
          />
        </div>
      </header>

      <main>
        {isRootPollWatcher ? (
          activeTab === "Election Day" ? (
            <ElectionDay />
          ) : activeTab === "Reports" ? (
            <Reports />
          ) : (
            <MyAccount />
          )
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default PollWatcherLayout