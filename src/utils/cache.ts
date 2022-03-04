const SDSCOMPONENTSCACHE = "THELMA_CACHE"
const TWO_WEEKS = 1000 * 60 * 60 * 24 * 14

const currentTime=()=>{
    return Date.now()
}

export const getCache = () => {

    let cache={
        data: {},
        nextCleanup: new Date().getTime() + TWO_WEEKS
    }  

    try {
        const value = localStorage.getItem(SDSCOMPONENTSCACHE)

        if(value){
            cache = JSON.parse(value)
        }
    }
    catch(e){
        console.error(e.message)
    }

    return cache
}

export const setCache = (id, value) => {
    const cache = getCache()
    const { data } = cache

    const item = {
        id,
        value,
        expire: new Date().getTime() + TWO_WEEKS,
    }

    data[id] = item

    try{
        localStorage.setItem(SDSCOMPONENTSCACHE, JSON.stringify(cache))
    }
    catch(e){
        cleanUpStorage(data)
    }

}

const cleanUpStorage=(data)=>{

    let isDeleted
    let oldest
    let oldestKey

    //if 14 days have been passed, it removes the cache
    for (const key in data) {
        console.log("key is",key)
        const expiry = data[key].expiry
        if (expiry && expiry <=currentTime()) {
          delete data[key]
          isDeleted = true
        }
    
        //finding the oldest cache in case none of them are expired
        if (!oldest || oldest > expiry) {
          oldest = expiry
          oldestKey=key
        }
    }

    //remove the oldest cache if there is no more space in local storage (5 MB)
    if(!isDeleted && oldestKey){
        delete data[oldestKey]
    }

    localStorage.setItem(
        SDSCOMPONENTSCACHE,
        JSON.stringify({
          data: data,
          nextCleanup:currentTime() + TWO_WEEKS,
        })
    )

}