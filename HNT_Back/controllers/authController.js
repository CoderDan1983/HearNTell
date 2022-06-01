const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles).filter(Boolean);
        // create JWTs
        const accessToken = jwt.sign( //* as you can see, we already put roles in the access token ^_^
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10m' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' } //15s
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log('running auth...')
        console.log(result);
        console.log(roles);
        console.log('......')

        // Creates Secure Cookie with refresh token
        //{ httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }
        const options = { 
            httpOnly: true, secure: true, 
            sameSite: 'None', maxAge: 24 * 60 * 60 * 1000,
            //withCredentials: true, credentials: 'include', //Stack overflow advice #0
        }
        //res.cookie("merwin", "where?", { ...options, path: '/' })
        res.cookie('jwt', refreshToken, options );
        //console.log(res);
        // Send authorization roles and access token to user
        // console.log('preparing to send: ');
        // console.log({ roles, accessToken });
        // console.log('------------------')
        res.json({ accessToken }); //roles already sent in access token ^_^
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };



// const User = require('../model/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const handleLogin = async (req, res) => {
//     const { user, pwd } = req.body;
//     if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

//     const foundUser = await User.findOne({ username: user }).exec();
//     if (!foundUser) return res.sendStatus(401); //Unauthorized 
//     // evaluate password 
//     //* We are checking to see if the pwd sent from client, if encrypted, 
//     //* would match our encrypted version in foundUser.password (?).
//     const match = await bcrypt.compare(pwd, foundUser.password); 
//     if (match) {
//         const roles = Object.values(foundUser.roles).filter(Boolean);
//         // create JWTs
//         const accessToken = jwt.sign(
//             {
//                 "UserInfo": {
//                     "username": foundUser.username,
//                     "roles": roles
//                 }
//             },
//             process.env.ACCESS_TOKEN_SECRET,
//             { expiresIn: '10s' }
//         );
//         const refreshToken = jwt.sign(
//             { "username": foundUser.username },
//             process.env.REFRESH_TOKEN_SECRET,
//             { expiresIn: '1d' }
//         );
//         // Saving refreshToken with current user
//         foundUser.refreshToken = refreshToken;
//         const result = await foundUser.save();
//         console.log('in the authController: ');
//         console.log(result);
//         console.log(roles);
//         console.log('.......')

//         // Creates Secure Cookie with refresh token (httpOnly prevents it from being accessed by javascript hackers :) )
//         res.cookie('jwt', refreshToken);

//         // Send authorization roles and access token to user
//         res.json({ roles, accessToken }); //(unlike the refresh token, this is saved in memory.  It won't be around long anyway ;) )
//     } else {
//         res.sendStatus(401);
//     }
// }

// module.exports = { handleLogin };