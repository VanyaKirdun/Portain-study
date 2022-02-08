import React from 'react';
import {useDispatch} from "react-redux";
import {buyGoods} from "../../actions/goods.js";
import { useSelector } from 'react-redux';

const Buy = (props) => {
    const userId = useSelector(state => state.user.userId)
    const typeUser = useSelector(state => state.user.typeUser)
    const dispatch = useDispatch()

    return (
            <form >
                <button onClick={() => {
                    if(typeUser!=='admin'){
                        dispatch(buyGoods(userId, props.id))
                    } else{alert('Вы админ!')}
                }}>КУПИТЬ</button>
            </form>
    )
}

export default Buy