import s from '../assets/initialPage.module.css'
import {Link} from 'react-router-dom'


const InitialPage = () =>{
    return (
        <div className={s.initialPageContainer}>

            <div>

                <button className={s.initialPageButton}>
            <Link className={s.initialPageButtonText} to={'/Home'}>
                  <div>Ingresar</div> 

            </Link>
                </button>
            </div>
        </div>
    )
}

export default InitialPage