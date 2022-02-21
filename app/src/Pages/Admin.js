import React, { Component } from 'react';
import CardList from '../Components/Items/CardList'
import Create from '../Components/Goods/Create';
import Good from '../Components/Items/Good'
import { Redirect } from 'react-router-dom';
import Searcher from '../Components/Searcher';
import { API_URL } from '../config';

export default class Admin extends Component {
    state = {
        apiUrl: `${API_URL}api/goods`,
        allCards: [],
        searchStatus: false,
        status: false,
        activeItem: [],
        redirect: false
    }

    loadFile(){
        fetch(this.state.apiUrl)
        .then((response) => response.json())
        .then((data) => {
            let mass = []
            for(let item in data['goods']) {
                mass.push(data['goods'][item])
            }
            this.setState({searchStatus: false})
            this.setState({allCards: mass.reverse()})
        });
    }

    componentDidMount() {
        if(this.props.typeUser==='admin'){
            this.loadFile()
        } if(localStorage.getItem('token') === null && this.props.typeUser===null) {
            this.setState({redirect: true})
        }
    }

    componentDidUpdate(){
        if(this.props.typeUser==='admin'){
            if(this.state.searchStatus){
                this.loadFile()
            }
        } if(localStorage.getItem('token') === null && this.props.typeUser===null) {
            this.setState({redirect: true})
        }
    }

    searchedGoods=(data, filter='all')=>{
        if(data.trim().length!==0){
            this.setState({apiUrl: `${API_URL}api/goods/name/${data.trim()}/${filter}`})
        } else if(filter!=='all'){
            this.setState({apiUrl: `${API_URL}api/goods/filter/${filter}`})
        } else {
            this.setState({apiUrl: `${API_URL}api/goods`})
        }
        this.setState({searchStatus: true})
    }
    
    setActiveItem=(data)=>{
      this.setState({activeItem: data})
      this.setState({status: true})
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
    }

    render(){
        return (
            <div className='admin'>
                {this.renderRedirect()}
                {!this.state.status && <h1>Создание товара</h1>}
                {!this.state.status && <Create/>}
                {!this.state.status && <Searcher searchedGoods={this.searchedGoods}/>}
                {!this.state.status && <h1>Редактирование товаров</h1>}
                {!this.state.status && <CardList data={this.state.allCards} activeItem={this.setActiveItem}/>}
                {(this.state.status && Object.keys(this.state.activeItem).length !== 0) && <Good data={this.state.activeItem} status={this.state.status} activeItem={this.setActiveItem}/>}
            </div>      
        )
    }
}