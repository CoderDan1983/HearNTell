const User = require('../model/User');
const Playlist = require('../model/Playlist');

const bcrypt = require('bcrypt');
const handleNewUser = async (req, res) => {
    console.log('registerController, handleNewUser recieved: ', req.body);
    const { email, name, pwd, advertise } = req.body; //* keep name in here!?!
    if (!email || !pwd) return res.status(400).json({ 'message': 'Email and password are required.' });
    
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict 
    
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const createdUser = await User.create({
            "username": email,
            name,
            //"roles": { "User": 2001, "Editor": 1984 },
            //"roles": { "User": 2001 }, //inserted by schema so unneeded ^_^
            "password": hashedPwd
        });

        // console.log(createdUser);

        const playlist = await Playlist.create({
            user_id: createdUser._id,
            story_ids: [], //* Use the arraymove function reorder the ids when story order is changed by the user
            title: 'queue',
            description: 'the queue',
            is_queue: true,
            is_creator_list: false,
        });
        // console.log('playlist is: ', playlist);

        res.status(201).json({ 'success': `New user ${ email } created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };