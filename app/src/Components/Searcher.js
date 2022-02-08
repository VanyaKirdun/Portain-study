import React, {useState} from 'react';
import Select from 'react-select'

const Searcher = (props) => {
    const [data, setData] = useState("")
    const [type, setType] = useState("all")

    const options = [
        { value: 'all', label: 'all' },
        { value: 'watch', label: 'watch' },
        { value: 'bracelet', label: 'bracelet' },
        { value: 'belt', label: 'belt' },
        { value: 'cufflinks', label: 'cufflinks' },
        { value: 'jewelry', label: 'jewelry' }
      ]

    return (
            <div className='search'>
                <input type='text' onChange={e => setData(e.target.value)} placeholder="Искать здесь..." value={data}/>
                <Select onChange={e => setType(e.value)} defaultValue={{ value: 'all', label: 'all' }} placeholder='Выберите тип' options={options} />
                <button onClick={() => {props.searchedGoods(data, type)}}></button>
            </div>
    )
}

export default Searcher