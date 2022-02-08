import axios from "axios";

export const createGoods = (name, type, time, cost, descript, file) => {
    return async dispatch => {
        try{
            console.log(time)
            let formData = new FormData()
            formData.append('name', name)
            formData.append('type', type)
            formData.append('time', time)
            formData.append('cost', cost)
            formData.append('descript', descript)
            formData.append('file', file)
            const response = await axios.post("http://localhost:5000/api/goods", formData)
            alert(response.data.message)
        } catch(e){
            alert(e.response.data.message)
        }
        
    }
}

export const clearItem = (userId, file) => {
    return async dispatch => {
        try{
            const response = await axios.put(`http://localhost:5000/api/user/clear/?id=${userId}`, {file},
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })  
            alert(response.data.message)
        } catch(e){
            alert(e.response.data.message)
        }
    }
}

export const deleteGoods = (file) => {
    return async dispatch => {
        try{
            const response = await axios.delete(`http://localhost:5000/api/goods/?id=${file.id}`, 
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })  
            alert(response.data.message)
        } catch(e){
            alert(e.response.data.message)
        }
    }
}

export const buyGoods = (userId, itemId) => {
    return async dispatch => {
        try{
            const response = await axios.put(`http://localhost:5000/api/user/?id=${userId}`, {itemId},
            {   
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            alert(response.data.message)
        } catch(e){
            alert(e.response.data.message)
        }
        
    }
}

export const changeGoods = (id, name, type, time, cost, descript, file) => {
    return async dispatch => {
        try{
            let formData = new FormData()
            formData.append('id', id)
            formData.append('name', name)
            formData.append('type', type)
            formData.append('time', time)
            formData.append('cost', cost)
            formData.append('descript', descript)
            formData.append('file', file)
            const response = await axios.put("http://localhost:5000/api/goods/", formData)
            alert(response.data.message)
        } catch(e){
            alert(e.response.data.message)
        }
        
    }
}