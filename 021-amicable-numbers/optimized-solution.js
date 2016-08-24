const r = require('ramda')

const isInt = n => Math.floor(n) === n

// not point-free, but still a pure function
function getDivisorsFor (n) {
  const divisors = [1] // one is always a divisor
  const sqrt = Math.sqrt(n)

  // 0, 1 edge cases
  if (sqrt === n) {
    return divisors
  }

  // if n is a perfect square, sqrt will be a divisor
  if (isInt(sqrt)) {
    divisors.push(sqrt)
  }

  for (let d = 2; d < sqrt; d++) {
    if (n % d === 0) {
      divisors.push(d)
      divisors.push(n / d)
    }
  }

  return divisors
}

// scalar -> list
const rangeFor = n => r.range(1, n) // not super necessary, but nice

// scalar transform
const divisorSum = r.memoize(r.compose(r.sum, r.flatten, getDivisorsFor))

// higher order predicates
const hasPartner = f => x => f(x) !== x && f(f(x)) === x
const isAmicable = hasPartner(divisorSum)

// arity 1 (pure) filter function
const onlyAmicables = r.filter(isAmicable)

// scalar transform
const sumOfAmicablesBelow = r.compose(r.sum, onlyAmicables, rangeFor)

// for the repl
module.exports = {
  getDivisorsFor,
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
