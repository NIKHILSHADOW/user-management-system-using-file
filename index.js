
const userRouter = require('./users/userRouter.js')

const fs = require('fs')
const express = require('express')

const users = require('./MOCK_DATA.json')


const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }))


const { stringify } = require('querystring');


app.listen(PORT, () => console.log(`server listening on port : ${PORT}`))

app.use("/api/users", userRouter)

// app.get("/api/users", (req, res) => {
//     return res.json(users)
// })

// app.get("/api/users/:id", (req, res) => {
//     let id = Number(req.params.id)
//     let user = users.find(user => user.id === id)
//     return res.json(user)
// })

// app.post("/api/users", (req, res) => {
//     users.push({ id: users.length + 1, ...req.body });

// fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
//     if (err) {
//         res.end("error")
//     }

//     return res.json(users[users.length - 1])
// })

// })

