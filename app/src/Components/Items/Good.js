import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import Select from 'react-select'
import {changeGoods, deleteGoods} from "../../actions/goods.js";

const Good = (data) => {
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [time, setTime] = useState("")
    const [cost, setCost] = useState("")
    const [descript, setDescript] = useState('');
    const [file, setFile] = useState();
    const dispatch = useDispatch()

    const options = [
        { value: 'watch', label: 'watch' },
        { value: 'bracelet', label: 'bracelet' },
        { value: 'belt', label: 'belt' },
        { value: 'cufflinks', label: 'cufflinks' },
        { value: 'jewelry', label: 'jewelry' }
      ]

    useEffect(() => {
        setName(data.data.name)
        setTime(data.data.time)
        setCost(data.data.cost)
        setDescript(data.data.descript)
    }, [data.data.name, data.data.time, data.data.cost, data.data.descript]);

    const changeHandler = (event) => {
		setFile(event.target.files[0]);
	};

    return (
        <div className='change'>
            <div className='card__picture'>
                    <img src={`http://localhost:5000/files/${data.data.img}`} alt={data.data.name}/>
            </div>
            <form className='admin__form'>
                <input type="file" onChange={changeHandler} name="file"/>
                <input onChange={e => setName(e.target.value)} value={name} placeholder='Введите имя' type="text"/>
                <Select onChange={e => setType(e.value)} placeholder='Выберите тип' options={options} />
                <input onChange={e => setTime(e.target.value)} value={time} placeholder='Введите дату' type="text"/>
                <input onChange={e => setCost(e.target.value)} value={cost} placeholder='Введите стоимость' type="text"/>
                <textarea onChange={e => setDescript(e.target.value)} value={descript} placeholder='Введите описание' type="text"/>
                <button type="submit" onClick={() => {dispatch(changeGoods(data.data.id, name, type, time, cost, descript, file))}}>Изменить товар</button>
            </form>
            <div><button type="submit" onClick={()=>{dispatch(deleteGoods(data.data)); window.location.reload(true)}}>Удалить товар</button></div>
        </div>
    )
}

export default Good;