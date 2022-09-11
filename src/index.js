require("dotenv").config()
const express = require("express")
const spotify = require("./lib/spotify")
const app = express()


app.get("/spotify", async (req,res)=>{
    try{
        const params = req.query
        const result = await spotify.recommendation(params)
        return res.json(result)
    }catch(error){
        console.log(error)
    }
    
})

app.listen(3000)