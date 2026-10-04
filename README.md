# Recursion Practice — Count Odd Digits

## Question 7 🟡

Write a recursive function that counts how many **odd digits** are present in a given number.

### Problem

```js
function countOddDigits(n) {
    // your code
}

console.log(countOddDigits(1234567));
```

### Expected Output

```text
4
```

Because the odd digits are:

```text
1, 3, 5, 7
```

Therefore:

```text
1 + 1 + 1 + 1 = 4
```

---

## Constraints

- Use **recursion only**
- No loops
- Don't convert the number to a string

You already know:

```js
n % 10
Math.floor(n / 10)
```

---

## Think Before Coding

Ask yourself three questions.

### 1. What is the base case?

When there are no digits left:

```js
if (n === 0) return 0;
```

Therefore:

```text
Base case = 0
```

### 2. What should an odd digit contribute?

If the current digit is odd:

```text
Contribution = 1
```

### 3. What should an even digit contribute?

If the current digit is even:

```text
Contribution = 0
```

---

## Solution

Your approach is correct:

```js
function countOddDigits(n) {

    if (n === 0) return 0;

    let lastDigit = Math.floor(n % 10);

    if (lastDigit % 2 !== 0) {
        return 1 + countOddDigits(Math.floor(n / 10));
    } else {
        return 0 + countOddDigits(Math.floor(n / 10));
    }
}

console.log(countOddDigits(1234567));
```

### Output

```text
4
```

---

## Small Improvement

In your original solution, you wrote:

```js
return 1 + Math.floor(countOddDigits(n / 10));
```

The `Math.floor()` should not be applied to the **recursive result**.

Instead:

```js
countOddDigits(Math.floor(n / 10))
```

Why?

Because `Math.floor()` is needed to remove the last digit **before making the recursive call**.

For example:

```text
1234567
   ↓
Math.floor(1234567 / 10)
   ↓
123456
```

The recursive function should receive:

```js
countOddDigits(123456)
```

not:

```js
Math.floor(countOddDigits(1234567 / 10))
```

---

# Dry Run

Let's trace:

```js
countOddDigits(1234567)
```

### Step 1

```text
n = 1234567
lastDigit = 7
```

`7` is odd:

```text
contribution = 1
```

Next:

```text
countOddDigits(123456)
```

---

### Step 2

```text
n = 123456
lastDigit = 6
```

`6` is even:

```text
contribution = 0
```

Next:

```text
countOddDigits(12345)
```

---

### Step 3

```text
n = 12345
lastDigit = 5
```

`5` is odd:

```text
contribution = 1
```

Next:

```text
countOddDigits(1234)
```

---

### Step 4

```text
n = 1234
lastDigit = 4
```

`4` is even:

```text
contribution = 0
```

Next:

```text
countOddDigits(123)
```

---

### Step 5

```text
n = 123
lastDigit = 3
```

`3` is odd:

```text
contribution = 1
```

Next:

```text
countOddDigits(12)
```

---

### Step 6

```text
n = 12
lastDigit = 2
```

`2` is even:

```text
contribution = 0
```

Next:

```text
countOddDigits(1)
```

---

### Step 7

```text
n = 1
lastDigit = 1
```

`1` is odd:

```text
contribution = 1
```

Next:

```text
countOddDigits(0)
```

---

### Step 8 — Base Case

```js
if (n === 0) return 0;
```

So:

```text
countOddDigits(0) → 0
```

---

# Recursion Unwinding

Now the answers return upward:

```text
countOddDigits(0)
→ 0

countOddDigits(1)
→ 1 + 0
→ 1

countOddDigits(12)
→ 0 + 1
→ 1

countOddDigits(123)
→ 1 + 1
→ 2

countOddDigits(1234)
→ 0 + 2
→ 2

countOddDigits(12345)
→ 1 + 2
→ 3

countOddDigits(123456)
→ 0 + 3
→ 3

countOddDigits(1234567)
→ 1 + 3
→ 4
```

Final answer:

```text
4
```

---

# Recursion Pattern

The important pattern is:

```js
if (baseCase) return 0;

let currentValue = ...;

if (condition) {
    return 1 + recursiveCall(smallerProblem);
} else {
    return 0 + recursiveCall(smallerProblem);
}
```

For this problem:

```js
if (lastDigit % 2 !== 0) {
    return 1 + countOddDigits(Math.floor(n / 10));
} else {
    return 0 + countOddDigits(Math.floor(n / 10));
}
```

The key idea is:

> **Every recursive call processes exactly one digit and contributes either `1` or `0`.**

---

# Cleaner Version

You can also write the same logic using a ternary operator:

```js
function countOddDigits(n) {

    if (n === 0) return 0;

    let lastDigit = n % 10;

    return (lastDigit % 2 !== 0 ? 1 : 0)
        + countOddDigits(Math.floor(n / 10));
}

console.log(countOddDigits(1234567));
```

Output:

```text
4
```

Notice that `Math.floor(n % 10)` isn't necessary either.

Since `% 10` already gives the integer last digit for a positive integer:

```js
1234567 % 10 // 7
```

---

# Complexity

If the number contains `d` digits:

```text
Time:  O(d)
Space: O(d)
```

Every digit is processed once, and there are `d` recursive calls on the call stack.

---

# Practice

Try these yourself:

```js
countOddDigits(123)      // 2
countOddDigits(2468)     // 0
countOddDigits(13579)    // 5
countOddDigits(1001)     // 2
countOddDigits(22222)    // 0
countOddDigits(987654)   // 3
countOddDigits(0)        // 0
```

---

# What You Learned

### Question 5 — Sum Digits

```text
current digit + recursive result
```

### Question 6 — Count Even Digits

```text
even → 1
odd  → 0
```

### Question 7 — Count Odd Digits

```text
odd  → 1
even → 0
```

The bigger pattern is:

```text
                 Number
                    ↓
             Extract last digit
                    ↓
            Process current digit
                    ↓
          Remove last digit
                    ↓
        Recursive call on remainder
                    ↓
              Combine result
```

This is the core recursive technique you're building through these digit problems.
