import { Outlet } from 'react-router'
import alert_logo from "@/assets/logo.png"
import Tabs from '@/pages/poll-watcher/components/Tabs'

const PollWatcherLayout = () => {
  return (
    <div className='w-full h-full'>
      <header className='flex p-2 border-b-2 border-gray-200'>
        <div className='w-12 md:w-24'>
          <img src={alert_logo} alt="Tambuli Alert Logo" />
        </div>
        <div className='flex-grow flex justify-center items-center px-4'>
          <Tabs />
        </div>
      </header>
      <Outlet />
    </div>
  )
}

export default PollWatcherLayout