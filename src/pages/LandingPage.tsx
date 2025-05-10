import { NavLink } from 'react-router'
import TambuliLogo from '/logo.png'
const LandingPage = () => {
    return (
        <div className="">
            <div className=" bg-white w-full h-20 shadow-md ">
                <div className='flex justify-between items-center p-2 mx-5 md:mx-10 lg:mx-20 '>
                    <img src={TambuliLogo} className='w-16 h-16' alt="Tambuli Alert Logo" />
                    <NavLink to="login">
                        <button className='bg-[#2B2128] py-1 px-6 text-white shadow-md rounded-md'>Login</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default LandingPage