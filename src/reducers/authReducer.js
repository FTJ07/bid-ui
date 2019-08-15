import {AUTH_USER , UNAUTH_USER, AUTH_ERROR} from '../actions/types';

const initializeState = ()=>{
    const token = localStorage.getItem('token');
    if(token) return {authenticated:true,token:token}
    else return {authenticated:false};
}

const authReducer = (state=initializeState(), action)=>{

    switch (action.type) {
        case AUTH_USER:
                return {...state,authenticated:true,token: action.payload}

        case UNAUTH_USER:
            return {...state, authenticated: false }

        case AUTH_ERROR:
                return { ...state,error: action.payload }

        default:
            break;
    }
    return state;
}

export default authReducer