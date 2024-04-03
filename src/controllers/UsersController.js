const { PrismaClient } = require("@prisma/client");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const prisma = new PrismaClient();

class UsersController {
  async create(request, response) {
    try {
      const { name, email, password } = request.body;

      const hashedPassword = await hash(password, 8);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      response.json(user);
    } catch (err) {
      return response.status(409).send();
    }
  }

  async login(request, response) {
    try {
      const { email, password } = request.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return response.status(403).send("senha ou email incorreto");
      }

      const passwordMatched = await compare(password, user.password);

      if (!passwordMatched) {
        return response.status(403).send("senha ou email incorreto");
      }

      const token = sign({ user }, process.env.AUTH_SECRET, {
        expiresIn: 86400, // expira em 24 horas
      });

      response.json({ token });
    } catch (err) {
      return response.status(409).send();
    }
  }
}

module.exports = UsersController;
