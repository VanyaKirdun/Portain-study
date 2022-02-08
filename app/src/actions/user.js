import axios from "axios";
import { setUser } from "../reducers/userReducer";

export const registration = (email, password) => {
    return async dispatch => {
        try{
            const response = await axios.post("http://localhost:5000/api/auth/registration", {
                email,
                password
            })
            alert(response.data.message)
        } catch(e){
            alert(e.response.data.message)
        }
        
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try{
            const response = await axios.post("http://localhost:5000/api/user/auth/login", {
                email,
                password
            })
            dispatch(setUser(response.data.user, response.data.userType))
            localStorage.setItem('token', response.data.token)
        } catch(e){
            alert(e.response.data.message)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try{
            const response = await axios.get("http://localhost:5000/api/user/auth/auth", 
                {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user, response.data.user.userType))
            localStorage.setItem('token', response.data.token)
        } catch(e){
            localStorage.removeItem('token')
        }
    }
}
