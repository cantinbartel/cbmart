import req from 'express/lib/request'
import { JsonWebTokenError } from 'jsonwebtoken'
import { getUserProfile } from '../../controllers/userController'

let request = {
    user : {
        _id: 'userId',
        name: 'userName',
        email: 'userEmail',
        isAdmin: true
    }
}
const response = {
    json : function () {
        return {
            _id: request.user._id,
            name: request.user.name,
            email: request.user.email,
            isAdmin: request.user.isAdmin,
        }
    }
}

it('it should send a res.json object with the user information', () => {
    getUserProfile(request, response)
    expect(response.json())
})

