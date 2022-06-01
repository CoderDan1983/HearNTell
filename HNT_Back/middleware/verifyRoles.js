const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles;



// const verifyRoles = (...allowedRoles) => {
//     //console.log('this is run when downloading veryifyRoles module.')
//     return (req, res, next) => {
//         console.log('this is NOT run on downloading verifyRoles module.')
//         if (!req?.roles) return res.sendStatus(401);
//         const rolesArray = [...allowedRoles];

//         console.log('these role sets should match: ')
//         console.log(rolesArray);
//         console.log(req.roles);
//         //* allowedRolls in an array of roles that are allowed to visit this route.
//         //* we map through req.roles and see if each roll is included in the rolesArray
//         //* (returns an array of booleans).  Then .find checks to see if we have a true (match)
//         //* and returns the first match.  If we didn't have any of the allowable roles,
//         //* we'll end up with falsy and return a 401!
//         const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
//         if (!result) return res.sendStatus(401); 
//         next();
//     }
// }

// module.exports = verifyRoles;