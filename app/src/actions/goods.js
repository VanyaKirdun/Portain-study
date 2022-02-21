import axios from "axios";
import { API_URL } from "../config";

export const createGoods = (name, type, time, cost, descript, file) => {
    return async dispatch => {
        try{
            let formData = new FormData()
            let imageData = new FormData()            
            formData.append('name', name)
            formData.append('type', type)
            formData.append('time', time)
            formData.append('cost', cost)
            formData.append('descript', descript)
            
            imageData.append('file', file)
            imageData.append('upload_preset', 'g1nygioy')
            
            await axios.post(`https://api.cloudinary.com/v1_1/storageimage/image/upload`, imageData).then(async (response) =>{
                formData.append('img', response.data.public_id)
                let responses = await axios.post(`${API_URL}api/goods`, formData)
                alert(responses.data.message)
                window.location.reload(true)
            })

        } catch(e){
            alert(e.response.data.message)
        }
        
    }
}

export const clearItem = (userId, file) => {
    return async dispatch => {
        try{
            const response = await axios.put(`${API_URL}api/user/clear/?id=${userId}`, {file},
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
            const response = await axios.delete(`${API_URL}api/goods/?id=${file.id}`, 
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
            const response = await axios.put(`${API_URL}api/user/?id=${userId}`, {itemId},
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

export const changeGoods = (id, name, type, time, cost, descript, file, oldFile) => {
    return async dispatch => {
        try{
            let formData = new FormData()
            formData.append('id', id)
            formData.append('name', name)
            formData.append('type', type)
            formData.append('time', time)
            formData.append('cost', cost)
            formData.append('descript', descript)
            formData.append('oldImg', oldFile)
            
            if(file){
                let imageData = new FormData()     
                imageData.append('file', file)
                imageData.append('upload_preset', 'g1nygioy')

                await axios.post(`https://api.cloudinary.com/v1_1/storageimage/image/upload`, imageData).then(async (response) =>{
                    formData.append('img', response.data.public_id)
                    const responses = await axios.put(`${API_URL}api/goods/`, formData)
                    await alert(responses.data.message)
                    window.location.reload(true)
                })
            } else {
                const responses = await axios.put(`${API_URL}api/goods/`, formData)
                await alert(responses.data.message)
                window.location.reload(true)
            }
        } catch(e){
            alert(e.response.data.message)
        }
        
    }
}