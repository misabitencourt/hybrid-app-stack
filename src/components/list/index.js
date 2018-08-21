const { h } = window.hyperapp

export default (state, actions, items) => h('div', {className: 'list sample-list'}, [
    h('ul', {}, items.map(item => h('li', { onclick: item.onclick }, [
        h('div', {className: 'item-content'}, [
            h('div', {className: 'item-inner'}, [
                h('div', {className: 'item-title'}, item.title),
                
                item.after ? 
                    h('div', {className: 'item-after'}, item.after) :
                    h('span')
            ])
        ])        
    ])))
])

