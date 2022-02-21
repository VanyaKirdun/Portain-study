import React, { Component } from 'react';
import { withRouter } from "react-router";
import Buy from '../Components/Goods/Buy';
import { API_URL } from '../config';

class Item extends Component {
    state = {
        item: []
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const apiUrl = `${API_URL}api/goods/${id}`;
        fetch(apiUrl)
           .then((response) => response.json())
           .then((data) => {
            this.setState({item: data['goods'][0]})
        });
        
    }
    render(){
        return (
            <div className='goods'>
                <div className='goods__info'>
                    <div className='picture'>
                        <img src={`https://res.cloudinary.com/storageimage/image/upload/v1645386179/${this.state.item.img}`} alt={this.state.item.name}/>
                    </div>
                    <div className='goods__data'>
                        <h1>{this.state.item.name}</h1>
                        <div>Стоимость: {this.state.item.cost}$</div>
                        <div>Год создания: {this.state.item.time}</div>
                        <Buy id={this.state.item._id}/>
                    </div>
                </div>
                <div className='goods__descript'>
                    <p>{this.state.item.descript}</p>
                </div>
            </div>  
        )
    }
}

export default withRouter(Item);