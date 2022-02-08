import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Components/Items/Card'
import CardList from '../Components/Items/CardList'
import Brands from '../Components/Brands';

export default class Main extends Component {

    state = {
        lastCards: [
            // {name: 'Louis XVI ATHOS', cost: '165 000 руб.', img: './62050 1.png'},
            // {name: 'Louis XVI ATHOS', cost: '165 000 руб.', img: './62050 1.png'},
            // {name: 'Louis XVI ATHOS', cost: '165 000 руб.', img: './62050 1.png'}
        ],
        newCards: [
            // {name: 'Louis XVI ATHOS', cost: '165 000 руб.', img: './62050 1.png'},
            // {name: 'Louis XVI ATHOS', cost: '165 000 руб.', img: './62050 1.png'},
            // {name: 'Louis XVI ATHOS', cost: '165 000 руб.', img: './62050 1.png'},
            // {name: 'Louis XVI ATHOS', cost: '165 000 руб.', img: './62050 1.png'},
            // {name: 'Louis XVI ATHOS', cost: '165 000 руб.', img: './62050 1.png'},
            // {name: 'Louis XVI ATHOS', cost: '165 000 руб.', img: './62050 1.png'},
            // {name: 'Louis XVI ATHOS', cost: '165 000 руб.', img: './62050 1.png'},
            // {name: 'Louis XVI ATHOS', cost: '165 000 руб.', img: './62050 1.png'}
        ],
        brandsName: [
            {img: './Rectangle 2.png'},
            {img: './Rectangle 2.png'},
            {img: './Rectangle 2.png'},
            {img: './Rectangle 2.png'}
        ]
    }

    componentDidMount() {
        const apiUrl = 'http://localhost:5000/api/goods';
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            let mass = []
            for(let item in data['goods']) {
                mass.push(data['goods'][item])
            }

            this.setState({newCards: mass.reverse().slice(0, 9)})
            let timeMass = []
            mass.reverse().forEach((value)=>{
                if(value.time===2020 || value.time === 2021){
                    timeMass.push(value)
                }
            })
            this.setState({lastCards: timeMass.slice(0, 3)})
        });
      }

    setActiveItem=(data)=>{
        this.props.history.push(`/goods/${data.id}`)
    }

    filterRedirect=(data) =>{
        this.props.history.push(`/catalog/${data}`)
    }

    render(){
        return (
        <div className="main">
            <div className="main__title-block">
                <div className='main__title-container'>
                    <div className='main__title'>
                        <h1 className='main__title-name'>PORTEN</h1>
                        <span className='main__title-sub'>САНКТ-ПЕТЕРБУРГ</span>  
                    </div>

                    <p className='main__subtitle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus interdum purus, est tortor pulvinar ut in. Fringilla a diam enim sed justo, sed iaculis sagittis. Tortor id eu interdum nec ut iaculis. Penatibus ullamcorper ultricies morbi ipsum sem metus pharetra, mi. Tortor nibh magna feugiat id nunc, dui nisl viverra.</p>
                </div>
            </div>

            <div className='main__collection-block'>
                <div className='main__collection-last'>
                            <div className='main__collection-title'>СЕЗОН 2020/21</div>
                    <div className='main__collection-item'>
                    {Object.keys(this.state.lastCards).length===0 && <h1>ТОВАРОВ ДАННЫХ ГОДОВ НЕТ В НАЛИЧИИ!</h1>}
                    {Object.keys(this.state.lastCards).length>0 &&
                        this.state.lastCards.map((element, index) => {
                            return(
                                <Card 
                                    key={'season'+index}
                                    id={element._id} 
                                    name={element.name}
                                    cost={element.cost}
                                    time={element.time}
                                    img={element.img}
                                    descript={element.descript}
                                    activeItem={this.setActiveItem}
                                />
                            )
                        })
                    }
                    </div>
                </div>
                <div className='main__collection-new'>
                    <div className='main__collection-container'>
                        <div className='main__collection-title_link'>Новая коллекция</div>
                        <div className='main__collection-link button'>
                            <Link to='/catalog'  className='card__text'>КАТАЛОГ</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='main__collection-block_old'>
                <div className='main__collection-picture'></div>
                <div className='main__collection-old'>
                    <div className='main__collection-container-old'>
                        <div className='main__collection-title_old'>коллекция 2018</div>
                        <p className='main__collection-subtitle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non rutrum ornare ut mattis habitant dui arcu. Sagittis amet nunc ut neque quis nibh arcu. Vivamus vestibulum nisi et venenatis sed scelerisque magna consectetur. Amet convallis quis gravida facilisis vulputate. Faucibus facilisi habitasse ipsum interdum dictum aliquet. Velit quis ullamcorper pulvinar nulla malesuada integer. Aenean praesent viverra nulla nullam natoque volutpat curabitur auctor. Viverra viverra ullamcorper scelerisque risus dignissim egestas. Id aliquam a aliquam egestas leo orci pharetra sed diam.</p>
                        <div className='main__collection-link_old button'>
                        <span className='card__text' onClick={()=>{this.filterRedirect('2018')}}>ПОСМОТРЕТЬ КОЛЛЕКЦИЮ</span>
                        </div>
                    </div>
                </div>
            </div>

            <div id='hook' className='supply'>
                <div className='supply__title'>НОВЫЕ ПОСТУПЛЕНИЯ</div>
                {Object.keys(this.state.newCards).length===0 && <h1>НЕТУ ТОВАРОВ В НАЛИЧИИ!</h1>}
                {  Object.keys(this.state.newCards).length>0 &&
                    <CardList
                        data={this.state.newCards}
                        uniqueKey={'goods'}
                        activeItem={this.setActiveItem}
                    />
                }
            </div>

            <Brands 
                data={this.state.brandsName}
            />
            <div className='info'>
                <div className='info__container'>
                    <div className='info__item'>
                        <div className='info__title'>О магазине</div>
                        <div className='info__subtitle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi semper viverra nunc cursus tortor lectus nunc nulla nibh. Egestas amet consectetur vel vitae aliquam dictum suspendisse. Lobortis eget consequat, tellus et et sed turpis. Pretium quisque vitae, amet, porttitor odio ultricies massa pharetra leo. Et ipsum urna fames in sit mi ultrices nisi, nunc.</div>
                    </div>
                    <div className='info__item'>
                        <div className='info__title'>Категории</div>
                        <div className='info__category'>
                            <div className='info__category-item' onClick={()=>{this.filterRedirect('watch')}}>часы</div>
                            <div className='info__category-item' onClick={()=>{this.filterRedirect('bracelet')}}>браслеты</div>
                            <div className='info__category-item' onClick={()=>{this.filterRedirect('belt')}}>ремни</div>
                            <div className='info__category-item' onClick={()=>{this.filterRedirect('jewelry')}}>ювелирные изделия</div>
                            <div className='info__category-item' onClick={()=>{this.filterRedirect('cufflinks')}}>запонки</div>
                        </div>
                    </div>
                    <div className='info__item'>
                        <div className='info__title'>Рассылка</div>
                        <div className='info__subtitle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi semper viverra nunc cursus tortor lectus nunc nulla nibh.</div>
                        <form className='info__mailing'>
                            <input className='info__input' defaultValue="Ваша почта"/>
                            <button className='info__button'>ПОДПИСАТЬСЯ</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}