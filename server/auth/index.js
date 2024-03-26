const jwt = require("jsonwebtoken")

// returns an object containing authentication-related methods
function authManager() { 
    // middleware function for verifying JWT tokens 
    verify = function (req, res, next) {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({
                    loggedIn: false,
                    user: null,
                    errorMessage: "Unauthorized"
                })
            }

            const verified = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = verified.userId;

            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({
                errorMessage: "Unauthorized"
            });
        }
    }

    test_method = function (req, res, next) {
        
    }

    // method for generating JWT for a given user
    signToken = function (user) {
        return jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);
    }

    return this;
}

// export as module
const auth = authManager();
module.exports = auth;