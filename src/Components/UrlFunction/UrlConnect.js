require("dotenv").config()

function backendUrl(){
    try{
      return  process.env.URI
    }catch(error){
        throw error;
    }
}
module.exports= {backendUrl}