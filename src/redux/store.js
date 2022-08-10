import {applyMiddleware, createStore} from 'redux'
import reducer from './reducer'
import reduxThunk from 'redux-thunk'


let store = createStore(reducer, applyMiddleware(reduxThunk))

export default store