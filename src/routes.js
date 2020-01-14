import React from 'react'
import {Switch,Route} from "react-router-dom"
import Login from './Components/Login'
import Register from './Components/Register'
import DashBoard from './Components/DashBoard'
import Profile from './Components/Profile'
import Explore from './Components/Explore'



export default (
    <Switch>
        <Route path = "/Register" component ={Register}/>
        <Route path = "/Dashboard" component = {DashBoard}/>
        <Route path = "/profile" component ={Profile}/>
        <Route path = "/explore" component ={Explore}/>
        <Route exact path = "/" component ={Login}/>
    </Switch>
)