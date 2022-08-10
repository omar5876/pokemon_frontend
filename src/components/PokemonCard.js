import { Link } from 'react-router-dom'
import s from '../assets/PokemonCard.module.css'
const PokemonCard = ({ id, nombre, img, tipos }) => {
    return (
        <div className={s.pokemonCard}>
            <Link className={s.pokemonCardItems} to={`/${id}`}>
                <h2>{nombre}</h2>
                <div className={s.pokemonCardImgContainer}>

                    <img  src={img}></img>
                </div>
                <div className={s.pokemonCardTypesContainer}>{tipos?.map((e, key) => <div key={key}>{e}</div>)}</div>
            </Link>
        </div>
    )
}

export default PokemonCard