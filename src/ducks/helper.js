export function createReducer(initialState, handlers) {
  return (state = initialState, action) =>
    handlers(state)[action.type]
      ? handlers(state)[action.type](action.payload)
      : state
}

export function Creator(type, ...argNames) {
  if (argNames.length > 0) {
    return (...args) => {
      const payload = {}
      argNames.forEach((arg, index) => {
        payload[argNames[index]] = args[index]
      })
      return {type, payload}
    }
  }
  return payload => (payload ? {type, payload} : {type})
}
