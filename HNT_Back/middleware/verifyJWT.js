const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    console.log('running verifyJWT');
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log('authHeader is: ' + authHeader);
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    // console.log("verifying token.  Beep boop beep!: ")
    // console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.UserInfo.username;
            req.user_id = decoded.UserInfo.user_id;
            req.roles = decoded.UserInfo.roles.filter((role)=> role);
            // console.log('reckoning: ', req.user, req.roles);
            next();
        }
    );
}

module.exports = verifyJWT;













// const jwt = require('jsonwebtoken');

// const verifyJWT = (req, res, next) => {
//     const authHeader = req.headers.authorization || req.headers.Authorization;
//     console.log('authHeader is verifyJWT is: ');
//     console.log(authHeader); //when admin imelda tries enter admin page, authHeader is undefined.
//     if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); //401 means unauthorized
//     console.log(authHeader); // Bearer token
//     const token = authHeader.split(' ')[1];
//     console.log(token)
//     jwt.verify(
//         token,
//         process.env.ACCESS_TOKEN_SECRET,
//         (err, decoded) => {
//             if (err) return res.sendStatus(403); //invalid token (ie- forbidden)
//             req.user = decoded.UserInfo.username;
//             req.roles = decoded.UserInfo.roles;
//             next();
//         }
//     );
// }

// module.exports = verifyJWT;