const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    // console.log('refreshTokenController!')
    // console.log(cookies);
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles).filter((role)=> role);
            const accessToken = jwt.sign(
                // { "username": decoded.username }, //# oldcode before multiple roles(?) ^_^
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "user_id": decoded.user_id,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10m' }
            );
            res.json({ accessToken }); //roles already in access token ^_^
        }
    );
}

module.exports = { handleRefreshToken }