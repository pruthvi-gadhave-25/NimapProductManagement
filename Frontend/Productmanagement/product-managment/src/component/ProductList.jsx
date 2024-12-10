import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import FormModal from './FormModal';

function ProductList({ handleOpen, handleEdit, show, handleChange, handleCateoryChange, isAdded,
    handleUpdate,
    handleDelete,
    handleAdd,
    currentProduct,
    isEditClicked,
    handleClose,
    showEdit
}) {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const fetchProducts = async (pageNum, pageSize) => {
        try {
            setLoading(true);
            setError("");
            const response = await fetch(
                `http://localhost:5278/api/Product/GetPaginatedProducts/${pageNum}/${pageSize}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch products.");
            }

            const data = await response.json();
           console.log(data.length);

            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    //page preve and next 
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    useEffect(() => {
        fetchProducts(currentPage, pageSize);
    }, [currentPage, pageSize, isAdded]);


    return (
        <div className=' ps-4'>
            <div className='w-50 d-flex  justify-content-between p-3 '>
                <h4 className='pb-2  mb-0'>Product List</h4>
                <Link to="/products/form/add" className=' btn btn-primary rounded-0' onClick={handleOpen}>Add Product</Link>
            </div>


            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {products.length === 0 ? (
                        <p>No Data available.</p>
                    ) : (
                        <>
                            <table className='table table-bordered table-striped p-3 w-50'>
                                <thead className=' p-2'>
                                    <tr className='p-3'>
                                        <th>ProductId</th>
                                        <th>ProductName</th>
                                        <th>CategoryId</th>
                                        <th>CategoryName</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (

                                        <tr key={product.productId} id={product.productId}>
                                            <td className='p-2'>{product.productId}</td>
                                            <td className='p-2'>{product.productName}</td>
                                            <td className='p-2'>{product.categoryId}</td>
                                            <td className='p-2'>{product.categoryName}</td>
                                            <td className='p-2'>

                                                <button className='btn btn-primary btn-sm' onClick={() => showEdit(product)}>Edit</button>

                                                <span className=' px-2'>

                                                    <button className='btn  btn-danger btn-sm ' onClick={() => handleDelete(product.productId)}>Delete</button>
                                                </span>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <FormModal
                                handleChange={handleChange}
                                handleClose={handleClose}
                                isEditClicked={isEditClicked}
                                currentProduct={currentProduct}
                                //   products={products}
                                handleUpdate={handleUpdate}
                                handleAdd={handleAdd}
                                show={show}
                                handleCateoryChange={handleCateoryChange}

                            />
                        </>
                    )}

                    <div className='mt-2 d-flex justify-content-between w-50 pb-3'>
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1 || loading}
                            className='btn btn-sm-success'
                        >
                            <i className="bi bi-chevron-left "></i>
                            Previous

                        </button>
                        <span>Page: {currentPage}</span>
                        <button onClick={handleNextPage} disabled={loading || products.length < 10} className='btn btn-success'>
                            Next <i className="bi bi-chevron-right "></i>
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}

export default ProductList