const localStorageKey = 'com.todobit.mobile.todolist'

function generateHash() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

export function save(listName, object) {
    
    return new Promise((resolve) => {
        if (! (listName && object)) {
            return resolve(false)
        }

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

            let id = generateHash()
            object.id = object.id || id
            let requestAdd = store.add(object, object.id)
            requestAdd.onsuccess = function() {
                resolve(true)
            }
        }
    })
}

export function update(listName, object) {

    return new Promise((resolve) => {
        if (! listName) {
            return resolve([])
        }

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
            let cursorRequest = store.openCursor()
            cursorRequest.onerror = function(error) {
                console.log(error);
            }
        
            cursorRequest.onsuccess = function(evt) {                    
                let cursor = evt.target.result;
                if (cursor) {
                    let currentObj = cursor.value
                    if (currentObj && currentObj.id === object.id) {
                        cursor.update(object)
                        resolve(object)
                    }
                    cursor.continue();
                }
            }
        };
    })
}

export function getSize(listName) {
    let size = localStorage[`${localStorageKey}__${listName}__size`]
    if ((! size) || isNaN(size)) {
        return 0;
    }

    return 1*size
}

// indexed db list
export function list(listName, map, condition) {
    return new Promise((resolve) => {
        if (! listName) {
            return resolve([])
        }

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

            let cursorRequest = store.openCursor()
            let items = []
 
            cursorRequest.onerror = function(error) {
                console.log(error);
                return resolve([])
            }
        
            cursorRequest.onsuccess = function(evt) {                    
                let cursor = evt.target.result;
                if (cursor) {
                    let item = cursor.value;
                    item.id = cursor.key;
                    if (condition) {
                        if (condition(item)) {
                            items.push(item)
                        }
                    } else {
                        items.push(item);
                    }
                    cursor.continue();
                }
            }

            store.transaction.oncomplete = function() {
                return resolve(map ? items.map(map) : items)
            }
        }
    })
}

export function killAll(listName, id) {
    return new Promise(resolve => {
        list(listName).then(objs => {
            let deleted = 0
            let toDelete = objs.length
            objs.forEach(obj => {
                destroy(listName, id).then(() => {
                    if (deleted++ === toDelete) {
                        resolve(true)
                    }
                })
            })
        })
    })
}

export function destroy(listName, id) {
    return new Promise((resolve) => {
        if (! listName) {
            return resolve(true)
        }

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

            store.delete(id)
            return resolve(true)
        }
    })
}
