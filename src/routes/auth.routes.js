const { Router } = require("express");
const jwt = require("jsonwebtoken");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const routes = Router();

// Rotas
routes.get("/public", (req, res) => {
  res.status(200).send("funcionou");
});

routes.get("/private", ensureAuthenticated, (req, res) => {
  res.status(200).send("funcionou");
});

routes.get("/me", function (req, res) {
  const authHeader = req.headers.authorization;
  const auth = authHeader;
  const [, token] = auth.split(" ");

  if (!token) {
    return res
      .status(401)
      .json({ auth: false, message: "Nenhum token informado." });
  }

  console.log(token);
  jwt.verify(token, process.env.AUTH_SECRET, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Falha ao autenticar o token." });
    }

    res.status(200).json(decoded);
  });
});

// Exporta
module.exports = routes;
