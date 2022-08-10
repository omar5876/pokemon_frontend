import { CLEAN, FILTER_POKEMONS, FILTER_TYPES, GET_POKEMONS, GET_POKEMON_BY_ID, GET_POKEMON_BY_NAME, GET_TYPES, ORDER, ORDER_BY_ATTACK } from "./actions"

const initialState = {
    allPokemons : [],
    getPokemons : [],
    filterPokemons: [],
    getTypes : [],
    getPokemonByName : {},
    getPokemonById : {}
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case GET_POKEMONS:
            return {
                ...state,
                getPokemons: action.payload,
                allPokemons: action.payload
            }
        case GET_POKEMON_BY_NAME:
            return {
                ...state,
                getPokemonByName: action.payload
            }
        case GET_POKEMON_BY_ID:
            return {
                ...state,
                getPokemonById: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                getTypes: action.payload
            }
        case ORDER:
            let pokemons = state.getPokemons
            if(action.payload === 'asc') pokemons.sort((a, b) => {
                if(a.nombre.toLowerCase() > b.nombre.toLowerCase())return 1
                if(a.nombre.toLowerCase() < b.nombre.toLowerCase())return -1
                else return 0
            })
            else pokemons.sort((a, b) => {
                if(a.nombre > b.nombre)return -1
                if(a.nombre < b.nombre)return 1
                else return 0
            })
           // else pokemons.sort((a,b) => b.nombre - a.nombre)
            console.log(pokemons)
            return {
                ...state,
                getPokemons: pokemons
            }
        case ORDER_BY_ATTACK:
            console.log(action.payload)
            let pokemonAttack = state.getPokemons
            if(action.payload === 'ataqueAsc') pokemonAttack.sort((a, b) => {
                if(a.ataque > b.ataque)return 1
                if(a.ataque < b.ataque)return -1
                else return 0
            })
            else pokemonAttack.sort((a, b) => {
                if(a.ataque > b.ataque)return -1
                if(a.ataque < b.ataque)return 1
                else return 0
            })
           return{
            ...state,
            getPokemons: pokemonAttack
           }

        case FILTER_POKEMONS:
            console.log(action.payload)
            let filterPokemons = state.allPokemons
            let finalRender;
            if(action.payload === 'creados') finalRender = filterPokemons.filter(e => typeof e.id === 'string')
            else if(action.payload === 'api') finalRender = filterPokemons.filter(e => typeof e.id === 'number')
            else finalRender = filterPokemons
            console.log(finalRender)
            return {
                ...state,
                getPokemons: finalRender
            }
            case FILTER_TYPES:
                console.log(action.payload)
                let pokemonsFilter = state.allPokemons
                let filterByType = pokemonsFilter.filter(e => e.tipo.find(e => e === action.payload))
                console.log(filterByType)
                return {
                    ...state,
                    getPokemons: filterByType
                }
        case CLEAN:
            return {
                ...state,
                getPokemons: [],
                getPokemonByName: {},
                getPokemonById: {}
            }

        default:
            return state
    }
}

export default reducer