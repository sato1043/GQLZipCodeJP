import util from 'util'

export function inspect(arg: unknown) {
  console.log(util.inspect(arg, { showHidden: false, depth: null, colors: true }))
}
