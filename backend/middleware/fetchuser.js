const jwt = require('jsonwebtoken');

const fetchuser = (req, res, next)=>{
const token = req.header("auth-token")
if(!token){
    return res.status(404).send({err: "Please enter a valid token"})
}
try {
    const data = jwt.verify(token, 'shhhhh')
req.user = data.user
next()
} catch (error) {
    return res.status(404).send({err: "Please enter a valid token"})
}

}
module.exports = fetchuser;