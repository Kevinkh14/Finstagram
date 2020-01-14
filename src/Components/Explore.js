import React ,{Component} from 'react'
import {connect} from 'react-redux'
import {getAllPost} from '../Redux/reducers/postReducer'




class Explore extends Component{
    constructor(){
        super()
        this.state ={

        }
    }

    componentDidMount () {
        this.props.getAllPost()
        console.log(this.props.getAllPost())
    }

    render (){
        const postMapped = this.props.post.map((post,i)=>{
            return (
                <div key = {i} className = 'post'>
                    {/* <h1>{post.content}</h1>
                    <p>{post.username}</p> */}
                    <img className = 'picture' src = {post.picture}></img>
                </div>
            )
        })
        return (
            <div className = 'post-mapped'>
                {postMapped}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
       post: reduxState.postReducer.post,
       user_id: reduxState.userReducer.user_id
    }
 }

 export default connect(mapStateToProps,
    {
     getAllPost
    }
 )(Explore);