
import logo from "./face.jpg";



export default function Product() {


    return(
        <>
    <section class="py-5">
    <div class="container product_data px-4 px-lg-5 my-5">
        <div class="row gx-4 gx-lg-5 align-items-center">
            <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0"  src={require("./face.jpg")} alt="<?= $product['image'] ?>" /></div>
            <div class="col-md-6">
                <div class="small mb-1"></div>
                <h1 class="display-5 fw-bolder">Pan ze stocka</h1>
                <div class="fs-5 mb-5">
                    <span>200$</span>
                </div>
                <p class="lead">Tutaj bedzie opis porduktu narazie pan ze stocka</p>

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