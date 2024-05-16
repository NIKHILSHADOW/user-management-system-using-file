
const userRouter = require('./users/userRouter.js')

const fs = require('fs')
const express = require('express')

const users = require('./MOCK_DATA.json')


const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }))


const { stringify } = require('querystring');


app.listen(PORT, () => console.log(`server listening on port : ${PORT}`))

app
    .route('/api/users')
    .get((req, res) => {
        return res.json(users)
    })
    .post((req, res) => {
        users.push({ id: users.length + 1, ...req.body });

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            if (err) {
                res.end("error")
            }

            return res.json(users[users.length - 1])
        })

    })

app
    .route('/api/users/:id')
    .patch((req, res) => {

        const currUser = { id: Number(req.params.id), ...req.body }
        const actualUser = users.find(user => user.id === currUser.id)

        if (currUser) {
            if (currUser.first_name) {
                actualUser.first_name = currUser.first_name;
            }
            if (currUser.last_name) {
                actualUser.last_name = currUser.last_name;
            }
            if (currUser.email) {
                actualUser.email = currUser.email
            }
            if (currUser.gender) {
                actualUser.gender = currUser.gender
            }
        }

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
            if (err) throw err
            return res.json(users.find(user => user.id === Number(req.params.id)))
        })

    })
    .get((req, res) => {
        let id = Number(req.params.id)
        let user = users.find(user => user.id === id)
        return res.json(user)
    })
    .delete((req, res) => {
        const newUsers = users.filter(user => user.id !== Number(req.params.id))
        console.log(newUsers.length)
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(newUsers), (err, data) => {
            if (err) {
                res.end("error!!")
            }
            return res.end("Deleted")
        })
    })

// app.use("/api/users", userRouter)

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

