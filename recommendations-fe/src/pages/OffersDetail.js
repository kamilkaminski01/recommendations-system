
import { useParams } from "react-router-dom";
import * as React from "react";
import { useEffect } from "react";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import RecomenderComponent from "../components/RecomenderComponent";
import Recommender from "../providers/dataProviders";
export default function OffersDetail(props) {

    const {productId} = useParams();
    
    const API_URL = "http://localhost:8000/api/";
    const [dataProvider, setDataProvider] = React.useState([]);
    const [isLoading,SetLoading] = React.useState(true);

    useEffect(() => {
        axios.get(API_URL + "advertisements/details/"+productId).then((response) => {
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
            <div class="col-md-6">
                <div class="small mb-1"></div>
                <h1 class="display-5 fw-bolder">{dataProvider.title}</h1>
                <div class="fs-5 mb-5">
                    <span>{dataProvider.reward_for_approval}ptk</span>
                </div>
                <p class="lead">{dataProvider.description}</p>
              
                <div class="d-flex">
                        <span>Comapny: {dataProvider.company}</span>
                </div>  
                <div class="mt-5">
                    <RecomenderComponent/>
                </div>
                
            </div>
            
        </div>
    </div>
   
</section>
</>
    );
}