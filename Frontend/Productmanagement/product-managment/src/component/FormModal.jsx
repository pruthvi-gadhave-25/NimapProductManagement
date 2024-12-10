import { Modal, Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { getCategories } from '../services/CategoryService';

function FormModal({ isEditClicked, currentProduct, handleClose, handleUpdate, handleAdd, handleChange, show,handleCateoryChange }) {

    const [categories, setCategories] = useState([]);
   
    const handleAddProductBtn = () => {

        handleAdd();  // submit data 
        handleClose();

    }

    const handleUpdateBtn = () => {
        handleUpdate();
        handleClose();
    }

  

    useEffect(() => {

        const fetchCategories = async () => {
            const data = await getCategories();
            setCategories(data);
        }
        fetchCategories();


    }, [show])

    useEffect( () => {
        console.log(currentProduct);
        
    })

    return (

        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{
                        isEditClicked ? "Edit Product" : "Add Product"
                    }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="productName pb-1 text-mutded rounded-0">Product Name</label>
                            <input type="text" className="form-control rounded-0" id="productName" name='productName' value={currentProduct?.productName || ''} onChange={handleChange} placeholder="Enter Name" />
                        </div>
                        <label htmlFor='categoryName ' className='py-2 text-muted '>Category Name</label>
                        <div className="form-group ">
                            <select  
                                
                                 className="form-control  rounded-0" 
                                 name="categoryName"
                                defaultValue={currentProduct?.categoryId}
                                onChange={handleCateoryChange} >
                                <option>Select Category</option>
                                {categories?.map((option, index) => {
                                    return (
                                        <option key={index} value={option.categoryId} >
                                            {option.categoryName}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger " className="float-left" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        isEditClicked ? (<button className="add-product btn btn-primary" onClick={handleUpdateBtn}>
                            Update
                        </button>) : (
                            <button type='button' className="add-product btn btn-primary" onClick={handleAddProductBtn}>
                                Add
                            </button>
                        )
                    }

                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default FormModal