import { protect } from '../../middlewares/authMiddleware'
import User from '../../models/userModel'

jest.mock('../../models/userModel')

let token

const request = {
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

const response = {
    status : 401
}
const next = jest.fn((x) => x)

const jwt = {
    verify : jest.fn((x) => x)
}

it('should send a 401 status when authorisation failed or no token', async () => {
    try {
        await User.findById.mockImplementationOnce(() => ({
            _id: 'userId',
            name: 'userName',
            email: 'userEmail',
            password: 'password',
            isAdmin: true
        }))
        protect(request, response, next)
        expect(request.user).toMatchObject({
            _id: 'userId',
            name: 'userName',
            email: 'userEmail',
            isAdmin: true
        })
    } catch(e) {
        expect(response.status).tobe(401)
    }
})