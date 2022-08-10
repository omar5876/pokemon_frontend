import s from '../assets/Navbar.module.css'
import {Link} from 'react-router-dom'
const Navbar = () => {
    return (
        <div className={s.navbar}>
            <div className={s.navbarItem}>
                <Link className={s.navbarItemText} to={'/Home'}>
                <h2>Home</h2>
                </Link>
            </div>
            <div className={s.navbarItem}>
                <Link className={s.navbarItemText} to={'/Create'}>
                <h2>Crear Pokemon</h2>
                </Link>
            </div>
        </div>
    )
}

export default Navbar