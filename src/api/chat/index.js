import { Router } from "express";
import { index } from "./controller";
import { middleware as query } from "querymen";
export { default as ChatMessage, schema } from "./model";

const router = new Router();

/**
 * @api {get} /chat Retrieve chat messages
 * @apiName RetrievePosts
 * @apiGroup ChatMessage
 * @apiUse listParams
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/", query(), index);

export default router;
