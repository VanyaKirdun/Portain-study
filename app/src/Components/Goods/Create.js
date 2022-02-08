import React, {useState} from 'react';
import Select from 'react-select'
import {useDispatch} from "react-redux";
import {createGoods} from "../../actions/goods.js";


const Create = (props) => {
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
    
    const changeHandler = (event) => {

		setFile(event.target.files[0]);


	};

    return (
            <form className='admin__form'>
                <input type="file" onChange={changeHandler} name="file"/>
                <input onChange={e => setName(e.target.value)} placeholder='Введите имя' type="text"/>
                <Select onChange={e => setType(e.value)} placeholder='Выберите тип' options={options} />
                <input onChange={e => setTime(e.target.value)} placeholder='Введите дату' type="text"/>
                <input onChange={e => setCost(e.target.value)} placeholder='Введите стоимость' type="text"/>
                <textarea onChange={e => setDescript(e.target.value)} placeholder='Введите описание' type="text"/>
                <button type="submit" onClick={() => {dispatch(createGoods(name, type, time, cost, descript, file))}}>Создать</button>
            </form>
    )
}

export default Create