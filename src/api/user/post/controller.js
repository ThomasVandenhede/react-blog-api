import { success, notFound } from "../../../services/response/";
import { UserPost } from ".";

export const create = ({ bodymen: { body } }, res, next) =>
  UserPost.create(body)
    .then(userPost => userPost.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  UserPost.count(query)
    .then(count =>
      UserPost.find(query, select, cursor).then(userPosts => ({
        count,
        rows: userPosts.map(userPost => userPost.view())
      }))
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  UserPost.findById(params.id)
    .then(notFound(res))
    .then(userPost => (userPost ? userPost.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  UserPost.findById(params.id)
    .then(notFound(res))
    .then(userPost => (userPost ? Object.assign(userPost, body).save() : null))
    .then(userPost => (userPost ? userPost.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  UserPost.findById(params.id)
    .then(notFound(res))
    .then(userPost => (userPost ? userPost.remove() : null))
    .then(success(res, 204))
    .catch(next);
