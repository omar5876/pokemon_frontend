import s from '../assets/pokemonDetails.module.css'
import axios from 'axios'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { clean, getPokemonById } from "../redux/actions"
import {Link} from 'react-router-dom'

const PokemonDetails = () => {
    let { id } = useParams()
    let history = useHistory()
    let pokemon = useSelector(state => state.getPokemonById)
    let dispatch = useDispatch()
    console.log(pokemon)

    const deletePokemonDB = (pokemonID) =>{
        console.log(pokemonID)
        axios.delete(`http://localhost:3001/pokemon/${pokemonID}`)
        .then(res => {
            alert('Pokemon Eliminado')
            history.push('/Home')
        })
        .catch(error => console.log(error))


    }
    useEffect(() => {
        dispatch(getPokemonById(id))
        return dispatch(clean())
    }, [dispatch, id])
    return (
        <div className={s.containerDetails}>

        <div className={s.cardDetailContainer}>
            {typeof pokemon.id === 'string' && (<button className={s.cardDetailsDeleteButton}type='button' onClick={() => deletePokemonDB(pokemon.id)}>Eliminar</button>)}
            {typeof pokemon.id === 'string' && (<Link to={`/update/${id}`}><button className={s.cardDetailsUpdateButton}type='button'>Actualizar</button></Link>)}
            <div className={s.cardDetailTitleContainer}>
                <h3>Nombre: {pokemon.nombre}</h3>
            </div>
            <div className={s.imgDetailContainer}>
                <img src={pokemon.img}></img>
            </div>
            <div >
                <h3>Tipos:</h3>
                <ul>{pokemon.tipo?.map((e, k) => <li key={k}>{e}</li>)}</ul>
            </div>
            <h3>ID: {pokemon.id}</h3>
            <div>
                <h3>Estadisticas:</h3>
                <ul>
                    <li>Vida: {pokemon.vida}</li>
                    <li>Ataque: {pokemon.ataque}</li>
                    <li>Defensa: {pokemon.defensa}</li>
                    <li>Velocidad: {pokemon.velocidad}</li>
                </ul>
                <div>
                    <h3>Altura: {pokemon.altura}</h3>
                    <h3>Peso: {pokemon.peso}</h3>
                </div>
            </div>

        </div>
        </div>

    )

}

export default PokemonDetails