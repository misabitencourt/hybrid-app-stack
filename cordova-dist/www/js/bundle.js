var app = (function () {
    'use strict';

    var h = window.hyperapp.h;


    var icons = [{ id: 'delete', getElement: function getElement() {
            if (window.PLATFORM === 'android') {
                return h('i', { className: 'material-icons' }, 'delete');
            }

            return h('i', { className: 'f7-icons' }, 'delete_round');
        }
    }, { id: 'back-page', getElement: function getElement() {
            if (window.PLATFORM === 'android') {
                return h('i', { className: 'hidden' }, '');
            }

            return h('i', { className: 'icon icon-back' });
        }
    }, { id: 'menu', getElement: function getElement() {
            if (window.PLATFORM === 'android') {
                return h('i', { className: 'icon material-icons md-only' }, 'menu');
            }

            return h('i', { className: 'icon icon-menu' });
        }
    }];

    var icon = (function (id) {
        var icon = icons.find(function (i) {
            return i.id === id;
        });
        if (!icon) {
            return h('i', { className: 'hidden' }, []);
        }

        return icon.getElement();
    });

    var h$1 = window.hyperapp.h;


    var navbar = (function (_ref) {
        var _ref$title = _ref.title,
            title = _ref$title === undefined ? 'App' : _ref$title,
            _ref$rightChildren = _ref.rightChildren,
            rightChildren = _ref$rightChildren === undefined ? '' : _ref$rightChildren,
            state = _ref.state,
            actions = _ref.actions;
        return h$1('div', { className: 'navbar' }, [h$1('div', { className: 'navbar-inner' }, [
        // h('div', {className: 'left', 'data-panel': 'left'}, [
        //     h('a', {href: 'javascript:;', className: 'link icon-only panel-open'}, [
        //         icon('menu')
        //     ])
        // ]),

        h$1('div', { className: 'title sliding' }, title), h$1('div', { className: 'right', 'data-panel': 'right' }, rightChildren)])]);
    });

    var h$2 = window.hyperapp.h;


    var template = (function (state, actions, children) {
        return h$2('div', { id: 'app', className: 'framework7-root' }, [h$2('div.view.view-main.view-init.ios-edges', {}, []), h$2('div', { className: 'view view-main view-init' }, [h$2('div', { className: 'page page-current' }, [navbar({ title: 'App', state: state, actions: actions }), h$2('div', { className: 'page-content' }, children)])])]);
    });

    var goTo = function goTo(_ref) {
        var page = _ref.page;
        return function (state, actions) {
            state.prevPage.push(state.page);
            state.page = page;
            return Object.assign({}, state);
        };
    };

    var model = (function (_ref) {
        var prop = _ref.prop,
            value = _ref.value,
            set = _ref.set;
        return function (state, actions) {
            if (set) {
                state.model = set;
                return Object.assign({}, state);
            }

            state.model[prop] = value;

            return Object.assign({}, state);
        };
    });

    function generateHash() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : r & 0x3 | 0x8;
            return v.toString(16);
        });
    }

    function openDb(listName) {
        return new Promise(function (resolve) {
            var request = indexedDB.open(listName);
            request.onupgradeneeded = function (e) {
                var idb = e.target.result;
                if (!idb.objectStoreNames.contains(listName)) {
                    idb.createObjectStore(listName, { autoIncrement: true });
                }
            };
            request.onsuccess = function (e) {
                var idb = e.target.result;
                var trans = idb.transaction(listName, 'readwrite');
                var store = trans.objectStore(listName);

                return resolve(store, trans);
            };
        });
    }

    function save(listName, object) {

        return new Promise(function (resolve) {
            if (!(listName && object)) {
                return resolve(false);
            }

            openDb(listName).then(function (store) {
                var id = generateHash();
                object.id = id;
                var requestAdd = store.add(object, id);
                requestAdd.onsuccess = function () {
                    resolve(true);
                };
            });
        });
    }

    function update(listName, object) {

        return new Promise(function (resolve) {
            if (!listName) {
                return resolve([]);
            }

            openDb(listName).then(function (store, trans) {
                var cursorRequest = store.openCursor();

                cursorRequest.onerror = function (error) {
                    console.log(error);
                };

                cursorRequest.onsuccess = function (evt) {
                    var cursor = evt.target.result;
                    if (cursor) {
                        var currentObj = cursor.value;
                        if (currentObj && currentObj.id === object.id) {
                            cursor.update(object);
                        }
                        cursor.continue();
                    }
                };

                store.transaction.oncomplete = function () {
                    return resolve(object);
                };
            });
        });
    }

    function list(listName, map) {
        return new Promise(function (resolve) {
            if (!listName) {
                return resolve([]);
            }

            openDb(listName).then(function (store, trans) {
                var cursorRequest = store.openCursor();
                var items = [];

                cursorRequest.onerror = function (error) {
                    console.log(error);
                };

                cursorRequest.onsuccess = function (evt) {
                    var cursor = evt.target.result;
                    if (cursor) {
                        var item = cursor.value;
                        item.id = cursor.key;
                        items.push(item);
                        cursor.continue();
                    }
                };

                store.transaction.oncomplete = function () {
                    return resolve(map ? items.map(map) : items);
                };
            });
        });
    }

    function destroy(listName, id) {
        return new Promise(function (resolve) {
            if (!listName) {
                return resolve(true);
            }

            openDb(listName).then(function (store, trans) {
                store.delete(id);
                return resolve(true);
            });
        });
    }

    var todoSrv = {

        sort: function sort(a, b) {
            if (a.description > b.description) {
                return 1;
            }
            if (a.description < b.description) {
                return -1;
            }
            return 0;
        },

        list: function list$$1(filters) {
            var _this = this;

            return list('todos').then(function (todos) {
                if (filters) {
                    return todos.filter(fileters).sort(_this.sort);
                }

                return todos.sort(_this.sort);
            });
        },
        validate: function validate(todo) {
            if (!todo.description) {
                throw 'Please, inform the todo description';
            }
        },
        save: function save$$1(todo) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                try {
                    _this2.validate(todo);
                } catch (e) {
                    return reject(e);
                }

                if (todo.id) {
                    return update('todos', todo).then(resolve).catch(reject);
                }

                return save('todos', todo).then(resolve).catch(reject);
            });
        },
        destroy: function destroy$$1(id) {
            return destroy('todos', id);
        }
    };

    var save$1 = function save(state, actions) {
        return todoSrv.save(state.model).then(function () {
            actions.msg({ title: 'Info', txt: 'Todo saved' });
            actions.goTo({ page: 'home' });
            actions.fetch({ model: 'todos' });
        }).catch(function (err) {
            return actions.msg({ title: 'Error', txt: err });
        });
    };

    var save$2 = (function (target) {

        switch (target) {
            case 'todos':
                return save$1;
        }

        return function (state, actions) {
            return Object.assign({}, state);
        };
    });

    var f7 = new Framework7();

    var f7$1 = (function () {
      return f7;
    });

    var msg = (function (_ref) {
        var title = _ref.title,
            txt = _ref.txt;
        return function (state, actions) {
            f7$1().notification.create({
                title: title,
                text: txt
            }).open();

            return Object.assign({}, state);
        };
    });

    var fetch = (function (_ref) {
        var model = _ref.model,
            list = _ref.list,
            filters = _ref.filters;
        return function (state, actions) {
            if (model && list) {
                var modelList = state.lists.find(function (list) {
                    return list.model === model;
                });
                if (modelList) {
                    modelList.list = list;
                } else {
                    state.lists.push({ model: model, list: list });
                }

                return Object.assign({}, state);
            }

            switch (model) {
                case 'todos':
                    todoSrv.list(filters).then(function (todos) {
                        actions.fetch({ model: model, list: todos });
                    });
                    return Object.assign({}, state);
                default:
                    return Object.assign({}, state);
            }
        };
    });

    var deleteRecord = (function (_ref) {
        var model = _ref.model,
            id = _ref.id;
        return function (state, actions) {
            switch (model) {
                case 'todos':
                    todoSrv.destroy(id).then(function () {
                        return actions.fetch({ model: 'todos' });
                    });
                    return Object.assign({}, state);
                default:
                    return Object.assign({}, state);
            }
        };
    });

    var actions = {
        goTo: goTo,
        model: model,
        save: save$2,
        msg: msg,
        fetch: fetch,
        deleteRecord: deleteRecord
    };

    var h$3 = window.hyperapp.h;


    var list$1 = (function (state, actions, items) {
        return h$3('div', { className: 'list sample-list' }, [h$3('ul', {}, items.map(function (item) {
            return h$3('li', { onclick: item.onclick }, [h$3('div', { className: 'item-content' }, [h$3('div', { className: 'item-inner' }, [h$3('div', { className: 'item-title' }, item.title), item.after ? h$3('div', { className: 'item-after' }, item.after) : h$3('span')])])]);
        }))]);
    });

    var h$4 = window.hyperapp.h;


    var button = (function (state, actions, _ref) {
        var text = _ref.text,
            onclick = _ref.onclick,
            color = _ref.color;
        return h$4('button', {
            className: 'col button button-big button-outline ' + (color ? 'color-' + color : ''),
            onclick: onclick
        }, text);
    });

    var h$5 = window.hyperapp.h;


    var home = (function (state, actions) {
        var todos = state.lists.find(function (l) {
            return l.model === 'todos';
        }) || {};

        return h$5('div', { className: 'page-home',
            oncreate: function oncreate() {
                return actions.fetch({ model: 'todos' });
            } }, [h$5('div', { className: 'block' }, [h$5('div', { className: 'row' }, [button(state, actions, { text: 'Add todo', onclick: function onclick() {
                actions.goTo({ page: 'add-todo' });
            } })])]), list$1(state, actions, (todos.list || []).map(function (todo) {
            return {
                title: todo.description,
                onclick: function onclick() {
                    actions.model({ set: todo });
                    actions.goTo({ page: 'add-todo' });
                },
                after: [h$5('span', { onclick: function onclick(e) {
                        e.stopPropagation();
                        actions.deleteRecord({ model: 'todos', id: todo.id });
                    } }, [icon('delete')])]
            };
        }))]);
    });

    var h$6 = window.hyperapp.h;


    var title = (function (_ref) {
        var state = _ref.state,
            actions = _ref.actions,
            hasSearchBar = _ref.hasSearchBar,
            children = _ref.children;
        return h$6('div', { className: 'block-title ' + (hasSearchBar ? 'searchbar-found' : '') }, children);
    });

    var h$7 = window.hyperapp.h;


    var input = (function (state, actions, _ref) {
        var type = _ref.type,
            name = _ref.name,
            placeholder = _ref.placeholder;


        switch (type) {
            default:
                return h$7('div', { className: 'item-input-wrap' }, [h$7('input', { type: 'text', placeholder: placeholder, value: state.model[name], onchange: function onchange(e) {
                        return actions.model({ prop: name, value: e.target.value });
                    } })]);
        }
    });

    var h$8 = window.hyperapp.h;


    var form = (function (state, actions, inputs) {
        return h$8('div', { className: 'list inline-labels no-hairlines-md' }, [h$8('ul', {}, inputs.map(function (input) {
            return h$8('li', { className: 'item-content item-input' }, [h$8('div', { className: 'item-inner' }, [input])]);
        }))]);
    });

    var h$9 = window.hyperapp.h;


    var addTodo = (function (state, actions) {
        return h$9('div', { className: 'page-home' }, [title({ state: state, actions: actions, hasSearchBar: false, children: 'Create todo' }), form(state, actions, [input(state, actions, { type: 'text', name: 'description', placeholder: 'Todo' })]), h$9('div', { className: 'block' }, [h$9('div', { className: 'row' }, [button(state, actions, { text: 'Cancel', color: 'gray',
            onclick: function onclick() {
                actions.model({ set: {} });
                actions.goTo({ page: 'home' });
            } }), button(state, actions, { text: 'Save', onclick: function onclick() {
                actions.save('todos');
                actions.model({ set: {} });
            } })])])]);
    });

    var pages = [{ id: 'home', mount: home }, { id: 'add-todo', mount: addTodo }];

    var page = (function (storage, actions) {
        var page = pages.find(function (p) {
            return p.id === storage.page;
        });
        if (!page) {
            throw new Error('Page not found');
        }

        return page.mount(storage, actions);
    });

    var initialState = {
        prevPage: [],
        page: 'home',
        lists: [],
        model: {}
    };

    var app = window.hyperapp.app;


    var state = initialState;

    var view = function view(state, actions$$1) {
      return template(state, actions$$1, [page(state, actions$$1)]);
    };

    var index = (function () {
      return app(state, actions, view, document.body);
    });

    return index;

}());
