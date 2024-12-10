import React, { useEffect, useState } from 'react'
import CategoryForm from './CategoryForm';
import { addCategory, deleteCategory, updateCategory } from '../services/CategoryService';


function CategoryList() {
  const [categories, setCategories] = useState([]);
  const[currentCategory ,setCurrentcategory ]= useState( null) ;
  const [show ,setShow] =useState(false) ;
  const[isEditClicked ,setIsEditClicked ] = useState(false) ;
  const[currentProduct ,setCurrentProduct] = useState() ;
  const [isCatAdded ,setIsCatAdded] = useState(false) ; 

  const handleOpen = () => {
    debugger ;
    setShow(true);
    setCurrentProduct(null) ;
    setIsEditClicked(false) ;
  };
  
  const handleClose = () => {
    setShow(false) ;
    setCurrentcategory(null) ;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
   
    setCurrentcategory((prevState) => ({
      ...prevState,
      [name]: value
    }));
    console.log(currentCategory?.categoryName);
  };
  

  //UPDATE 
  const handleUpdate = async (id ) => {
    console.log();
    const categoryData = {
      ...currentCategory ,
      
      categoryName : currentCategory.categoryName 
    }
    console.log(categoryData);
    
     await  updateCategory(categoryData ,currentCategory.categoryId) ;
    setIsCatAdded((prev) => !prev);
  };

  ///EDIT BUTTON
  const handleEdit =(category) =>{
    setShow(true);
    setIsEditClicked(true) ;
    setCurrentcategory(category);
    // console.log(currentCategory);
    
  }
  

  //ADD
  const handleAdd = async () => {
    console.log(currentCategory);
    if(currentCategory==null || currentCategory.length== 0){
      return ;
    }
    else{
      await addCategory(currentCategory) ;
    }
    setIsCatAdded((prev) => !prev);
    // Your logic to handle adding a new item
  };
  

  //DELETE
  const handleDelete = async (id) => {
    console.log( "categoryId for delet",id);
   const result = window.confirm("Do you want to Delete Category ?") ;
   if(result){
   await  deleteCategory(id) ;
    setIsCatAdded((prev) => !prev);
   }
   else{
    console.log("Not Deleted ");
   }
  
  };
  const fetchCategories = async () => {

    const data = await fetch("http://localhost:5278/api/Category",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

    const repsonse = await data.json();
    console.log(repsonse)
    setCategories(repsonse);

  }

  useEffect(() => {

    fetchCategories();
  }, [])

  useEffect(() => {

    fetchCategories();
  }, [isCatAdded])
  return (
    <div>
      <div className='w-50 d-flex  justify-content-between p-3 '>
        <h4 className='pb-2 mb-0'>Category List</h4>
        <button className=' btn btn-primary rounded-0' onClick={handleOpen}>Add Category</button>
      </div>

      <div className='ps-3'>
        <table className='table w-50 table-bordered table-striped '>
          <thead>
            <tr className='p-3' >
              <th>Category Id</th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.length > 0 ? (
                categories.map((category) => (
                
                    <tr key={category.categoryId}>
                      <td className='p-2'>{category.categoryId}</td>
                      <td className='p-2'>{category.categoryName}</td>
                      <td className='p-2'>
                
                          <button className='btn btn-primary btn-sm' id={category.categoryId} onClick={()=>handleEdit(category)}>Edit</button>
            
                        <span className=' px-2'>

                          <button className='btn  btn-danger btn-sm ' onClick={ ()=>handleDelete(category.categoryId)}>Delete</button>
                        </span>

                      </td>
                    </tr>
                
                ))
              ) : (
                <>
                  <tr >
                    <td colSpan="3">No Categories Found </td>
                  </tr>
                </>
              )
            }
          </tbody>
        </table>
        <CategoryForm  
            isEditClicked={isEditClicked}
            currentCategory={currentCategory}
          handleChange={handleChange}
          handleClose={handleClose}
      
          handleUpdate= {handleUpdate}
          handleAdd={handleAdd}
        
         show ={show}
        />
      </div>
    </div>
  )
}

export default CategoryList