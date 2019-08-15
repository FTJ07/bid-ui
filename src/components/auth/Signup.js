import React from 'react';
import axios from 'axios';
import { ROOT_URL } from "../../env";

class SingUp extends React.Component{
    state={
        error:false,
        message:''
    }


    handleFormSubmit(event){
        event.preventDefault();
        const name = event.target.name.value;
        const userName = event.target.username.value;
        const userPassword = event.target.password.value;
        
        axios.post(`${ROOT_URL}api/signup`,{name,userName,userPassword,"userType":1})
        .then((response)=>{
            this.setState({message:"Successfully inserted",error:false})
        })
        .catch((err)=>{
            this.setState ({message:err.response.data.message,error:true})
        })
    }

    render(){
        return (
            <div className="container">
            <div className="row">
                <form onSubmit={this.handleFormSubmit.bind(this)} className="col s12">

                    <div className="row">
                        <div className="input-field col s12">
                            <input id="name" type="text" className="validate" required/>
                            <label for="name"> Name</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <input id="username" type="text" className="validate" required/>
                            <label for="username">User Name</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" required/>
                            <label for="password">Password</label>
                        </div>
                    </div>

                    <button className="btn waves-effect waves-light" type="submit" name="action">
                        Register
                    </button>
                    <div className="row">
                      {this.state.message}
                    </div>
                   
                </form>
            </div>
        </div>

        )
    }
}
export default SingUp;