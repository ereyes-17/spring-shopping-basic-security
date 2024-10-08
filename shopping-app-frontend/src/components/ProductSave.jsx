// WILL BE A CHILD OF THE ADMIN PAGE
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Product from "../models/Product";
import ProductService from "../services/product.service";
import { Modal } from "react-bootstrap";

const ProductSave = forwardRef((props, ref) => {
    const [product, setProduct] = useState(new Product("", "", 0));
    const [errorMessage, setErrorMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({
        // interaction with parent
        showProductModal() {
            setShow(true);
        }
    }));

    useEffect(() => {
        setProduct(props.product);
    }, [props.product]);

    const saveProduct = (e) => {
        console.log(product);
        e.preventDefault();

        setSubmitted(true);

        if (!product.name || !product.description || !product.price) {
            return;
        }

        ProductService.saveProduct(product).then(response => {
            props.onSaved(response.data);
            setShow(false);
            setSubmitted(false);
        }).catch(err => {
            setErrorMessage("Unexpected error occurred.");
            console.log(err);
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setProduct((prevState => {
            return {
                ...prevState,
                [name]: value
            };
        }));
    }

    return (
        <Modal show={show}>
            <form onSubmit={(e) => saveProduct(e)} noValidate className={submitted? "was-validated" : ""}>
                <div className="modal-header">
                    <h5 className="modal-title">Product Details</h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>
                <div className="modal-body">
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" 
                        name="name" 
                        className="form-control" 
                        required 
                        placeholder="name" 
                        value={product.name} 
                        onChange={(e) => handleChange(e)}
                        />
                        <div className="invalid-feedback">Name is required.</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" 
                        className="form-control" 
                        required 
                        placeholder="description" 
                        value={product.description} 
                        onChange={(e) => handleChange(e)}
                        />
                        <div className="invalid-feedback">Description is required.</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">price</label>
                        <input type="number" 
                        min="1" 
                        step="any" 
                        name="price" 
                        className="form-control" 
                        required 
                        placeholder="price" 
                        value={product.price} 
                        onChange={(e) => handleChange(e)}
                        />
                        <div className="invalid-feedback">Price is required and greater than $0.0.</div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
                    <button type="submit" className="btn btn-secondary">Save Changes</button>
                </div>
            </form>
        </Modal>
    )
});

export {ProductSave};