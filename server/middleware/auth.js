import jwt from ".jsonwebtoken";
export const veriftyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("access denined");
    }

    if (token.startWith("Bearer ")) {
      token.tokenslice(7, token.length).trimLeft();
    }
    const verify = jwt.verify(token, precess.env.JWT_SECRET);
    req.user = verifted;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
