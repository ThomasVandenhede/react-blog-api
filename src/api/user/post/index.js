import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { create, index, show, update, destroy } from "./controller";
import { schema } from "./model";
export { default as UserPost, schema } from "./model";

const router = new Router();
const { title, author, content, timestamp } = schema.tree;

/**
 * @api {post} /user/posts Create user post
 * @apiName CreateUserPost
 * @apiGroup UserPost
 * @apiParam title User post's title.
 * @apiParam author User post's author.
 * @apiParam content User post's content.
 * @apiParam timestamp User post's timestamp.
 * @apiSuccess {Object} userPost User post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User post not found.
 */
router.post("/", body({ title, author, content, timestamp }), create);

/**
 * @api {get} /user/posts Retrieve user posts
 * @apiName RetrieveUserPosts
 * @apiGroup UserPost
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of user posts.
 * @apiSuccess {Object[]} rows List of user posts.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/", query(), index);

/**
 * @api {get} /user/posts/:id Retrieve user post
 * @apiName RetrieveUserPost
 * @apiGroup UserPost
 * @apiSuccess {Object} userPost User post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User post not found.
 */
router.get("/:id", show);

/**
 * @api {put} /user/posts/:id Update user post
 * @apiName UpdateUserPost
 * @apiGroup UserPost
 * @apiParam title User post's title.
 * @apiParam author User post's author.
 * @apiParam content User post's content.
 * @apiParam timestamp User post's timestamp.
 * @apiSuccess {Object} userPost User post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User post not found.
 */
router.put("/:id", body({ title, author, content, timestamp }), update);

/**
 * @api {delete} /user/posts/:id Delete user post
 * @apiName DeleteUserPost
 * @apiGroup UserPost
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 User post not found.
 */
router.delete("/:id", destroy);

export default router;
