import mongoose from "mongoose";
mongoose

.connect(process.env.MONGODB)
.then((dato)=>{
    console.log("Esta conectado a la base de datos");
}).catch((error)=>{
    console.log("No se conecto a la base de datos");
});