import React, { Component } from "react";
import { connect } from "react-redux";
import {createPost} from '../Redux/reducers/postReducer'
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import TextField from "@material-ui/core/TextField";

class DashBoard extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      picture: ""
    };
  }
  handleInput = e => {
    this.setState({ content: e.target.value });
  };
  handleSubmit = () => {
    const newPost = {
        user_id: this.props.user_id,
        content: this.state.content,
        picture: this.state.picture
    };
    this.props.createPost(newPost)
    console.log(newPost)
  };
  handleOpen = () => {
    this.setState({ createPost: true });
  };
  handleClose = () => {
    this.setState({ createPost: false });
  };
  checkUploadResult = (error, resultEvent) => {
    if (resultEvent.event === "success") {
      console.log("Picture uploaded successfully");
      console.log(resultEvent.info.url);
      this.setState({ picture: resultEvent.info.url });
    }
  };
  render() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "kevin14",
        uploadPreset: "zfjpjtrr",
        sources: ["local", "url", "dropbox", "facebook", "instagram"]
      },
      (error, result) => {
        this.checkUploadResult(error, result);
      }
    );
    return (
      <div>
        <div></div>
        <div className="addPost">
          {/* <input onChange = {this.handleInput}></input>
          <button onClick = {this.handleSubmit}>Add button</button> */}
          <div className="create-post">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleOpen}
            >
              Create post
            </Button>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.createPost}
              onClose={this.handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={this.state.createPost}>
                <div className="create">
                  <img className="thumnail" src={this.state.picture} alt="" />
                  <div className="create-content">
                    <div className="create-input">
                      <TextField
                        variant="outlined"
                        className="create-input"
                        label="Create Post"
                        onChange={this.handleInput}
                        style={{ cursor: "text" }}
                        value={this.state.content}
                      ></TextField>
                    </div>
                    <Button
                      variant="contained"
                      className="add-pic-but"
                      onClick={() => widget.open()}
                    >
                      add pic
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className="create-post-but"
                      onClick={this.handleSubmit}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </Fade>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
    return {
      user_id: reduxState.userReducer.user_id
    };
  };
  export default connect(mapStateToProps, {
    createPost
  })(DashBoard);
