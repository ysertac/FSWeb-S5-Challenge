import '@testing-library/jest-dom/extend-expect'
import { server } from './src/mocks/server'
import { screen, queries } from '@testing-library/dom'
import { makaleler, konular } from './src/mocks/data'
import { Card, cardEkleyici } from './src/bileşenler/card'
import { Header, headerEkleyici } from './src/bileşenler/header'
import { Tablar, tabEkleyici } from './src/bileşenler/tablar'

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => {
  server.resetHandlers()
  document.body.innerHTML = ''
})

test('[0] sağlık', () => {
  expect(true).not.toBe(false)
})

describe('Görev 1 - Header ', () => {
  let header
  beforeEach(() => {
    header = Header('foo', 'bar', 'baz')
  })
  test('[1] header doğru elemanları içeriyor (element, attrs and text)!', () => {
    expect(header.querySelector('div.header>h1').textContent).toMatch(/foo/i)
  })
  test('[2] header doğru tarihi içeriyor (element, attrs and text)', () => {
    expect(header.querySelector('div.header>span.date').textContent).toMatch(/bar/i)
  })
  test('[3] header doğru yazıyı içeriyor (element, attrs and text)', () => {
    expect(header.querySelector('div.header>span.temp').textContent).toMatch(/baz/i)
  })
})

describe('GÖREV 2 - headerEkleyici', () => {
  beforeEach(() => {
    headerEkleyici('body')
  })
  test('[4] DOM\' header ekleniyor ', () => {
    expect(document.querySelector('.header>h1')).toBeTruthy()
    expect(document.querySelector('.header>.date')).toBeTruthy()
    expect(document.querySelector('.header>.temp')).toBeTruthy()
  })
})

describe('GÖREV 3 - Tablar', () => {
  let tabs
  beforeEach(() => {
    tabs = Tablar(['foo', 'bar', 'baz'])
  })
  // console.log(tabs)
  test('[5] Tablar doğru konuları içeriyor', () => {
    expect(queries.getByText(tabs, 'foo'))
    expect(queries.getByText(tabs, 'bar'))
    expect(queries.getByText(tabs, 'baz'))
  })
})

describe('GÖREV 4 - tabEkleyici', () => {
  beforeEach(() => {
    tabEkleyici('body')
  })
  test('[6] konuları DOM\'a ekliyor', async () => {
    for (let i = 0; i < konular.konular.length; i++) {
      expect(await screen.findByText(konular.konular[i])).toBeInTheDocument()
    }
  })
})

describe('GÖREV 5 - Card.', () => {
  let card
  beforeEach(() => {
    card = Card({ anabaslik: 'foo', yazarAdi: 'bar', yazarFoto: 'baz' })
  })
  test('[7] doğru anabaşlığı döndürüyor', () => {
    expect(card.querySelector('div.card>div.headline').textContent).toMatch(/foo/i)
  })
  test('[8] doğru yazaradı döndürüyor', () => {
    expect(card.querySelector('div.card>div.author>span').textContent).toMatch(/bar/i)
  })
  test('[9] doğru yazarfotosu döndürüyor', () => {
    expect(card.querySelector('div.card>div.author>div.img-container>img').src).toMatch(/baz/)
  })
})

describe('GÖREV 6 - cardEkleyici', () => {
  beforeEach(() => {
    cardEkleyici('body')
  })
  test('[10] DOM\'da tüm makale ana başlıkları bulundu', async () => {
    const headlines = Object.values(makaleler.makaleler).flat().map(art => art.anabaslik)
    for (let i = 0; i < headlines.length; i++) {
      expect(await screen.findByText(headlines[i])).toBeInTheDocument()
    }
  })
})
