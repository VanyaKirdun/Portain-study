// import logo from './logo.svg';
import 'normalize.css';
import './App.css';
import Header from './Components/Header';
import Main from './Pages/Main'
import Catalog from './Pages/Catalog'
import Admin from './Pages/Admin'
import Profile from './Pages/Profile'
import Item from './Pages/Item'
import Footers from './Components/Footers';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {auth} from './actions/user'
import {useEffect} from 'react'

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const userId = useSelector(state => state.user.userId)
  const typeUser = useSelector(state => state.user.typeUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
    
  })

  
  


  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Main}></Route>
          <Route path='/catalog' component={Catalog}></Route>
          <Route path='/admin' component={()=><Admin isAuth={isAuth} typeUser={typeUser}/>} ></Route>
          <Route path='/profile' component={()=><Profile isAuth={isAuth} userId={userId} typeUser={typeUser}/> }></Route>
          <Route path='/goods/:id' component={Item}></Route>
        </Switch>
        
       
        <Footers />
      </Router>
    </div>
  );
}

export default App;

