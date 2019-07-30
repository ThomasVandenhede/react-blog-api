import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { create, index, show, update, destroy } from "./controller";
import { schema } from "./model";
export { default as FriendRequest, schema } from "./model";

const router = new Router();
const { from, to, status } = schema.tree;

/**
 * @api {post} /friend_requests Create friend request
 * @apiName CreateFriendRequest
 * @apiGroup FriendRequest
 * @apiParam from Friend request's from.
 * @apiParam to Friend request's to.
 * @apiParam status Friend request's status.
 * @apiSuccess {Object} friendRequest Friend request's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Friend request not found.
 */
router.post("/", body({ from, to, status }), create);

/**
 * @api {get} /friend_requests Retrieve friend requests
 * @apiName RetrieveFriendRequests
 * @apiGroup FriendRequest
 * @apiUse listParams
 * @apiSuccess {Object[]} friendRequests List of friend requests.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/", query(), index);

/**
 * @api {get} /friend_requests/:id Retrieve friend request
 * @apiName RetrieveFriendRequest
 * @apiGroup FriendRequest
 * @apiSuccess {Object} friendRequest Friend request's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Friend request not found.
 */
router.get("/:id", show);

/**
 * @api {put} /friend_requests/:id Update friend request
 * @apiName UpdateFriendRequest
 * @apiGroup FriendRequest
 * @apiParam from Friend request's from.
 * @apiParam to Friend request's to.
 * @apiParam status Friend request's status.
 * @apiSuccess {Object} friendRequest Friend request's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Friend request not found.
 */
router.put("/:id", body({ status }), update);

/**
 * @api {delete} /friend_requests/:id Delete friend request
 * @apiName DeleteFriendRequest
 * @apiGroup FriendRequest
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Friend request not found.
 */
router.delete("/:id", destroy);

export default router;
