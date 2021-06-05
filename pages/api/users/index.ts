import { usersRepo } from 'helpers'
import type { NextApiRequest, NextApiResponse } from 'next'

export default handler

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getUsers()
    case 'POST':
      return createUser()
    case 'DELETE':
      return deleteAllUser()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  function getUsers() {
    const users = usersRepo.getAll()
    return res.status(200).json(users)
  }

  function createUser() {
    try {
      usersRepo.create(req.body)
      return res.status(200).json({})
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }

  function deleteAllUser() {
    usersRepo.deleteAll()
    return res.status(200).json({})
  }
}
