import React from 'react';
import Card from './Card'

const CardList = (data) => (
    <div className='supply__container'>
        { 
            Object.values(data)[0].map((value, index) => {
                let element = value;
                if (Object.keys(value).length===2) {
                    element = value[0]
                }
                return(
                    <Card
                        key={data.uniqueKey+index}
                        id={element._id} 
                        name={element.name}
                        cost={element.cost}
                        time={element.time}
                        img={element.img}
                        number={value[1]}
                        descript={element.descript}
                        activeItem={data.activeItem}
                        userId={data.userId}
                    />
                )
            })
        }
    </div>
)

export default CardList;