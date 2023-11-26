const Publication = require("../models/Publication");
const Comment = require("../models/Comment");

module.exports = class PublicationController {
  static async showPublications(request, response) {
    try {
      const publications = await Publication.findAll({ raw: true });

      return response.render("publications/home", { publications });
    } catch (error) {
      console.error(error);
    }
  }
};
