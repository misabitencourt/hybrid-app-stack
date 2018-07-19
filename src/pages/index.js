import home from './home'

const pages = [
    {id: 'home', mount: home}
]

export default (storage, actions) => {
    const page = pages.find(p => p.id === storage.page)
    if (! page) {
        throw new Error('Page not found')
    }

    return page.mount(storage, actions)
}