import alert_logo from "@/assets/logo.png"
import Tabs from '@/pages/poll-watcher/components/Tabs'
import ElectionDay from "@/pages/poll-watcher/pages/ElectionDay";
import MyAccount from "@/pages/poll-watcher/pages/MyAccount";
import Reports from "@/pages/poll-watcher/pages/Reports";
import { useState } from 'react';

const tabs = ['Election Day', 'Reports', 'My Account', 'Sign Out'];

const PollWatcherLayout = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className='w-full h-full'>
      <header className='flex p-2 border-b-2 border-gray-200'>
        <div className='w-12 md:w-24'>
          <img src={alert_logo} alt="Tambuli Alert Logo" />
        </div>
        <div className='flex-grow flex justify-center items-center px-4'>
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={() => {
              console.log('User is logging out...');
            }}
          />

        </div>
      </header>

      <main>
        {
          activeTab === "Election Day" ? (
            <ElectionDay />
          ) : activeTab === "Reports" ? (
            <Reports />
          ) : <MyAccount />
        }
      </main>
    </div>
  )
}

export default PollWatcherLayout