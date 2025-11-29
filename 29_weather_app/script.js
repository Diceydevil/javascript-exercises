console.log("First");

console.log("Starting slow operation...");
// Simulate a slow operation with a loop
let endTime = Date.now() + 3000; // 3 seconds from now
while (Date.now() < endTime) {
    // Do nothing, just wait
}
console.log("Slow operation completed!");

console.log("Third");