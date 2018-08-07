import title from '../components/title/index'
import button from '../components/button/index'
const { h } = window.hyperapp

export default (state, actions) => h('div', {className: 'page-home'}, [
    title({state, actions, hasSearchBar: false, children: 'Create todo'}),    
    
])