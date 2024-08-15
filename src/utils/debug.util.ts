import util from 'node:util'

export function inspect(arg: unknown, title = '') {
  console.log(title, util.inspect(arg, { showHidden: false, depth: null, colors: true }))
}
