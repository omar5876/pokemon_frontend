import s from '../assets/Home.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clean, filterPokemons, filterTypes, getPokemonByName, getPokemons, getTypes, order, orderByAttack } from '../redux/actions'

import PokemonCard from './PokemonCard'
import Paginado from './Paginado'

const Home = () => {
    let [input, setInput] = useState('')
    let [orden, setOrden] = useState('')
    let [orderAttack, setOrderAttack] = useState('')

    const allPokemons = useSelector(state => state.getPokemons)
    const pokemon = useSelector(state => state.getPokemonByName)
    let types = useSelector(state => state.getTypes)
    const [paginaActual, setPaginaActual] = useState(1)
    const [pokemonesPorPagina, setPokemonesPorPagina] = useState(12)
    const indiceUltimoPokemon = paginaActual * pokemonesPorPagina;
    const indicePrimerPokemon = indiceUltimoPokemon - pokemonesPorPagina
    const pokemonesPagina = allPokemons.slice(indicePrimerPokemon, indiceUltimoPokemon)

    const dispatch = useDispatch()

    const handleChangeInput = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const handleChangeOrder = (e) => {
        dispatch(order(e.target.value))
        setPaginaActual(1)
        setOrden(e.target.value)
    }

    const handleChangePokemons = (e) => {
        dispatch(filterPokemons(e.target.value))
        setPaginaActual(1)
    }
    const handleChangeType = (e) => {
        dispatch(filterTypes(e.target.value))
        setPaginaActual(1)
    }

    const handleChangeAttack = (e) => {
        console.log(e.target.value)
        dispatch(orderByAttack(e.target.value))
        setOrderAttack(e.target.value)
        setPaginaActual(1)
    }
    const searchName = () => {
        dispatch(getPokemonByName(input))
        setInput('')
    }
    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
        return dispatch(clean())
    }, [dispatch])
    return (
        <div>
            <div className={s.searchContainer}>
                <div>

                    <input type={'text'} value={input} onChange={(e) => handleChangeInput(e)} />
                    <button onClick={searchName}>Buscar</button>
                </div>
                <select onChange={e => handleChangeOrder(e)}>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>
                <select onChange={(e) => handleChangePokemons(e)}>
                    <option value='todos'>Todos</option>
                    <option value='creados'>Creados</option>
                    <option value='api'>Api</option>
                </select>
                <select onChange={(e) => handleChangeType(e)}>
                    {types.map(e => {
                        return (
                            <option key={e.id} value={e.nombre}>{e.nombre}</option>
                        )
                    })}
                </select>
                <select onChange={(e) => handleChangeAttack(e)}>
                    <option value={'ataqueAsc'}>Ataque ascendente</option>
                    <option value={'ataqueDesc'}>Ataque descendente</option>
                </select>
            </div>
            {pokemon.nombre == undefined ? (
                <div>
                    <Paginado
                        pokemonesPorPagina={pokemonesPorPagina}
                        numeroTotalPokemones={allPokemons.length}
                        setPaginaActual={setPaginaActual}
                        paginaActual={paginaActual}
                    />
                    <div className={s.pokemonsContainer}>
                        {pokemonesPagina && pokemonesPagina.map(e => {
                            return (
                                <PokemonCard
                                    key={e.id}
                                    id={e.id}
                                    nombre={e.nombre}
                                    img={e.img}
                                    tipos={e.tipo}
                                />
                            )
                        })}

                    </div>
                    <Paginado
                        pokemonesPorPagina={pokemonesPorPagina}
                        numeroTotalPokemones={allPokemons.length}
                        setPaginaActual={setPaginaActual}
                        paginaActual={paginaActual}
                    />
                </div>
            )
                : (<div className={s.searchByNamePokemon}><PokemonCard id={pokemon.id} nombre={pokemon.nombre} img={pokemon.img} tipos={pokemon.tipo} /></div>)
            }

        </div>
    )
}


export default Home