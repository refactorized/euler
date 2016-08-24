## Original Problem text

copyright and source: <https://projecteuler.net/problem=21>

Let d(n) be defined as the sum of proper divisors of n (numbers less than n
which divide evenly into n).

If d(a) = b and d(b) = a, where a ≠ b, then a and b are an amicable pair and
each of a and b are called amicable numbers.

For example, the proper divisors of 220 are \ 1, 2, 4, 5, 10, 11, 20, 22, 44, 55
and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and
142; so d(284) = 220.

Evaluate the sum of all the amicable numbers under 10000.

## Functional Decomposition

**NOTE** When this exercise was first tackled, it was (mis) understood that
amicable numbers were pairs of numbers that were complementary given some Function.

In reality that function is always the same - always the sum of a numbers
proper divisors.  

In the original solution and readme these things were considered
separate, and so I first pursued a general higher order definition of the complementary
relationship between each member of the pair - and quite like the path of reasoning
that followed.  

Furthermore the problem is unclear in how it expects to handle a pair that contains
one number above the stated maximum of 10000.  Again, I tackled the more complex
case, of requiring that both numbers be within the acceptable range, and the
original code and much of the below discussion is concerned with such an edge
case. As it turns out, that edge case does not arise in numbers below 10000 (or ever?)
but its mitigation still made for a fun exercise.

Below I have endeavored to keep the original efforts intact, but to update the
language with a better understanding of the details of the problem.

The original solution can be found as original-solution.js, and solution.js has
been simplified and refactored with appropriate names.  

**solution.js** has also been cleaned up considerably and, while simpler, also
exhibits much better functional style.

### hasPartner Predicate of scalars

A generalization of the kind of relationship shared by amicable numbers,
When given an injective function f, two different scalars x and y are partners if
f(x) = y, and f(y) = x
Assuming these are proper functions, we can substitute f(x) for y,
given their equality, yielding the requirement that f(f(x)) = x

Also, f(x) must not equal x, as x and y must be different ( amicable vs perfect numbers )
so a complete test of partnership would be:

**all x where f(x) ≠ x AND f(f(x)) = x**

### partners in a given range

I could be understood that, as an additional stipulation, x and y must *both* be less
than some limit, because the problem is looking for the sum of all 'amicable'
**pairs** under that limit.  Ensuring this requires a more complex solution
that can be tackled in a variety of ways

### partnered mappings

if we use f(x) to first create a map of [x, f(x)] we can interpret the above
predicate in a slightly different manner.  given a collection of key value mappings we could define partnership as

**all (key, val) where key != val and map[map[key]] = val**

using a map however allows us to pre filter the collection simply applying other
constraints such as f(a) > 10000.

if using consecutive integers the map can, of course, be an array with the index
serving as the key - though the zero element would probably have to  be ignored
or invalidated  

### fusing hasPartner with inRange

Perhaps the most intuitive way to filter the collection is by simply filtering
the collection through both predicates at once.  This makes the logic as simple
as filtering out all numbers in a range that do not fulfill the partnership and
range predicates.   

The range predicate however must evaluate f(x) once more to
establish that the transformed number is not out of range.  This is a tradeoff
we make for the sake of readability, reasonability but if it is truly expensive,
we can simply memoize f(x)  

### divisorSum Transform

This will simply be a integer -> integer transform that behaves exactly as
described, yet can also be further functionally decomposed:

- create a list of all quotients of n from 1 to n-1
- filter the list to integers (n === floor(n))
- sum the list

Testing for proper divisors is expensive and could be sped up with various strategies
out of scope for this solution.  One such strategy only searches up to the
square root of n, returning both the quotient and n whenever a proper divisor
is encountered

## The only variable that matters

10000 in this case defines the upper limit of the pairs, so any candidate number
and its pair, must be below 100000 - so a properly constructed function
should be as simple as solutionFn(10000)
