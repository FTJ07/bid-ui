import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutUser } from '../actions/authAction';

class Header extends React.Component {

    renderLinks(){
        if(this.props.authenticated){
            return    <li> <Link onClick={this.props.signoutUser} to="#">Sign Out</Link></li>
        }
        
        return (
            <React.Fragment>
                <li> <Link to="/signup">Sign Up</Link></li>
                <li> <Link to="/signin">Sign In</Link></li>
            </React.Fragment>

        )
    }

    render(){
        return (
            <div>
                    <nav>
                        <div className="nav-wrapper">
                            <Link to="/">Home</Link>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                        {this.renderLinks()}
                            </ul>
                        </div>
                    </nav>
            </div>
        );
    }

  }

  const mapStateToProps = (state)=>{
      return {
          authenticated:state.auth.authenticated
      }
  }
  
  export default connect(mapStateToProps,{signoutUser})(Header);

