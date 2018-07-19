import template from './pages/template'
import actions from './actions/index'
import page from './pages/index'

const { app } = window.hyperapp

const state = {
  page: 'home'
}

const view = (state, actions) => template(state, actions, [
  page(state, actions)
])

export default () => app(state, actions, view, document.body)
