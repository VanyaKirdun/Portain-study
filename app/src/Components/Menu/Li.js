import React from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { logout } from '../../reducers/userReducer';
import { useSelector } from 'react-redux';

const Li = (props) => {
    const dispatch = useDispatch()    
    const isAuth = useSelector(state => state.user.isAuth)
    const data = useSelector(state => state.user)

    function hide(){
        if( window.innerWidth <= 800 ){
            props.popActive()
        }
    }
    function hideAndScroll(){
        props.handleLinkClick()
        if( window.innerWidth <= 800 ){
            props.popActive()
        }
        
    }
    return (
        <li>
            <Link onClick={hide} to='/' className='menu__link'>ГЛАВНАЯ</Link>
            <Link onClick={hide} to='/catalog' className='menu__link'>КАТАЛОГ</Link>
            <span onClick={hideAndScroll} className='menu__link'>ПОСТУПЛЕНИЕ</span>
            {!isAuth && <span className='menu__link' onClick={()=>{props.setModalActive(true, true); hide()}}>РЕГИСТРАЦИЯ</span>}
            {!isAuth && <span className='menu__link' onClick={()=>{props.setModalActive(true, false); hide()}}>АВТОРИЗАЦИЯ</span>}
            {isAuth && data.typeUser==='admin' && <a href='/admin' className='menu__link'>АДМИН</a>}
            {isAuth && data.typeUser==='user' && <a href='/profile' className='menu__link'>ПРОФИЛЬ</a>}
            {isAuth && <span className='menu__link' onClick={()=>dispatch(logout())}>ВЫЙТИ</span>}
        </li>
    )
}

export default Li