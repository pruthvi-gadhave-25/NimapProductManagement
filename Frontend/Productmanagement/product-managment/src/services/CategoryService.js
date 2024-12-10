export const getCategories = async () => {
    const url ='http://localhost:5278/api/Category' ;
      try{
        const response =await fetch(url ,{
            method : "GET" ,
            headers :{ 
                'Content-Type' : 'application/json' ,
            },
        }) ;
debugger ;
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
export async function addCategory(categoryData){
    const url = "http://localhost:5278/api/Category" ;

    try{
        const response =await fetch(url , {
            method : "POST" ,
            headers :{
                'Content-Type' : 'application/json' ,
            },
            body : JSON.stringify(categoryData)  ,
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
export async function updateCategory(categoryData , id){
        
    
    const url = `http://localhost:5278/api/Category/${id}` ;

    try{
        const response =await fetch(url , {
            method : "PUT" ,
            headers :{ 
                'Content-Type' : 'application/json' ,
            },
            body : JSON.stringify(categoryData)  ,
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
export async function deleteCategory(id){
    const url = `http://localhost:5278/api/Category/${id}` ;

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