import { Post } from '.'

let post

beforeEach(async () => {
  post = await Post.create({ title: 'test', content: 'test', author: 'test', timestamp: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = post.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(post.id)
    expect(view.title).toBe(post.title)
    expect(view.content).toBe(post.content)
    expect(view.author).toBe(post.author)
    expect(view.timestamp).toBe(post.timestamp)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = post.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(post.id)
    expect(view.title).toBe(post.title)
    expect(view.content).toBe(post.content)
    expect(view.author).toBe(post.author)
    expect(view.timestamp).toBe(post.timestamp)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
