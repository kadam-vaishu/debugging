// Bug 1: The Leaky Closure Accumulator (Shared State Leak)


// / // "Session hits: 1"
// // let globalCount = 0;

// function createSessionCounter() {
//     let globalCount = 0;
//     return function() {
//         globalCount += 1;
//         return `Session hits: ${globalCount}`;
//     };
// }

// const sessionA = createSessionCounter();
// const sessionB = createSessionCounter();

// console.log(sessionA()); // "Session hits: 1"
// console.log(sessionB()); // "Session hits: 1"

// Bug 2: The Mutant Cart Array (Impure In-Place Mutation)


// const dbCart = [
//     { id: 1, name: "Laptop", price: 50000 },
//     { id: 2, name: "Mouse", price: 1500 }
// ];

// function applyStoreDiscount(cart, discountRate) {
//     return cart.map(item => {
//         return {
//             ...item,
//             price: item.price * (1 - discountRate) // 🚨 Mutates original object reference!
//         };
//     });
// }
// const discountedCart = applyStoreDiscount(dbCart, 0.10);

// console.log(dbCart[0].price);
// console.log(discountedCart[0].price);
// Output: 50000 ✅ Correct: Original dbCart[0].price remains unchanged.

// Bug 3: The Broken Curried API Builder (Arity / Invocation Mismatch)

// 🚨 BUGGY CODE: Currying vs Multi-argument invocation mismatch
// const buildUrl = (domain) => (route) => (id) =>
//     `https://${domain}/${route}/${id}`;

// // A developer tries to pass two arguments in the first call:
// // const fetchUser = buildUrl("api.github.com", "users"); // ❌ Throws TypeError when called next!
// const fetchUser = buildUrl("api.github.com")("users");
// console.log(fetchUser(42));
// Expected: "https://api.github.com/users/42" 

// Bug 4: The Pipeline Type Mismatch (NaN Calculation Error)

// Broken Code Snippet:

// 🚨 BUGGY CODE: Type mismatch & order of execution bug
// const pipe = (...fns) => (val) => fns.reduce((acc, fn) => fn(acc), val);

// const addShipping = (price) => price + 50;
// const formatCurrency = (price) => `₹${price.toFixed(2)}`; // 🚨 Expects a number, returns a string!
// const applyTax = (price) => price * 1.18;                  // 🚨 Expects a number, fails on strings!

// // Pipeline assembly
// const calculateTotal = pipe(
//     addShipping,
//     // formatCurrency, // ⚠️ Formats into a string too early in the chain!
//     applyTax,
//     formatCurrency      // Multiplies string by 1.18 -> results in NaN!
// );

// console.log(calculateTotal(500)); // Output: NaN ❌ Expected: "₹649.00" 




