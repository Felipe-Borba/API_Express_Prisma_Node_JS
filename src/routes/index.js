const { Router } = require("express");
const usersRoutes = require("./users.routes");
const authRoutes = require("./auth.routes");

const routes = Router();

// Rotas dos controllers
routes.use("/users", usersRoutes);
routes.use("/auth", authRoutes);

module.exports = routes;
