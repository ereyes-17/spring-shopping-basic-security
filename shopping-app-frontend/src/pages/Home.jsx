import { useEffect, useState } from "react";
import ProductService from "../services/product.service";
import PurchaseService from "../services/purchase.service";
import Purchase from "../models/Purchase";
import { useSelector } from "react-redux";
import "../styles/home.css";

const HomePage = () => {

    const [productList, setProductList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [infoMessage, setInfoMessage] = useState("");

    const currentUser = useSelector(state => state.user);

    useEffect(() => {
       ProductService.getAllProducts().then((response) => {
        setProductList(response.data);
       }).catch((err) => {
        setErrorMessage("Unexpected error occurred");
        console.log(err)
       });
    }, []);

    const purchase = (product) => {
        if (!currentUser?.id) {
            setErrorMessage("You need to be logged in");
            return;
        }

        const tmpPurchase = new Purchase(currentUser.id, product.id, product.price);

        PurchaseService.savePurchase(purchase).then(() => {
            setInfoMessage("Thank you!");
        }).catch((err) => {
            setErrorMessage("Unexpected error occurred.");
            console.log(err);
        });
    };
    return (
        <div className="container p-3">
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {infoMessage && <div className="alert alert-success">{infoMessage}</div>}
            <div className="d-flex flex-wrap">
                {productList.map((item, idx) => {
                    <div className="card m-3 home-card" key={item.id}>

                    </div>
                })}
            </div>
        </div>
    );
};

export {HomePage}