import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { UserPost } from '.'

const app = () => express(apiRoot, routes)

let userPost

beforeEach(async () => {
  userPost = await UserPost.create({})
})

test('POST /user/posts 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ title: 'test', author: 'test', content: 'test', timestamp: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.author).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.timestamp).toEqual('test')
})

test('GET /user/posts 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /user/posts/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${userPost.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(userPost.id)
})

test('GET /user/posts/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /user/posts/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${userPost.id}`)
    .send({ title: 'test', author: 'test', content: 'test', timestamp: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(userPost.id)
  expect(body.title).toEqual('test')
  expect(body.author).toEqual('test')
  expect(body.content).toEqual('test')
  expect(body.timestamp).toEqual('test')
})

test('PUT /user/posts/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ title: 'test', author: 'test', content: 'test', timestamp: 'test' })
  expect(status).toBe(404)
})

test('DELETE /user/posts/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${userPost.id}`)
  expect(status).toBe(204)
})

test('DELETE /user/posts/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
