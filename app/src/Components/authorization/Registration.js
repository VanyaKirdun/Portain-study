import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {registration} from "../../actions/user";

const Reqistration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [copyPassword, setCopyPassword] = useState("")
    const [emailDirty, setEmailDirty] = useState('');
    const [passwordDirty, setPasswordDirty] = useState('');
    const [copyPasswordDirty, setCopyPasswordDirty] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState(''); 
    const [copyPasswordError, setCopyPasswordError] = useState(''); 
    const [formValid, setFormValid] = useState(''); 
    const dispatch = useDispatch()

    function emailHandler (e){
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())){
            setEmailError('Некорректный емейл')
        } else {
            setEmailError('')
        }
    
        if(emailError || passwordError || copyPasswordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }

    function passwordHandler(e) {
        setPassword(e.target.value)
        if(e.target.value.length < 3 || e.target.value.length > 15){
            setPasswordError('Пароль должен быть длинее 3 и меньше 15')
            if(!e.target.value){
                setPasswordError('Password не может быть пустым')
            } 
        } else {
            setPasswordError('')
        }

        if(emailError || passwordError || copyPasswordError) {
           setFormValid(false)
        } else {
            setFormValid(true)
        }
    }

    function copyPasswordHandler(e) {
        setCopyPassword(e.target.value)
        if(!e.target.value){
            setCopyPasswordError('Copy Password не может быть пустым')     
        } else if(e.target.value !== password) {
            setCopyPasswordError('Пароли должны совпадать')
        } else {
            setCopyPasswordError('')
        }
        
        if(emailError || passwordError || copyPasswordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }
    
    function blurHandler(e){
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break;
            case 'password':
                setPasswordDirty(true)
                break;
            case 'copyPassword':
                setCopyPasswordDirty(true)
                break;
            default:
                break;
        }
    
        if(emailError || passwordError || copyPasswordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }
    

    return (
        <div className='auth'>
            <form className='auth__form'>
                <h1 className='auth__title'>Регистрация</h1>
                <div className='auth__name'>Login</div>
                {(emailDirty && emailError) && <div style={{color:'red'}}>{emailError}</div>}
                <div className='auth__input'>
                    <input className='auth__input' onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name='email' type='text' placeholder='Enter your email'/>
                    <span></span>
                </div>
                <div className='auth__name'>Password</div>
                {(passwordDirty && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
                <div className='auth__input'>
                    <input className='auth__input' onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name='password' type='password' placeholder='Enter your password'/>
                    <span></span>
                </div>
                <div className='auth__name'>Confirm password</div>
                {(copyPasswordDirty && copyPasswordError) && <div style={{color:'red'}}>{copyPasswordError}</div>}
                <div className='auth__input'>
                    <input className='auth__input' onChange={e => copyPasswordHandler(e)} value={copyPassword} onBlur={e => blurHandler(e)} name='copyPassword' type='password' placeholder='Enter your password again'/>
                    <span></span>
                </div>
                <div className='auth__submit'>
                    <button disabled={!formValid} type='button' onClick={() => dispatch(registration(email, password))}>Регистрация</button>
                </div>
            </form>
        </div>
    )
}

export default Reqistration