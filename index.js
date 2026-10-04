/*


# Question 7 🟡

Let's make the problem slightly more challenging.

## Count the number of odd digits

Write:

```js
function countOddDigits(n) {
    // your code
}

console.log(countOddDigits(1234567));
```

Expected:

```text
4
```

Because:

```text
1, 3, 5, 7
```

are odd.

### Constraints

* Recursion only
* No loops
* Don't convert the number to a string

You already know:

```js
n % 10
Math.floor(n / 10)
```

Try it yourself.

**Don't copy Question 6 and blindly change `even` to `odd`. Think about what the current digit should contribute to the result.**

*/


function countOddDigits(n) {
    // your code
    if(n=== 0) return 0;
    let lastDigit = Math.floor(n%10);
    if(lastDigit %2 !== 0){
        return 1 + Math.floor(countOddDigits(n/10))
    }else{
        return 0 + Math.floor(countOddDigits(n/10))
    }
}

console.log(countOddDigits(1234567));