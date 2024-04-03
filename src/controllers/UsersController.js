const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");
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
}

module.exports = UsersController;
