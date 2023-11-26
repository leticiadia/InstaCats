const User = require("../models/User");

const bcrypt = require("bcryptjs");

module.exports = class UserController {
  static async register(request, response) {
    const { name, email, password, confirmPassword } = request.body;

    if (password != confirmPassword) {
      request.flash("message", "Senha não conferem. Tente novamente!");
      return response.render("layouts/main");
    }

    const checkIfUserExists = await User.findOne({ where: { email: email } });

    if (checkIfUserExists) {
      request.flash("message", "O e-mail está em uso!");
      return response.render("layouts/main");
    }

    const salt = bcrypt.genSaltSync(10);
    const hasedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hasedPassword,
    };

    try {
      const createUser = await User.create(user);

      request.session.userId = createUser.id;

      request.flash("message", "Cadastro realizado com sucesso");

      request.session.save(() => {
        response.redirect("/");
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async login(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      request.flash("message", "Usuário não encontrado");
      return response.render("layouts/main");
    }

    request.session.userId = user.id;

    request.flash("message", `Seja bem-vindo ${user.name}`);
    request.session.save(() => {
      return response.redirect("/");
    });
  }

  static logout(request, response) {
    request.session.destroy();

    return response.redirect("/");
  }
};
