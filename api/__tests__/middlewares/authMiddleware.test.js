import { protect } from '../../middlewares/authMiddleware'
import User from '../../models/userModel'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
    ...jest.requireActual('jsonwebtoken'),
    verify: jest.fn().mockReturnValue({foo: 'bar'})
}))

jest.mock('../../models/userModel')

const req = {
    headers : {
        authorisation : "Bearer token"
    },
    user : {
        _id: 'userId',
        name: 'userName',
        email: 'userEmail',
        isAdmin: true
    }
}
const mockResponse = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
}
const response = mockResponse()
const next = jest.fn((x) => x)

describe('protect middleware', () => {
    it('should send a 401 status when authorisation failed or no token', async () => {

        try {
            const { verify } = jwt
            verify.mockReturnValue({ verified: 'true' })
            await User.findById.mockImplementationOnce(() => ({
                _id: 'userId',
                name: 'userName',
                email: 'userEmail',
                password: 'password',
                isAdmin: true
            }))
            expect(req.user).toMatchObject({
                _id: 'userId',
                name: 'userName',
                email: 'userEmail',
                isAdmin: true
            })
            next()
        } catch(e) {
            expect(response.status).toHaveBeenCalledWith(401)
        }
    })
})

describe('admin middleware', () => {
    it('should return a 401 response is user.isAdmin is false', () => {
        if (req.user && req.user.isAdmin) {
            next()
        } else {
            expect(response.status).toHaveBeenCalledWith(401)
        }
    })
})
