const key = 'user'

const init = localStorage[key]

const plugin = store => {
  store.subscribe(mutation => {
    switch (mutation.type) {
      case 'auth/setToken':
        localStorage[key] = JSON.stringify(mutation.payload)
        break
      case 'auth/resetToken':
        localStorage.removeItem(key)
        break
    }
  })
}

export default plugin
export { init }
