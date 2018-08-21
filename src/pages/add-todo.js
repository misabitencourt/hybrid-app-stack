import title from '../components/title/index'
import button from '../components/button/index'
import input from '../components/input/index'
import form from '../components/form/index'
const { h } = window.hyperapp

export default (state, actions) => h('div', {className: 'page-home'}, [
    title({state, actions, hasSearchBar: false, children: 'Create todo'}),

    form(state, actions, [
        input(state, actions, {type: 'text', name: 'description', placeholder: 'Todo'})
    ]),

    h('div', {className: 'block'}, [
        h('div', {className: 'row'}, [            
            button(state, actions, {text: 'Cancel', color: 'gray', 
                                        onclick: () => {
                                            actions.model({set: {}})
                                            actions.goTo({page: 'home'})
                                        }}),
            button(state, actions, {text: 'Save', onclick: () => {
                actions.save('todos')
                actions.model({set: {}})
            }})
        ])
    ])
])