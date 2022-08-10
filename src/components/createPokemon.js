import s from '../assets/createPokemon.module.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTypes } from "../redux/actions"
import axios from 'axios'
import { useHistory } from "react-router-dom"


const validate = (input) =>{
    let error = {}
    if(!input.nombre)error.nombre = "Nombre es requerido"
    if(input.vida <= 0) error.vida ="Debe ser mayor a 0"
    if(input.ataque <= 0) error.ataque ="Debe ser mayor a 0"
    if(input.defensa <= 0) error.defensa ="Debe ser mayor a 0"
    if(input.velocidad <= 0) error.velocidad ="Debe ser mayor a 0"
    if(input.altura <= 0) error.altura ="Debe ser mayor a 0"
    if(input.peso <= 0) error.peso ="Debe ser mayor a 0"
    return error
}
const CreatePokemon = () => {
    let tiposApi = useSelector(state => state.getTypes)
    let history = useHistory()

    let dispatch = useDispatch()


    const [input, setInput] = useState({
        nombre: '',
        vida: 0,
        ataque: 0,
        defensa: 0,
        velocidad: 0,
        altura: 0,
        peso: 0,
        img: '',
        tipos: []
    })
    const [error, setError] = useState({})

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        
        setError(validate(
           { ...input,
            [e.target.name]: e.target.value}

        ))

    }

    const handleSelect = (e) => {
        if(!input.tipos.includes(e.target.value)){

            setInput(
                {...input,
                tipos: [...input.tipos,e.target.value]
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

    const handleSubmit = () => {
        if(input.nombre && input.tipos.length){

            console.log(input)
            axios.post('http://localhost:3001/pokemon', input)
            .then(res => {
                setInput({
                    nombre: '',
                    vida: 0,
                    ataque: 0,
                    defensa: 0,
                    velocidad: 0,
                    altura: 0,
                    peso: 0,
                    img: '',
                    tipos: []
                })
                alert('Pokemon Creado')
                history.push('/Home')
            })
            .catch(error => console.log(error))
        }
        else {
            alert('No se pudo crear pokemon')
            history.push('/Home')
        }

    }

    useEffect(() => {
        dispatch(getTypes())

    }, [dispatch ])
    return (
        <div className={s.createContainer}>
            <div className={s.formContainer}>

                <div>
                    <label htmlFor='nombre'>Nombre:</label>
                    <input name='nombre' id='nombre' type={'text'} required value={input.nombre} onChange={handleChange} />
                    {error.nombre&&(<span>{error.nombre}</span>)}
                </div>
                <div>
                    <label htmlFor='vida'>Vida:</label>
                    <input name='vida' id='vida' type={'number'}required min='1' value={input.vida} onChange={handleChange}/>
                    {error.vida&&(<span>{error.vida}</span>)}
                </div>
                <div>
                    <label htmlFor='ataque'>Ataque:</label>
                    <input name='ataque' id='ataque' type={'number'}required min='1' value={input.ataque} onChange={handleChange} />
                    {error.ataque&&(<span>{error.ataque}</span>)}
                </div>
                <div>
                    <label htmlFor='defensa'>Defensa:</label>
                    <input name='defensa' id='defensa' type={'number'}required min='1'value={input.defensa} onChange={handleChange} />
                    {error.defensa&&(<span>{error.defensa}</span>)}
                </div>
                <div>
                    <label htmlFor='velocidad'>Velocidad:</label>
                    <input name='velocidad' id='velocidad' type={'number'} required min='1' value={input.velocidad} onChange={handleChange}/>
                    {error.velocidad&&(<span>{error.velocidad}</span>)}
                </div>
                <div>
                    <label htmlFor='altura'>Altura:</label>
                    <input name='altura' id='altura' type={'number'} required min='1' value={input.altura}  onChange={handleChange}/>
                    {error.altura&&(<span>{error.altura}</span>)}
                </div>
                <div>
                    <label htmlFor='peso'>Peso:</label>
                    <input name='peso' id='peso' type={'number'} required min='1' value={input.peso} onChange={handleChange}/>
                    {error.peso&&(<span>{error.peso}</span>)}
                </div>
                <div>
                    <label htmlFor='img'>Imagen:</label>
                    <input name='img' id='img' type={'text'} required value={input.imagen} onChange={handleChange}/>
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
                    {!input.tipos.length&&<span>Debe eligir al menos un Tipo</span>}
                    <div>Tipos elegidos:{input.tipos.length&&input.tipos.map((e, k) => {
                        return <span className={s.types} key={k}>{e} <button onClick={() => deleteType(e)}>X</button></span>
                    })}</div>
                    <button className={s.mainButton}disabled={!Object.keys(error).length?false:true} onClick={handleSubmit} >Crear</button>
                </div>
        </div>
            </div>
    )
}

export default CreatePokemon