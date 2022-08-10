import s from '../assets/updatePokemon.module.css'
import axios from 'axios'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { clean, getPokemonById, getTypes } from "../redux/actions"
const validate = (input) => {
    let error = {}
    if (!input.nombre) error.nombre = "Nombre es requerido"
    if (input.vida <= 0) error.vida = "Debe ser mayor a 0"
    if (input.ataque <= 0) error.ataque = "Debe ser mayor a 0"
    if (input.defensa <= 0) error.defensa = "Debe ser mayor a 0"
    if (input.velocidad <= 0) error.velocidad = "Debe ser mayor a 0"
    if (input.altura <= 0) error.altura = "Debe ser mayor a 0"
    if (input.peso <= 0) error.peso = "Debe ser mayor a 0"
    return error
}
const UpdatePokemon = () => {
    let { id } = useParams()
    let history = useHistory()
    let pokemon = useSelector(state => state.getPokemonById)
    let tiposApi = useSelector(state => state.getTypes)
    let dispatch = useDispatch()
    console.log(pokemon)



    const [input, setInput] = useState({
        nombre: pokemon.nombre,
        vida: pokemon.vida,
        ataque: pokemon.ataque,
        defensa: pokemon.defensa,
        velocidad: pokemon.velocidad,
        altura: pokemon.altura,
        peso: pokemon.peso,
        img: pokemon.img,
        tipos: pokemon.tipo
    })
    const [error, setError] = useState({})

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setError(validate(
            {
                ...input,
                [e.target.name]: e.target.value
            }

        ))

    }

    const handleSelect = (e) => {
        if (!input.tipos.includes(e.target.value)) {

            setInput(
                {
                    ...input,
                    tipos: [...input.tipos, e.target.value]
                }
            )
        }
    }

    const deleteType = (nombre) => {
        setInput({
            ...input,
            tipos: input.tipos.filter(e => e !== nombre)
        })
    }



    const updatePokemonDB = (pokemonID) => {
        axios.put(`http://localhost:3001/pokemon/update/${pokemonID}`, input)
            .then(res => alert('Actualizado'))
            .catch(error => alert('No actualizado'))


    }
    useEffect(() => {
        dispatch(getPokemonById(id))
        dispatch(getTypes())
        return dispatch(clean())
    }, [dispatch, id])
    return (
        <div className={s.updatePokemonContainer}>
            <div className={s.updateFormContainer}>

                <div>
                    <label htmlFor='nombre'>Nombre:</label>
                    <input name='nombre' id='nombre' type={'text'} required value={input.nombre} onChange={handleChange} />
                    {error.nombre && (<span>{error.nombre}</span>)}
                </div>
                <div>
                    <label htmlFor='vida'>Vida:</label>
                    <input name='vida' id='vida' type={'number'} required min='1' value={input.vida} onChange={handleChange} />
                    {error.vida && (<span>{error.vida}</span>)}
                </div>
                <div>
                    <label htmlFor='ataque'>Ataque:</label>
                    <input name='ataque' id='ataque' type={'number'} required min='1' value={input.ataque} onChange={handleChange} />
                    {error.ataque && (<span>{error.ataque}</span>)}
                </div>
                <div>
                    <label htmlFor='defensa'>Defensa:</label>
                    <input name='defensa' id='defensa' type={'number'} required min='1' value={input.defensa} onChange={handleChange} />
                    {error.defensa && (<span>{error.defensa}</span>)}
                </div>
                <div>
                    <label htmlFor='velocidad'>Velocidad:</label>
                    <input name='velocidad' id='velocidad' type={'number'} required min='1' value={input.velocidad} onChange={handleChange} />
                    {error.velocidad && (<span>{error.velocidad}</span>)}
                </div>
                <div>
                    <label htmlFor='altura'>Altura:</label>
                    <input name='altura' id='altura' type={'number'} required min='1' value={input.altura} onChange={handleChange} />
                    {error.altura && (<span>{error.altura}</span>)}
                </div>
                <div>
                    <label htmlFor='peso'>Peso:</label>
                    <input name='peso' id='peso' type={'number'} required min='1' value={input.peso} onChange={handleChange} />
                    {error.peso && (<span>{error.peso}</span>)}
                </div>
                <div>
                    <label htmlFor='img'>Imagen:</label>
                    <input name='img' id='img' type={'text'} required value={input.img} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="tipos">Tipos:</label>
                    <select id="tipos" required onChange={handleSelect}>
                        {tiposApi && tiposApi.map(e => {
                            return (
                                <option key={e.id} value={e.nombre} >{e.nombre}</option>
                            )
                        })}
                    </select>
                    {!input.tipos.length && <span>Debe eligir al menos un Tipo</span>}
                    <div>Tipos elegidos:{input.tipos.length && input.tipos.map((e, k) => {
                        return <span className={s.typesUpdate} key={k}>{e} <button onClick={() => deleteType(e)}>X</button></span>
                    })}</div>
                </div>
                <button className={s.updateButton} disabled={!Object.keys(error).length ? false : true} onClick={() => updatePokemonDB(id)} >Actualizar</button>
            </div>

        </div>

    )

}

export default UpdatePokemon