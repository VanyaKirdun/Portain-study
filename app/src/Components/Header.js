import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import call from '../img/eva_phone-outline.png';
import PopUp from './PopUp';
import Login from './authorization/Login'
import Reqistration from './authorization/Registration';
import Li from './Menu/Li';


export default withRouter(class Header extends Component {
    state={
        scroll: false,
        modalActive: false,
        authType: '',
        isAuth: {}
    }

    auth(){
        if(this.state.authType){
            return(<Reqistration/>)
        } else {
            return(<Login setModalActive={this.setModalActive}/>)
        }
    }
    
    burgerMenu(){
        document.body.classList.toggle('_lock');
        document.querySelector('.menu__icon').classList.toggle('_active');
        document.querySelector('.menu__body').classList.toggle('_active');
    }
        
    handleLinkClick =()=> {
        let element = document.getElementById('hook');
        if(element === null){
            this.setState({scroll: true});
            this.props.history.push("/")
        } else{
            element.scrollIntoView();
        }
    };

    setModalActive = (active, type) => {
        this.setState({modalActive: active});
        this.setState({authType: type});
    }

    componentDidUpdate(prevProps) {
        if (this.state.scroll) {
            let element = document.getElementById('hook');
            element.scrollIntoView();
            this.setState({scroll: false});
        }
    }

    render(){
        return(
            <header className="header">
                <div className='header__info'>
                    <div className="header__container">
                        <div className='header__work'>
                            <a className='header__data' href='tel:+8(812)123-45-67'><img src={call} alt={call}/></a>
                            <a className='header__data' href='tel:+8(812)123-45-67'>8(812) 123-45-67</a>
                            <span className='header__data indent'>Работаем 7 дней в неделю</span>
                            <span className='header__data'>9:00 - 18:00</span>
                        </div>
                    </div>
                </div>
                <div className="header__block">
                    <div className="header__container">
                        <a href='/' className='header__logo'>PORTEN</a>
                        <div className='header__menu menu'>
                            <div className='menu__icon' onClick={this.burgerMenu}>
                                <span></span>
                            </div>
                            <nav className='menu__body'>
                                <ul className='menu__list'>
                                    <Li handleLinkClick={this.handleLinkClick} setModalActive={this.setModalActive}/>
                                </ul>
                            </nav>  
                            <PopUp active={this.state.modalActive} setActive={this.setModalActive}>
                                {this.auth()}
                            </PopUp>
                        </div> 
                    </div>
                </div>
            </header>
        )
    }
})