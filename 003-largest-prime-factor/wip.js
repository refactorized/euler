//HORRIBLY inefficient

var number = process.argv[2];

var getInnerFactors = function(n){
  var factors = [];
  for(i=2; i<n; i++){
    if(n%i===0){
      factors.push(i);
    }
  }
  return factors;
};

var isPrime = function(n){
  return getInnerFactors(n).length === 0;
};

var getPrimeFactors = function(n){
  var primes = [];
  getInnerFactors(n).forEach(function(f){
    if(isPrime(f)){
      primes.push(f);
    }
  });
  return primes;
};

var getLargest = function(a){ // assume largest > 0;
  var largest = 0;
  a.forEach(function(n){
    largest = n>largest ? n : largest;
  });
  return largest;
};

console.log(getLargest(getPrimeFactors(number)));
