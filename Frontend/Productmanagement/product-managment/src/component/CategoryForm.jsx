import React, { useState } from 'react'
import { Modal ,Button } from 'react-bootstrap';

function CategoryForm( { handleClose, handleChange, handleUpdate, handleAdd ,show, isEditClicked,currentCategory}) {


    const handleUpdateBtn=( id)=>{
        handleUpdate( id) ;
        handleClose() ;
    }

    const handleAddCategoryBtn =( )=> {
        handleAdd() ;
        handleClose() ;
    }

  return (
    <div>
         <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{
                        isEditClicked ? "Edit Category" : "Add Category"
                    }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="categoryName pb-1 text-muted">Category Name</label>
                            <input type="text" className="form-control rounded-0" id="categoryName" name='categoryName' value={currentCategory?.categoryName || ''} onChange={handleChange} placeholder="Enter Category Name"  required/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger " className="float-left" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        isEditClicked ? (<button className="add-category btn btn-primary" onClick={()=> handleUpdateBtn(currentCategory.categoryId)}>
                            Update
                        </button>) : (
                            <button type='button' className="add-category btn btn-primary" onClick={handleAddCategoryBtn}>
                                Add
                            </button>
                        )
                    }

                </Modal.Footer>
            </Modal>
        </div>
 
  )
}

export default CategoryForm