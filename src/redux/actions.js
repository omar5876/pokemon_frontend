import axios from 'axios'
export const GET_POKEMONS = 'getPokemons'
export const GET_POKEMON_BY_NAME = 'getPokemonByName'
export const GET_POKEMON_BY_ID = 'getPokemonById'
export const GET_TYPES = 'getTypes'
export const ORDER = 'order'
export const FILTER_TYPES = 'filterTypes'
export const FILTER_POKEMONS = 'filterPokemons'
export const CLEAN = 'clean'
export const ORDER_BY_ATTACK = 'orderByAttack'


export const getPokemons = () => {
    return async (dispatch) => {
        let pokemons = (await axios.get('https://pokemon-api-omar.herokuapp.com/pokemon')).data
        return dispatch({
            type: GET_POKEMONS,
            payload: pokemons
        })
    }
}

export const getPokemonByName = (name) => {
    return async (dispatch) => {
        let pokemon = (await axios.get(`https://pokemon-api-omar.herokuapp.com/pokemon/nombre?name=${name}`)).data
        return dispatch({
            type: GET_POKEMON_BY_NAME,
            payload: pokemon
        })
    }
}

export const getPokemonById = (id) => {
    return async (dispatch) => {
        let pokemon = (await axios.get(`https://pokemon-api-omar.herokuapp.com/pokemon/${id}`)).data
        return dispatch({
            type: GET_POKEMON_BY_ID,
            payload : pokemon
        })
    }
} 

export const getTypes = () => {
    return async (dispatch) => {
        let types = (await axios.get('https://pokemon-api-omar.herokuapp.com/tipo')).data
        return dispatch({
            type: GET_TYPES,
            payload : types
        })
    }
}

export const order = (payload) => {
    return{
        type: ORDER,
        payload
    }
}

export const filterTypes = (payload) => {
    return {
        type: FILTER_TYPES,
        payload
    }
}

export const filterPokemons = (payload) => {
    return {
        type: FILTER_POKEMONS,
        payload
    }
}

export const orderByAttack = (payload) => {
    return {
        type: ORDER_BY_ATTACK,
        payload
    }
}

export const clean = () => {
    return {
        type: CLEAN
    }
}



