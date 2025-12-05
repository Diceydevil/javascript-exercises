function fibsRec(n) {

    console.log(`fibsRec(${n}) called`);
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const previousFibs = fibsRec(n - 1);
    
    // Calculate the next Fibonacci number
    const lastOne = previousFibs[previousFibs.length - 1];
    const lastTwo = previousFibs[previousFibs.length - 2];
    const nexFibonacciNumber = lastOne + lastTwo;

    return [...previousFibs, nexFibonacciNumber];
}

console.log('Result:', fibsRec(5)); 
