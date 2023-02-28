const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken'); 
const util = require('util');
const customError = require('./customError')
const saltRounds = 10;

const secretKey =  'asdsakfds';

const signAsync = util.promisify(jwt.sign); 
const verifyAsync = util.promisify(jwt.verify);
const hashPassword = async (password) => {
    return bcrypt.hash(password,saltRounds)//return promise
}
const comparePassword = async (password, hash) => {
        const isCorrectPassword = await bcrypt .compare(password,hash);
        if(! isCorrectPassword) throw customError(401,"invalid username or password")
}

const authorizeUser = async (id,token) => { 
    const payload = await verifyAsync(token, secretKey); 
    if (payload.id !== id) throw customError(403, 'you are not authorized to perform this action!'); 
};

//generate user token 
const userToken = async (id) => { 
    const token=await signAsync({ id }, secretKey,{ expiresIn: '4h' }); 
    return token; 
};
module.exports = {hashPassword, comparePassword,authorizeUser,userToken }