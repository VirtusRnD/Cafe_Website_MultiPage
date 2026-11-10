import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import i18n from '../src/i18n.js'
import App from '../src/App.jsx'

const ROUTES = ["/","/our-story","/reviews","/menu"]
const renderAt = (path) => { window.history.pushState({}, '', path); return render(<App />) }
i18n.changeLanguage('en')

test.each(ROUTES)('renders %s', (path) => {
  const { container } = renderAt(path)
  expect(container.querySelector('h1, h2, h3')?.textContent).toBeTruthy()
})
