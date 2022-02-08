import React, { Component } from 'react';
import CardList from '../Components/Items/CardList'
import { Redirect } from 'react-router-dom';

export default class Profile extends Component {
    state = {
        allCards: [],
        activeItem: [],
        redirect: false,
        redirectTo: '/',
        total: 0   
    }

    componentDidMount() {
        if(this.props.typeUser==='user'){
            const apiUrl = `http://localhost:5000/api/user/${this.props.userId}/goods/`;
            fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if(Object.values(data['goods']).length!==0){
                    Object.values(data['goods']).forEach(item=> {
                        const goodsUrl = `http://localhost:5000/api/goods/${item[0].itemId}`
                        fetch(goodsUrl)
                        .then((responses) => responses.json())
                        .then((goods) => {
                            this.setState(prevState=> ({total: prevState.total + goods.goods[0].cost * item[0].number}))
                            this.setState(prevState=> ({allCards: [...prevState.allCards, [goods.goods[0], item[0].number]]}))
                        });
                    })
                }
            });
        } if(localStorage.getItem('token') === null && this.props.typeUser===null) {
            this.setState({redirect: true})
        }
    }

    setActiveItem=(data)=>{
        this.setState({redirect: true})
        this.setState({redirectTo: `/goods/${data.id}`})
    }

    render(){
        return (
            <div className='user'>
                {this.state.redirect && <Redirect to={this.state.redirectTo} />}
                <h1 className='user__total'>К оплате: {this.state.total}$</h1>
                <CardList data={this.state.allCards} userId={this.props.userId}  activeItem={this.setActiveItem}/>
            </div>      
        )
    }
}