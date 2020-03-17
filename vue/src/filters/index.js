
const importAll = r => {
  return r.keys().map(key => r(key))
}

export default importAll(require.context('./type', true, /\.js$/))
