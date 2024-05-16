

const users = require('../MOCK_DATA.json');
const fs = require('fs')

const url = '../MOCK_DATA.json';

const getAllUsers = (req, res) => {
    return res.json(users);
}

const addUser = (req, res) => {
    users.push({ "id": users.length + 1, ...req.body })
    fs.appendFile(url, users, (err) => {
        if (err) {
            res.end("error")
        }

        return res.json(users[users.length - 1])
    })

}


const getUserById = (req, res) => {
    const id = req.params.id
    return res.json(users.filter(user => user.id === Number(id)))
}

const updateUserById = (req, res) => {

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

    fs.writeFile('../MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) throw err
        return res.json(users.find(user => user.id === Number(req.params.id)))
    })

}

const deleteUserById = (req, res) => {
    users = users.filter(user => user.id !== Number(req.params.id))
    fs.writeFile('../MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if (err) {
            res.end("error!!")
        }
        return res.end("Deleted")
    })
}

module.exports = {
    addUser,
    getAllUsers,
    updateUserById,
    deleteUserById,
    getUserById
}