import React from 'react';


const Brands = (data) => (
    <div className='brands'>
        <div className='main__collection-title brands__title'>НАШИ БРЕНДЫ</div>

        <div className='brands__container'>
            {
                Object.values(data)[0].map((element, index) => {
                    return(
                        <div key={'brand'+index} className='brands__item'><img src={element.img} alt='Brand'/></div>
                    )
                })
            }
        </div>
    </div>
)

export default Brands;

