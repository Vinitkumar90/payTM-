const express = require("express")
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()) //parse json 

const rootRouter = require("./rotues/index")


app.use("/api/v1",rootRouter)



app.listen(3000,()=>{
    console.log("app listening on port 3k");
})