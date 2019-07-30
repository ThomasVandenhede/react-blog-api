import { success, notFound } from "../../services/response/";
import { Post } from ".";

export const create = (
  {
    bodymen: {
      body: { body, userId, authorId }
    }
  },
  res,
  next
) =>
  Post.create({ body, user: userId, author: authorId })
    .then(post =>
      post
        .populate("user")
        .populate("author")
        .execPopulate()
    )
    .then(post => post.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Post.find(query, select, cursor)
    .then(posts => posts.map(post => post.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Post.findById(params.id)
    .then(notFound(res))
    .then(post => (post ? post.view() : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Post.findById(params.id)
    .then(notFound(res))
    .then(post => (post ? post.remove() : null))
    .then(success(res, 204))
    .catch(next);
