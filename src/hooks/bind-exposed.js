export default function bindExposed(ref) {
  const instance = getCurrentInstance()
  const entries = Object.entries(ref.value.$.exposed)
  for (const [key, value] of entries) {
    instance.exposed[key] = value
  }
}