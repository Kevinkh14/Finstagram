import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import routes from './routes'
import style from './Components/styles/Main.scss' 
import {connect} from 'react-redux'
import {getSession, registerUser} from './Redux/reducers/userReducer'
import {withRouter} from 'react-router-dom'

//components
import Login from './Components/Login'
import Register from './Components/Register'
import Nav from './Components/Nav'

class App extends Component {

  componentDidMount(){
    this.props.getSession()
  }

  render(){
    let content;
    if (!this.props.user_id && this.props.location.pathname == "/"){
      content = <Login/>
    }else if (!this.props.user_id && this.props.location.pathname =="/register"){
      content =<Register/>
    }else if (this.props.user_id){
      content = <div ><Nav/>{routes}</div>
    }
    return (
      <div className="App">
        {content}
      </div>
    );
  }
}

const mapStateToProps = reduxState =>{
  return {
    user_id: reduxState.userReducer.user_id
  }
}


export default withRouter(connect(mapStateToProps, {
  getSession
})(App))