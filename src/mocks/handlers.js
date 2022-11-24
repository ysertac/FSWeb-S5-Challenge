import { rest } from 'msw'
import { konular, makaleler } from './data'

function getTopics(req, res, ctx) {
  return res(
    ctx.status(200),
    ctx.json(konular),
  )
}

function getArticles(req, res, ctx) {
  return res(
    ctx.status(200),
    ctx.json(makaleler),
  )
}

export const handlers = [
  rest.get('http://localhost:5001/api/makaleler', getArticles),
  rest.get('http://localhost:5001/api/konular', getTopics),
]
