import  Jwt  from "jsonwebtoken"

export const Auth = (req , res , next) => {
    const token = req.header('Authorization').substring(7)

    if(!token) {
        return res.status(401).json({ message : 'unaothorized' })
    }

    Jwt.verify(token , 'your_secret_key' ,  (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Forbidden' });
        }
    req.user = user;
    next();
    }
    )

}