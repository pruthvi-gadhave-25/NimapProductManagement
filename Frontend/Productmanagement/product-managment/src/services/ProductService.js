//get
export async function getProducts(){
  
    const url = "http://localhost:5278/api/Product" ;

    try{
        const response =await fetch(url ,{
            method : "GET" ,
            headers :{ 
                'Content-Type' : 'application/json' ,
            },
        }) ;

        if(!response.ok){
            throw new Error("reposnse is not OK" , response.status) ;
        }
        const json = await response.json();
    return json ;
    }
    catch (error) {
        console.error(error.message);
      }
}

//add 
export async function addProduct(productData){
    const url = "http://localhost:5278/api/Product" ;

    try{
        const response =await fetch(url , {
            method : "POST" ,
            headers :{
                'Content-Type' : 'application/json' ,
            },
            body : JSON.stringify(productData)  ,
        }) ;

        if(!response.ok){
            throw new Error("reposnse is not OK" , response.status) ;
        }

    }
    catch (error) {
        console.error(error.message);
      }
}


//update
export async function updateProduct(productData , id){
        
 
    const url = `http://localhost:5278/api/Product/${id}` ;

    try{
        const response =await fetch(url , {
            method : "PUT" ,
            headers :{ 
                'Content-Type' : 'application/json' ,
            },
            body : JSON.stringify(productData)  ,
        }) ;

        if(!response.ok){
            throw new Error("reposnse is not OK" , response.status) ;
        }
      
    }
    catch (error) {
        console.error(error.message);
      }
}


//delete
export async function deleteProduct(id){
    const url = `http://localhost:5278/api/Product/${id}` ;

    try{
        const response =await fetch(url , {
            method : "DELETE" ,
        }) ;

        if(!response.ok){
            throw new Error("Failed to Delete , Resonse Not Ok" , response.status) ;
        }
    //     const json = await response.json();
    // return json ;
    }
    catch (error) {
        console.error(error.message);
      }
}