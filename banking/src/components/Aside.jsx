import './Aside.css'
import AstroLogo from '../assets/astro-bank-aside.png'
import DashIcon from '../assets/dashboard-aside.png'
import LogoutIcon from '../assets/logout.png'

const Aside = () => {
    return (
        <aside>
            <main className='aside-container'>
                <div className='aside-top-container'>
                    <div className='aside-logo'>
                        <img src={AstroLogo} alt="Astro Bank" className='logo' />
                        <h3>AstroBank</h3>
                    </div>
                    <div className='aside-options'>
                        <div className='aside-dashboard'>
                            <img src={DashIcon} alt="Dashboard" className='home'/>
                            <p>Dashboard</p>
                        </div>
                    </div>
                </div>
                <div className='aside-bottom-container'>
                    <div className='aside-logout'>
                        <img src={LogoutIcon} alt="Logout" className='logout' />
                        <p>Logout</p>
                    </div>
                </div>
            </main>
        </aside>
    )
}

export default Aside