const localStorageKey = 'com.todobit.samples.cordova.todo'

function generateHash() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function openDb(listName) {
    return new Promise((resolve) => {
        let request = indexedDB.open(listName)
        request.onupgradeneeded = function(e) {
            let idb = e.target.result
            if (! idb.objectStoreNames.contains(listName)) {
                idb.createObjectStore(listName, {autoIncrement: true})
            }
        }
        request.onsuccess = function(e) {
            let idb = e.target.result
            let trans = idb.transaction(listName, 'readwrite')
            let store = trans.objectStore(listName)

            return resolve(store, trans)
        }
    })
}

export function save(listName, object) {
    
    return new Promise((resolve) => {
        if (! (listName && object)) {
            return resolve(false)
        }

        openDb(listName).then((store) => {
            let id = generateHash()
            object.id = id
            let requestAdd = store.add(object, id)
            requestAdd.onsuccess = function() {
                resolve(true)
            }
        })
    })
}

export function update(listName, object) {

    return new Promise((resolve) => {
        if (! listName) {
            return resolve([])
        }

        openDb(listName).then((store, trans) => {
            let cursorRequest = store.openCursor()
            let items = []
 
            cursorRequest.onerror = function(error) {
                console.log(error);
            }
        
            cursorRequest.onsuccess = function(evt) {                    
                let cursor = evt.target.result;
                if (cursor) {
                    let currentObj = cursor.value
                    if (currentObj && currentObj.id === object.id) {
                        cursor.update(object)
                    }
                    cursor.continue();
                }
            }

            store.transaction.oncomplete = function() {
                return resolve(object)
            }
        })
    })
}

export function getSize(listName) {
    let size = localStorage[`${localStorageKey}__${listName}__size`]
    if ((! size) || isNaN(size)) {
        return 0;
    }

    return 1*size
}

export function list(listName, map) {
    return new Promise((resolve) => {
        if (! listName) {
            return resolve([])
        }

        openDb(listName).then((store, trans) => {
            let cursorRequest = store.openCursor()
            let items = []
 
            cursorRequest.onerror = function(error) {
                console.log(error);
            }
        
            cursorRequest.onsuccess = function(evt) {                    
                let cursor = evt.target.result;
                if (cursor) {
                    let item = cursor.value;
                    item.id = cursor.key;
                    items.push(item);
                    cursor.continue();
                }
            }

            store.transaction.oncomplete = function() {
                return resolve(map ? items.map(map) : items)
            }
        })
    })
}

export function destroy(listName, id) {
    return new Promise((resolve) => {
        if (! listName) {
            return resolve(true)
        }

        openDb(listName).then((store, trans) => {
            store.delete(id)
            return resolve(true)
        })
    })
}

export function get(listName, id) {
    return new Promise((resolve) => {
        if (! (listName && id && !isNaN(id))) {
            return resolve(null)
        }
        
        if (localStorage[`${localStorageKey}__${listName}`]) {
            let list = JSON.parse(localStorage[`${localStorageKey}__${listName}`])
            return resolve(list[id] || null)
        }

        return resolve(null)
    })
}