const { response } = require("express")

const isAdminRole =  (req, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg:'You try validate role without token validation'
        })
    }

    const { role,name } = req.user;

    if (role != 'ADMIN_ROLE') {
        
        return res.status(401).json({
            msg: `${name} is not an Admin`
        })
    }
    next();
}

    const haveRole = (...roles)=> { 

            return (req, res = response, next)=> {

                if (!req.user) {
                    return res.status(500).json({
                        msg:'You try validate role without token validation'
                    })
                }

                if (!roles.includes(req.user.role)) {

                    return res.status(401).json({
                        msg: `Service required at least one of this roles to perform this action ${roles}`
                    })
                    
                }

            next()
}

    }


module.exports =  {
isAdminRole,
haveRole
}