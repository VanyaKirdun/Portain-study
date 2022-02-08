const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'

const defaultState = {
    current: {},
    typeUser: null,
    isAuth: false
}

export default function userReducer(state = defaultState, action) {
    switch(action.type){
        case SET_USER:
            return {
                ...state,
                currentUsers: action.payload.user,
                typeUser: action.payload.userType,
                userId: action.payload.id,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUsers: {},
                typeUser: null,
                isAuth: false
            } 
        default:
            return state
    }

}

export const setUser = (user, userType) => ({type: SET_USER, payload: user, payType: userType})
export const logout = () => ({type: LOGOUT})