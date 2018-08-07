import template from './pages/template'
import actions from './actions/index'
import page from './pages/index'
import initialState from './initialState'

const { app } = window.hyperapp

const state = initialState

const view = (state, actions) => template(state, actions, [
  page(state, actions)
])

export default () => app(state, actions, view, document.body)
