## Original Problem text

copyright and source: <https://projecteuler.net/problem=21>

Let d(n) be defined as the sum of proper divisors of n
(numbers less than n which divide evenly into n).

If d(a) = b and d(b) = a, where a ≠ b, then a and b are an
amicable pair and each of a and b are called amicable numbers.

For example, the proper divisors of 220 are \
1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110;
therefore d(220) = 284. The proper divisors of 284 are
1, 2, 4, 71 and 142; so d(284) = 220.

Evaluate the sum of all the amicable numbers under 10000.

## Functional Decomposition

### isAmicable Predicate of scalars

Given some function f(x):y where x and y are compatible scalars,
f(x) should equal y and f(y) should equal x, so f(f(x)) should equal x

however the additional stipulation is that f(x) and f(y) must *both* be
less than some limit, because the problem is looking for the sum of all
'amicable' **pairs** under that limit.

### isAmicable Predicate of mappings

If instead we create a map of scalars as keys and their expressions through
f(x) as values,
we can later decide amicability through an almost identical process, of
checking that the value for a given key, when taken as a key maps to a
value which then again equals the original key.

given a collection of mappings, then map[a] == b and map[b] == a, which
is to say that map[map[a]] == a.

using a map however allows us to pre filter the collection simply applying
other constraints such as a > 10000.  

### divisorSum Transform

This will simply be a integer -> integer transform that behaves exactly as
described, yet can also be further functionally decomposed:

- create a list of all quotients of n from 1 to n-1
- filter the list to integers (n === floor(n))
- sum the list

## The only variable that matters

10000 in this case defines the upper limit of the pairs, so any candidate number
and its pair, must be below 100000 - so a properly construction function
should be as simple as amicableDivisorSumsTo(10000)
