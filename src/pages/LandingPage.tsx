import { NavLink } from 'react-router'
import TambuliLogo from '/logo.png'
import Kalmado from '../assets/Kalmado.jpg'

const LandingPage = () => {
    return (
        <div className="">
            {/* HEADER */}
            <div className="bg-white w-full h-20 shadow-md z-50 fixed top-0 left-0 border-gray-300">
                <div className='flex justify-between items-center p-2 mx-5 md:mx-10 lg:mx-20 '>
                    <img src={TambuliLogo} className='w-16 h-16' alt="Tambuli Alert Logo" />
                    <NavLink to="login">
                        <button className='bg-[#2B2128] py-1 px-6 text-white shadow-md rounded-md text-sm text-[16px]'>Login</button>
                    </NavLink>
                </div>
            </div>

            {/* Content */}
            <div className='flex flex-col pt-20'>
                <div className=" w-full">
                    <img src={Kalmado} alt="Kalmado" className="w-full object-contain obj bottom-0 right-0" />
                </div>
            </div>
            
        </div>
    )
}


export default LandingPage