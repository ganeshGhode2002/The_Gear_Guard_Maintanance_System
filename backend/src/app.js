import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.get("/", (req, res) => {
    res.send("Hello ❤️❤️❤️")
})
app.get("/health",(req,res)=>{
    res.json({
        "Message":"Everything is Working Fine👌👌👌👌"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server Started On Port ${process.env.PORT || 8080}`)
})