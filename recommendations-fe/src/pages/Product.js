import { useParams } from "react-router-dom";
import * as React from "react";
import { useEffect } from "react";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Product(props) {

    const {userId} = useParams();
    
    const API_URL = "http://localhost:8000/api/";
    const [dataProvider, setDataProvider] = React.useState([]);
    const [isLoading,SetLoading] = React.useState(true);

    useEffect(() => {
        axios.get(API_URL + "shop/rewards/"+userId).then((response) => {
        setDataProvider(response.data);
        SetLoading(false);
        });
    }, []);

    console.log(dataProvider);
    if(isLoading){
        return (<><CircularProgress/></>);
    }

    return(
        <>
    <section class="py-5">
    <div class="container product_data px-4 px-lg-5 my-5">
        <div class="row gx-4 gx-lg-5 align-items-center">
            <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0"  src={dataProvider.reward_images[0].image} /></div>
            <div class="col-md-6">
                <div class="small mb-1"></div>
                <h1 class="display-5 fw-bolder">{dataProvider.title}</h1>
                <div class="fs-5 mb-5">
                    <span>{dataProvider.cost}$</span>
                </div>
                <p class="lead">{dataProvider.long_description}</p>

                <div class="d-flex">
                         
                        <button class="input-group-text decrement-btn">-</button>
                            <input type="text" class="form-control text-center input-qty bg-white"  value="1" disabled/>
                        <button class="input-group-text increment-btn" >+</button>
                    
                    <button class="btn btn-outline-dark flex-shrink-0 addToCart-btn" value={1} type="button">
                        <i class="bi-cart-fill me-1"></i>
                        Add to cart
                    </button>
                </div>  
            </div>
            
        </div>
    </div>
</section>
</>
    );
}
