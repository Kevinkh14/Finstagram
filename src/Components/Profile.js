import React, { Component } from "react";
import { connect } from "react-redux";
import { getSession, logoutUser } from "../Redux/reducers/userReducer";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      settings: false
    };
  }
  handleOpen = () => {
    this.setState({ settings: true });
  };
  handleClose = () => {
    this.setState({ settings: false });
  };
  handleLogout = () => {
    this.props.logoutUser();
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <div className="profile-container">
          <div className="header">
            <div className="profile-pic">
              <img className="profile-img" src={this.props.profile_pic} />
            </div>
            <section className="user-info">
              <div className="user-name">
                <p>{this.props.username}</p>
                <div className = 'settings-container'>
                  <button className="edit-profile">edit profile</button>
                  <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.settings}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500
                    }}
                  >
                    <Fade in={this.state.settings}>
                      <div className="settings">
                        <div className="settings-content">
                          <Button
                            variant="contained"
                            color="primary"
                            className="create-post-but"
                            onClick={this.handleLogout}
                          >
                            logout
                          </Button>
                        </div>
                      </div>
                    </Fade>
                  </Modal>
                </div>
                <a onClick={this.handleOpen}>
                  <i id="cog" class="fas fa-cog"></i>
                </a>
              </div>
              <div className="followings">
                <p>0posts</p>
                <p>{this.props.followers}followers</p>
                <p>{this.props.following}following</p>
              </div>
              <p id="name">{this.props.name}</p>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user_id: reduxState.userReducer.user_id,
    username: reduxState.userReducer.username,
    following: reduxState.userReducer.following,
    followers: reduxState.userReducer.followers,
    profile_pic: reduxState.userReducer.profile_pic,
    name: reduxState.userReducer.name
  };
};

export default connect(mapStateToProps, {
  getSession,
  logoutUser
})(Profile);
