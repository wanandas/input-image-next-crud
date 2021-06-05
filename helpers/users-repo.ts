import fs from 'fs'

let users = require('data/users.json')

export interface IUser {
  id?: number
  fname: string
  lname: string
  picture: string
}

export const usersRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  deleteAll
}

function getAll() {
  return users
}

function getById(id) {
  return users.find((x) => x.id.toString() === id.toString())
}

function create({ fname, lname, picture }) {
  const user: IUser = { fname, lname, picture }

  // generate new user id
  user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1

  users.push(user)
  saveData()
}

function update(id, { fname, lname, picture }) {
  const params = { fname, lname, picture }
  const user = users.find((x) => x.id.toString() === id.toString())

  user.dateUpdated = new Date().toISOString()

  Object.assign(user, params)
  saveData()
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  users = users.filter((x) => x.id.toString() !== id.toString())
  saveData()
}
function deleteAll() {
  users = []
  saveData()
}

function saveData() {
  fs.writeFileSync('data/users.json', JSON.stringify(users))
}
