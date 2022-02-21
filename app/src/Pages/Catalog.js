import React, { Component } from 'react';
import CardList from '../Components/Items/CardList'
import Searcher from '../Components/Searcher';
import { API_URL } from '../config';

export default class Catalog extends Component {
    state = {
        apiUrl: `${API_URL}api/goods`,
        searchStatus: false,
        all: []
    }

    loadFile(season=false){
        fetch(this.state.apiUrl)
        .then((response) => response.json())
        .then((data) => {
            let mass = []
            for(let item in data['goods']) {
                mass.push(data['goods'][item])
            }
            this.setState({searchStatus: false})
            let timeMass = []
            if(season){
                mass.reverse().forEach((value)=>{
                    if(value.time===season){
                        timeMass.push(value)
                    }
                })
                this.setState({all: timeMass})
            } else{
                this.setState({all: mass.reverse()})
            }
        });
    }

    componentDidMount() {
        if(this.props.location.pathname.split('/').pop()!=='catalog'){
            let data = this.props.location.pathname.split('/').pop()
            if(isNaN(+data)){
                this.state.apiUrl = `${API_URL}api/goods/filter/${data}`;
                this.loadFile()
            } else {
                this.loadFile(+data)
            }
        } else {
            this.loadFile()
        }
        
    }

    componentDidUpdate(){
        if(this.state.searchStatus){
            this.loadFile()
        }
    }
    
    setActiveItem=(data)=>{
        this.props.history.push(`/goods/${data.id}`)
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

    render(){
        return (
            <div className='catalog'>
                 <div className='catalog__title'>КАТАЛОГ</div>
                <Searcher searchedGoods={this.searchedGoods}/>
                <CardList
                    data={this.state.all}
                    activeItem={this.setActiveItem}
                />
            </div>
        )
    }
}