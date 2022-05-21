const fibonacci = (n, s = []) => n < 2 ? n : (s[n - 1]) + (s[n - 2])


const getFibonacciSeries = num => {
    let stack = [];

    for (let i = 0; i < num; i++) {

        stack.push(fibonacci(i, stack));
    }

    console.log(stack);
}

getFibonacciSeries(7);