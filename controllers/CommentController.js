const Comment = require("../models/Comment");

module.exports = class CommentController {
  static async create(request, response) {
    const { publicationId, comment } = request.body;

    const publication = {
      comment,
      userId: request.session.userId,
      publicationId,
    };

    try {
      const createComment = await Comment.create(publication);

      request.session.userId = createComment.id;

      request.flash("messages", "Comentário enviado com sucesso!");
      request.session.save(() => {
        return response.redirect("/");
      });
    } catch (error) {
      console.error(error);
    }
  }
};
