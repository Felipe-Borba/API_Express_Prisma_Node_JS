const { Router } = require("express");
const UsersController = require("../controllers/UsersController");

const usersRoutes = Router();

// Controller
const usersController = new UsersController();

// Rotas
usersRoutes.post("/create", usersController.create);
usersRoutes.post("/login", usersController.login);

// Exporta
module.exports = usersRoutes;
