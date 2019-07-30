import { Router } from "express";
import { middleware as query } from "querymen";
import bodymen from "bodymen";
import { create, index, show, destroy } from "./controller";
import { schema } from "./model";
export { default as Post, schema } from "./model";

const router = new Router();
const { body, userId, authorId } = schema.tree;

/**
 * @api {post} /posts Create post
 * @apiName CreatePost
 * @apiGroup Post
 * @apiParam body Post's body.
 * @apiParam userId Post's userId.
 * @apiParam authorId Post's authorId.
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 */
router.post("/", bodymen.middleware({ body, userId, authorId }), create);

/**
 * @api {get} /posts Retrieve posts
 * @apiName RetrievePosts
 * @apiGroup Post
 * @apiUse listParams
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/", query(), index);

/**
 * @api {get} /posts/:id Retrieve post
 * @apiName RetrievePost
 * @apiGroup Post
 * @apiSuccess {Object} post Post's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Post not found.
 */
router.get("/:id", show);

/**
 * @api {delete} /posts/:id Delete post
 * @apiName DeletePost
 * @apiGroup Post
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Post not found.
 */
router.delete("/:id", destroy);

export default router;
