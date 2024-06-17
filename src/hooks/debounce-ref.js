export default function debounceRef(value, delay = 1000) {
  let timer
  return customRef((track, trigger) => ({
    get() {
      track()
      return value
    },
    set(val) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        value = val
        trigger()
      }, delay)
    }
  }))
}