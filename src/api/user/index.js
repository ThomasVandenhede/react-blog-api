import { Router } from "express";
import { middleware as query } from "querymen";
import bodymen from "bodymen";
import {
  password as passwordAuth,
  master,
  token
} from "../../services/passport";
import {
  index,
  showMe,
  show,
  showPosts,
  searchUsers,
  create,
  update,
  updatePassword,
  destroy
} from "./controller";
import { schema } from "./model";
export { default as User, schema } from "./model";

const router = new Router();
const {
  email,
  password,
  username,
  picture,
  role,
  firstName,
  lastName,
  gender,
  description
} = schema.tree;

/**
 * @api {get} /users Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/", token({ required: true }), query(), index);

/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
 */
router.get("/me", token({ required: true }), showMe);

/**
 * @api {get} /users/search Search users
 * @apiName SearchRsers
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
 */
router.get("/search", token({ required: true }), query(), searchUsers);

// router.get("/me/friends/:friendId", token({ require: true }), showMyFriend);

/**
 * @api {get} /users/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiPermission public
 * @apiSuccess {Object} user User's data.
 * @apiError 404 User not found.
 */
router.get("/:id", show);

/**
 * @api {get} /users/:id/posts Retrieve user posts
 * @apiName RetrieveUserPosts
 * @apiGroup User
 * @apiPermission public
 * @apiSuccess {Object[]} posts List of posts.
 */
router.get("/:id/posts", query(), showPosts);

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email User's email.
 * @apiParam {String{6..}} password User's password.
 * @apiParam {String} [username] User's username.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {String=user,admin} [role=user] User's role.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */
router.post(
  "/",
  master(),
  bodymen.middleware({
    email,
    password,
    username,
    picture,
    role,
    firstName,
    lastName,
    gender,
    description
  }),
  create
);

/**
 * @api {put} /users/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [username] User's username.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {String} [firstName] User's firstName.
 * @apiParam {String} [lastName] User's lastName.
 * @apiParam {String} [gender] User's gender.
 * @apiParam {String} [description] User's description.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put(
  "/:id",
  token({ required: true }),
  bodymen.middleware({ firstName, lastName, gender, picture, description }),
  update
);

/**
 * @api {put} /users/:id/password Update password
 * @apiName UpdatePassword
 * @apiGroup User
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String{6..}} password User's new password.
 * @apiSuccess (Success 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user access only.
 * @apiError 404 User not found.
 */
router.put(
  "/:id/password",
  passwordAuth(),
  bodymen.middleware({ password }),
  updatePassword
);

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 */
router.delete("/:id", token({ required: true, roles: ["admin"] }), destroy);

export default router;
