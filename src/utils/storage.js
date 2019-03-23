const stroage = window.localStorage


const prefix = 'driver.'

/**
 * 存储Storage
 */
export const set = (name, content,f) => {

  if (!name) return

  if(content === undefined || content === null){
    return remove(name)
  }

  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }

  stroage.setItem(prefix + name, content)
}

/**
 * 获取Storage
 */
export const get = (name, type) => {
  if (!name) return
  const val = stroage.getItem(prefix + name)
  if (type === 'json') {
    return JSON.parse(val)
  }
  return val
}

/**
 * 删除Storage
 */
export const remove = name => {
  if (!name) return
  stroage.removeItem(prefix + name)
}

export default {
  set,get,remove
}
