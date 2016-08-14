const r = require('ramda')

// simple predicates
const both = pred => pair => pred(pair[0]) && pred(pair[1]) // NOT USED
const pairInRange = n => both(m => m < n) // NOT USED
const divisorFor = n => m => Math.floor(n / m) === n / m

// higher order predicates
const transformInRange = (fn, max) => a => fn(a) < max
const amicable = f => x => f(x) !== x && f(f(x)) === x
const amicableAndInRange = (fn, max) => n =>
   amicable(fn)(n) && transformInRange(fn, max)(n)

// scalar -> vector
const rangeFor = n => r.range(1, n) // not super necessary, but nice
const divisorsOf = n => r.filter(divisorFor(n), rangeFor(n))

// transform - memoized
const divisorSum = r.compose(r.sum, divisorsOf)

// list of passing
const amicableDivisorSumsPaired = max =>
  r.filter(amicableAndInRange(divisorSum, max))(rangeFor(max))

// list of passing without considering whether the partner is out of range
const amicableDivisorSumsUnpaired = max =>
  r.filter(amicable(divisorSum), (rangeFor(max)))

const sumOfPairedAmicableDivisorsUpTo = r.compose(
  r.sum, amicableDivisorSumsPaired)

module.exports = {
  both,
  pairInRange,
  amicable,
  divisorFor,
  rangeFor,
  divisorsOf,
  divisorSum,
  transformInRange,
  amicableAndInRange,
  amicableDivisorSumsPaired,
  amicableDivisorSumsUnpaired,
  sumOfPairedAmicableDivisorsUpTo,
  solutionFn: sumOfPairedAmicableDivisorsUpTo
}

console.log(sumOfPairedAmicableDivisorsUpTo(10000))
