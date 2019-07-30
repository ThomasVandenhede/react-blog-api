import { success, notFound } from "../../services/response/";
import { FriendRequest } from ".";

export const create = ({ bodymen: { body } }, res, next) =>
  FriendRequest.create(body)
    .then(friendRequest => friendRequest.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  FriendRequest.find(query, select, cursor)
    .populate("from", "to")
    .exec()
    .then(friendRequests =>
      friendRequests.map(friendRequest => friendRequest.view())
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  FriendRequest.findById(params.id)
    .populate("from", "to")
    .exec()
    .then(notFound(res))
    .then(friendRequest => (friendRequest ? friendRequest.view() : null))
    .then(success(res))
    .catch(next);

export const update = (
  {
    bodymen: {
      body: { status }
    },
    params
  },
  res,
  next
) =>
  FriendRequest.findById(params.id)
    .then(notFound(res))
    .then(friendRequest =>
      friendRequest ? Object.assign(friendRequest, { status }).save() : null
    )
    .then(friendRequest => (friendRequest ? friendRequest.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  FriendRequest.findById(params.id)
    .then(notFound(res))
    .then(friendRequest => (friendRequest ? friendRequest.remove() : null))
    .then(success(res, 204))
    .catch(next);
