import React from 'react';
import {clearItem} from "../../actions/goods.js";
import {useDispatch} from "react-redux";

const Card = (data) => {
    const dispatch = useDispatch()
    return(
        <div className='card__container'>
            <div className='card' onClick={()=>data.activeItem(data)}>
                <div className='picture'>
                    <img src={`https://res.cloudinary.com/storageimage/image/upload/v1645386179/${data.img}`} alt={data.name}/>
                </div>
                <p className='card__text'>{data.name}</p>
                <p className='card__text'>{data.cost}$</p>
            </div>
            {data.userId && <p className='card__text'>В корзине: {data.number}</p>}
            {data.userId && <button onClick={()=>{dispatch(clearItem(data.userId, data)); window.location.reload(true)}}>Убрать из корзины</button>}
        </div>
    )
}

export default Card;