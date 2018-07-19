var app = (function () {
    'use strict';

    const { h } = window.hyperapp;

    const icons = [
        {id: 'back-page', getElement() {
            if (window.PLATFORM === 'android') {
                return h('i', {className: 'hidden'}, '')
            }

            return h('i', {className: 'icon icon-back'})
        }},

        {id: 'menu', getElement() {
            if (window.PLATFORM === 'android') {
                return h('i', {className: 'icon material-icons md-only'}, 'menu')
            }

            return h('i', {className: 'icon icon-menu'})
        }}
    ];

    var icon = id => {
        const icon = icons.find(i => i.id === id);
        if (! icon) {
            return h('i', {className: 'hidden'}, [])
        }

        return icon.getElement()
    }

    const { h: h$1 } = window.hyperapp;

    var navbar = ({title='App', rightChildren='', state, actions}) => h$1('div', {className: 'navbar'}, [
        h$1('div', {className: 'navbar-inner'}, [
            h$1('div', {className: 'left', 'data-panel': 'left'}, [
                h$1('a', {href: 'javascript:;', className: 'link icon-only panel-open'}, [
                    icon('menu')
                ])
            ]),

            h$1('div', {className: 'title sliding'}, title),

            h$1('div', {className: 'right', 'data-panel': 'right'}, rightChildren)
        ])
    ])

    const { h: h$2 } = window.hyperapp;

    var template = (state, actions, children) => h$2('div', {id: 'app', className: 'framework7-root'}, [
        h$2('div.view.view-main.view-init.ios-edges', {}, [

        ]),

        h$2('div', {className: 'page page-current'}, [
            navbar({title: 'App', state, actions}),
            h$2('div', {className: 'page-content'}, children)
        ])
    ])

    var actions = {
        down: value => state => ({ count: state.count - value }),
        up: value => state => ({ count: state.count + value })
    }

    const { h: h$3 } = window.hyperapp;

    var title = ({state, actions, hasSearchBar, children}) => 
        h$3('div', {className: `block-title ${hasSearchBar ? 'searchbar-found' : ''}`}, children)

    const { h: h$4 } = window.hyperapp;

    var home = (state, actions) => h$4('div', {className: 'page-home'}, [
        title({state, actions, children: 'Todo list'}),
    ])

    const pages = [
        {id: 'home', mount: home}
    ];

    var page = (storage, actions) => {
        const page = pages.find(p => p.id === storage.page);
        if (! page) {
            throw new Error('Page not found')
        }

        return page.mount(storage, actions)
    }

    const { app } = window.hyperapp;

    const state = {
      page: 'home'
    };

    const view = (state, actions$$1) => template(state, actions$$1, [
      page(state, actions$$1)
    ]);

    var index = () => app(state, actions, view, document.body)

    return index;

}());
