var p = 0, n = 1, sum = 0;

// for numbers less than 4M
while(n < 4000000){
  sum += n%2 ? n : 0; // add either the current number (n) if even, or nothing (0) for odd.
  n = n+p; // new current number (n) is previous (p)
  p = n-p; // new previous (p) number is old current number (n-p)
}

console.log(sum);
