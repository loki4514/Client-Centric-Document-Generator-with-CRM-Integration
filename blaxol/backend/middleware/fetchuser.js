const jwt = require('jsonwebtoken')
const JWT_SECRET = 'criticalai'
const fetchuser = (req,res,next) => {
    // get the user from jwt token and add the user 
    const token = req.header('auth-token')

    if (!token) {
        res.status(401).send({error : "Access Denied 123"})
    }

    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.admin = data.admin
        next()
    } catch (error) {
        res.status(401).send({error : "Please authenticate using a valid token"})
    }

    
}

module.exports = fetchuser