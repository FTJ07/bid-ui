import React from 'react';
import { connect } from 'react-redux';
import {siginUser} from '../../actions/authAction';
import { withRouter } from 'react-router-dom';

class SignIn extends React.Component{
    handleFormSubmit(event){
        event.preventDefault();
        const userName = event.target.username.value;
        const userPassword = event.target.password.value;
        this.props.siginUser(userName,userPassword,this.props.history);
    }

    renderAlert(){
        if(this.props.errorMessage){
            return (
                <div>
                       <strong>User Name password doesnt match </strong>
                </div>
            )
        }
    }

    componentWillUnmount(){
        window.location.reload();
    }

    render(){
    
        return (      
            <div className="container">
                <div className="row">
                    <form onSubmit={this.handleFormSubmit.bind(this)} className="col s12">

                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="User Name" id="username" type="text" className="validate" required />

                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="User Password" id="password" type="password" className="validate" required />

                            </div>
                        </div>

                        <button className="btn waves-effect waves-light" type="submit" name="action">
                            Log in
                        </button>
                        {this.renderAlert()}
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        errorMessage: state.auth.error
    }
}

export default withRouter(connect(mapStateToProps,{siginUser})(SignIn));