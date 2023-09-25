import jwt from "jsonwebtoken"

module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

	   next();
   } catch(error) {
       res.status(401).json({ error });
   }
};