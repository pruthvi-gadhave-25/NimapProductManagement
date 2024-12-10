
import './App.css';
import Header from './component/Header';
import ProductList from './component/ProductList';
import CategoryList from './component/CategoryList';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './component/Home';
import { useEffect, useState } from 'react';
import FormModal from './component/FormModal';
import { getCategories } from './services/CategoryService';
import { addProduct, deleteProduct, getProducts, updateProduct } from './services/ProductService';

function App() {

  const[products ,setProducts] = useState([]) ;
  const [show , setShow] = useState(false) ;
  const[isEditClicked ,setIsEditClicked ] = useState(false) ;
  const[currentProduct ,setCurrentProduct] = useState() ; 
const[currProdId ,setCurrProdId] = useState(null) ;
const [categories , setCategories] = useState( [ ]) ;
const [isAdded ,setIsAdded] = useState(false) ; 

const navigate = useNavigate() ;


  const handleChange = (e) => {
    debugger ;
    const { name, value } = e.target;
   
    setCurrentProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
    console.log(currentProduct?.productName);
    
  };

  
  const handleCateoryChange=(e) =>{
    debugger 
        console.log(e.target.value);

        const selectedCategoryId = e.target.value;

        const selectedCategory = categories.find(
            (category) => category.categoryId.toString() === selectedCategoryId
        );
    
        setCurrentProduct((prevProduct) => ({
            ...prevProduct,
            categoryId: selectedCategoryId, // Set categoryId

        }));
        console.log(currentProduct);                
  }

  const showEdit=(product) => {
    setCurrentProduct(product) ;
    setShow(true) ;
    setIsEditClicked(true) ;
  }

  const handleOpen =() =>{
  
    setShow(true) ;
   setCurrentProduct(null);
  }
  const handleClose =() => {
    setShow(false) ;
    setIsEditClicked(false) ;
    navigate("/products") ;
  }

  const handleAdd = async () => {

    if(currentProduct == null ||  currentProduct.length == 0 || currentProduct.categoryId== null){
      return ;
    }
 console.log(currentProduct);
    const productData = {
      ...currentProduct ,
      categoryId : parseInt(currentProduct.categoryId)
    }
    console.log(productData);
    
    await addProduct(productData) ;
    setIsAdded((prev) => !prev) ;
    
  }
  
  const handleDelete =async (prodId) => {

    var result = window.confirm("Want to delete?");

    if(result){
      await deleteProduct(prodId) ;
      setIsAdded((prev) => !prev);
      console.log("deletd successfully");
      
    }
    else{
      console.log("Product not Deleted") ;
    }  
  }

  const handleUpdate =async () => {

      console.log(currentProduct);
        const productdata = {
          ...currentProduct ,
          categoryId : currentProduct.categoryId ,
          productName: currentProduct.productName ,
          productId: currentProduct.productId
        }
const currId =  currentProduct.productId ;
       await  updateProduct(productdata ,currId);
        setIsAdded((prev) => !prev);
  }

  const handleEdit =(id) => {
    debugger ;
    const currProd =  products.find( prod => prod.productId == id ) ;
    setCurrentProduct(currProd);
    setIsEditClicked(true) ;
  
  handleOpen() ;

  }



const fetchProducts = async () => {
  const data = await getProducts();
  setProducts(data);
}

useEffect(() => {

  const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
  }
  fetchCategories();

fetchProducts() ;

}, [])

  return (
    <div className="App">

    <div>
    <Header/>
    </div>
    <div>
    <Routes>
    
    <Route path='/products' element={<ProductList 
   
    showEdit={showEdit}
    handleOpen={handleOpen }  
    handleEdit={handleEdit}
      handleChange={handleChange}
      handleClose={handleClose}
      isEditClicked={isEditClicked}
      currentProduct={currentProduct}
      isAdded={isAdded}
      handleUpdate= {handleUpdate}
      handleAdd={handleAdd}
      handleDelete={handleDelete}
      show={show}
      handleCateoryChange={handleCateoryChange}
      setCurrentProduct={setCurrentProduct}
    />}></Route>
    <Route path='/category' element={<CategoryList/>}></Route>
    <Route path="/products/form/add" element={<FormModal   

    handleChange={handleChange}
      handleClose={handleClose}
      isEditClicked={isEditClicked}
      currentProduct={currentProduct}
      products={products}
      handleUpdate= {handleUpdate}
      handleAdd={handleAdd}
      show={show}
      handleCateoryChange={handleCateoryChange}
      />} />

    <Route path='/' element={Home}/>
   </Routes>
    </div>
   
    
    </div>
  );
}

export default App;
