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
  var token = req.headers["x-access-token"];
  if (!token) {
    return res
      .status(401)
      .send({ auth: false, message: "Nenhum token informado." });
  }

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Falha ao autenticar o token." });
    }

    res.status(200).send(decoded);
  });
});

// Exporta
module.exports = routes;
