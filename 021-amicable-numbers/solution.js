const r = require('ramda')

// simple predicate
const divisorFor = n => m => Math.floor(n / m) === n / m

// scalar -> vector
const rangeFor = n => r.range(1, n) // not super necessary, but nice
const divisorsOf = n => r.filter(divisorFor(n), rangeFor(n))

// transform - memoized
const divisorSum = r.memoize(r.compose(r.sum, divisorsOf))

// higher order predicates
const hasPartner = f => x => f(x) !== x && f(f(x)) === x
const isAmicable = hasPartner(divisorSum)

// arity 1 (pure) filter function
const onlyAmicables = r.filter(isAmicable)

const sumOfAmicablesBelow = r.compose(r.sum, onlyAmicables, rangeFor)

// for the repl
module.exports = {
  divisorFor,
  rangeFor,
  divisorsOf,
  divisorSum,
  hasPartner,
  isAmicable,
  onlyAmicables,
  sumOfAmicablesBelow
}

// when invoked directly
if (!module.parent) {
  console.log(sumOfAmicablesBelow(10000))
}
