import { Outlet } from 'react-router'
import alert_logo from "@/assets/logo.png"

const PollWatcherLayout = () => {
  return (
    <div className='w-full h-full'>
      <header>
        <div>
          <img src={alert_logo} alt="Tambuli Alert Logo" />
        </div>
        
      </header>
      <Outlet />
    </div>
  )
}

export default PollWatcherLayout