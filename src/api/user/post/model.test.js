import { UserPost } from '.'

let userPost

beforeEach(async () => {
  userPost = await UserPost.create({ title: 'test', author: 'test', content: 'test', timestamp: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = userPost.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(userPost.id)
    expect(view.title).toBe(userPost.title)
    expect(view.author).toBe(userPost.author)
    expect(view.content).toBe(userPost.content)
    expect(view.timestamp).toBe(userPost.timestamp)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = userPost.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(userPost.id)
    expect(view.title).toBe(userPost.title)
    expect(view.author).toBe(userPost.author)
    expect(view.content).toBe(userPost.content)
    expect(view.timestamp).toBe(userPost.timestamp)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
