import { useEffect, useRef, useState } from "react";
import ProductService from "../services/product.service";
import { ProductSave } from "../components/ProductSave";
import { ProductDelete } from "../components/ProductDelete";
import Product from "../models/Product";

const AdminPage = () => {
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(new Product("", "", 0));
    const [errorMessage, setErrorMessage] = useState("");

    const saveComponent = useRef();
    const deleteComponent = useRef();

    useEffect(() => {
        ProductService.getAllProducts().then((response) => {
            console.log(response.data);
            setProductList(response.data);
        });
    }, []);

    const createProductRequest = () => {
        saveComponent.current?.showProductModal();
    }

    const saveProductWatcher = (p) => {
        const newList = productList.concat(p);
        setProductList(newList);
    }

    const editProductRequest = (item) => {
        setSelectedProduct(Object.assign({}, item));
        saveComponent.current?.showProductModal();
    }

    const deleteProductRequest = (item) => {
        setSelectedProduct(item)
        deleteComponent.current?.showDeleteModal();
    }

    const deleteProduct = () => {
        ProductService.deleteProduct(selectedProduct).then(_ => {
            setProductList(productList.filter(x => x.id !== selectedProduct.id));
        }).catch(err => {
            setErrorMessage("Unexpected error ocurred");
            console.log(err);
        });
    }
    return (
        <div>
            <div className="container">
                <div className="pt-5">
                    {errorMessage && <div className="alert alter-danger">{errorMessage}</div>}
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                    <div className="col-6">
                                        <h3>All Products</h3>
                                    </div>
                                    <div className="col-6 text-end">
                                        <button className="btn btn-primary" onClick={() => createProductRequest()}>
                                            Create Product
                                        </button>
                                    </div>
                                </div>
                            </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productList.map((item, idx) => 
                                        <tr key={item.id}>
                                            <th scope="row">{idx + 1}</th>
                                            <td>{item.name}</td>
                                            <td>{`$ ${item.price}`}</td>
                                            <td>{new Date(item.createTime).toLocaleDateString()}</td>
                                            <td>
                                                <button className="btn btn-primary me-1" onClick={() => editProductRequest(item)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-danger" onClick={() => deleteProductRequest(item)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ProductSave ref={saveComponent} onSaved={(p) => saveProductWatcher(p)} product={selectedProduct}/>
            <ProductDelete ref={deleteComponent} onConfirmed={() => deleteProduct()} product={selectedProduct}></ProductDelete>    
        </div>
    );
};

export {AdminPage}