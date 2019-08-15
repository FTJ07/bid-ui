import React from 'react';
import SocketIOClient from 'socket.io-client';
import ProductItem from '../components/product/ProductItem';
import axios from 'axios';
import { connect } from 'react-redux';
import { ROOT_URL } from '../env';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { signoutUser } from '../actions/authAction';



class Home extends React.Component{
    state={
        productList:[]
    }

    lists = {
        currentStateProductList:[]
    }

    bidSubmitHandle = (e)=>{
        if(this.props.auth.authenticated){
            const config = { headers: {'x-auth-token':this.props.auth.token } };
            axios.post(`${ROOT_URL}api/createBid`,{productId:e.target.id},config)
            .then((response)=>{
                swal("You Successfully Bid The Item");
            })
            .catch((error)=>{
                if(error.response.status){
                    swal("You must login");
                    this.props.signoutUser();
                } 
            })
        }else{
            swal("You must login");
            this.props.history.push('/signin');
        }

    }
    

    componentDidMount(){
        axios.get(`${ROOT_URL}api/getProductBiddingList`)
        .then((response)=>{
            this.setState({productList:response.data.data})
        });

        const socket = SocketIOClient(ROOT_URL);
        socket.on("realTimeProductBiddingList", data =>{
           this.lists.currentStateProductList = data.data;
           this.productStateChange(this.state.productList,this.lists)
           
        })
    }
    
    productStateChange(intialProductList, lists){
                intialProductList.map((item) => {
                    const realTimeItem = lists.currentStateProductList.find(r => r.productId === item.productId);

                    if (realTimeItem !== undefined) { 
                        if (item.productIsActive !== realTimeItem.productIsActive) {
                             this.setState({productList:lists.currentStateProductList})
                        }else if(realTimeItem.productIsActive === 1 && realTimeItem.productBidRemainingTime < 0){
                            this.setState({productList:lists.currentStateProductList})
                        } else if(realTimeItem.productBiddingAmount !== item.productBiddingAmount){
                            this.setState({productList:lists.currentStateProductList})
                        }
                    }

                })
    }



    renderProductList(){
        return this.state.productList.map((item,index)=>{   
             return (        
                <ProductItem onClick={this.bidSubmitHandle.bind(this)} item={item} key={index}/>
             )
         })
     }
    render(){
        return (
            <div className="container">

                <div className="row">
                        {this.renderProductList()}
                </div>
            </div>

        )
    }
}
const mapStateToProp = (state)=>{

    return {
        auth:state.auth
    }
}
export default withRouter(connect(mapStateToProp,{signoutUser})(Home));