# react-blog-api v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [ChatMessage](#chatmessage)
	- [Retrieve chat messages](#retrieve-chat-messages)
	
- [FriendRequest](#friendrequest)
	- [Create friend request](#create-friend-request)
	- [Delete friend request](#delete-friend-request)
	- [Retrieve friend request](#retrieve-friend-request)
	- [Retrieve friend requests](#retrieve-friend-requests)
	- [Update friend request](#update-friend-request)
	
- [PasswordReset](#passwordreset)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	- [Verify token](#verify-token)
	
- [Post](#post)
	- [Create post](#create-post)
	- [Delete post](#delete-post)
	- [Retrieve post](#retrieve-post)
	- [Retrieve posts](#retrieve-posts)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve user posts](#retrieve-user-posts)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# ChatMessage

## Retrieve chat messages



	GET /chat


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# FriendRequest

## Create friend request



	POST /friend_requests


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| from			| 			|  <p>Friend request's from.</p>							|
| to			| 			|  <p>Friend request's to.</p>							|
| status			| 			|  <p>Friend request's status.</p>							|

## Delete friend request



	DELETE /friend_requests/:id


## Retrieve friend request



	GET /friend_requests/:id


## Retrieve friend requests



	GET /friend_requests


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update friend request



	PUT /friend_requests/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| from			| 			|  <p>Friend request's from.</p>							|
| to			| 			|  <p>Friend request's to.</p>							|
| status			| 			|  <p>Friend request's status.</p>							|

# PasswordReset

## Send email



	POST /password-resets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address to receive the password reset token.</p>							|
| link			| String			|  <p>Link to redirect user.</p>							|

## Submit password



	PUT /password-resets/:token


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Verify token



	GET /password-resets/:token


# Post

## Create post



	POST /posts


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| body			| 			|  <p>Post's body.</p>							|
| userId			| 			|  <p>Post's userId.</p>							|
| authorId			| 			|  <p>Post's authorId.</p>							|

## Delete post



	DELETE /posts/:id


## Retrieve post



	GET /posts/:id


## Retrieve posts



	GET /posts


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| username			| String			| **optional** <p>User's username.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve user posts



	GET /users/:id/posts


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| username			| String			| **optional** <p>User's username.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| firstName			| String			| **optional** <p>User's firstName.</p>							|
| lastName			| String			| **optional** <p>User's lastName.</p>							|
| gender			| String			| **optional** <p>User's gender.</p>							|
| description			| String			| **optional** <p>User's description.</p>							|


