import React from 'react';
import { ROOT_URL } from '../../env';
import Countdown from 'react-countdown-now';



const ProductItem = ({item,onClick})=>{
 
    const key = 'key-'+item.productId;
    const imgUrl = ROOT_URL +"/images/"+ item.productImage;
    return(
        <div className="col s6 m3" style={{height:463}}>
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" alt='' src={imgUrl} width="250" height="250" />
                </div>
                <div className="card-content">
                    <span style={{whiteSpace: 'nowrap',overflow: 'hidden',textOverflow:'ellipsis',fontSize:'16px'}} className="card-title activator grey-text text-darken-4">{item.productName}<i className="material-icons right">more_vert</i></span>
                      <div id={key}>  {bidButton(item,onClick)} </div> 
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{item.productName}<i className="material-icons right">close</i></span>
                    <p>{item.productDescription}</p>
                </div>
            </div>
        </div>
    )
}


const bidButton =(item,onClick)=>{

        if(item.productIsActive === 0){
            return(<div>
                 <h5 className='red-text '><small>£</small> {item.productPrice}</h5>
                 <div>Bid will start soon...</div>
          </div>) 
                
        }else if(item.productIsActive === 1 && item.productBidRemainingTime > 0)
        {
          
            let pPrice = item.productPrice
            if(item.productBiddingAmount != null && item.productBiddingAmount>0){
                pPrice = item.productBiddingAmount;
            }
            return (
                <div>
                         <h5 className='red-text '><small>£</small> {pPrice}</h5>
                         <Countdown date={Date.now() + item.productBidRemainingTime} />
                         <p><a onClick={onClick} id={item.productId} className="waves-effect waves-light btn-small">Bid now</a></p>
                    
                </div>
            )

        }else{
            return (
                <p className="#b71c1c red darken-4" style={{color:'white',textAlign:'center'}}>SOLD OUT</p>
                  
                
            )
        }
}

export default ProductItem;

