// logger.js
const fs = require('fs');
const readline = require('readline');
const EventEmitter = require('events');
const taskModule = require('./taskModule'); // Task 15 import

console.log("Task Logger Started"); // Task 1

/* Task 2: Understanding V8 and libuv
 * The V8 engine compiles and executes JavaScript synchronously. When an asynchronous operation 
 * is encountered, it's passed to libuv. Libuv handles it in the background. Once done, 
 * the callback is queued in the event loop and eventually pushed back to V8's call stack.
 */

// Task 2: Non-blocking demonstration
fs.writeFileSync('dummy.txt', 'This is some file content.');
fs.readFile('dummy.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log("File contents:", data);
});
console.log("This message prints immediately, before the file contents are logged.");

// Task 5: Command-line arguments
const taskArgument = process.argv[2];
if (taskArgument) {
    console.log("Task from argument:", taskArgument);
}

// Task 9: Timers
setTimeout(() => {
    console.log("Reminder: review your tasks");
}, 5000);

let tasksLoggedCount = 0;
const intervalId = setInterval(() => {
    tasksLoggedCount++;
    console.log(`Number of tasks logged so far: ${tasksLoggedCount}`);
}, 3000);

setTimeout(() => {
    clearInterval(intervalId);
    console.log("Interval cleared.");
}, 15000);

// Task 14: EventEmitter
const taskEmitter = new EventEmitter();
taskEmitter.on('taskAdded', (task) => {
    console.log(`New task added: ${task}`);
});

// Task 11 & 14 Async function
async function saveTaskAsync(task) {
    try {
        await taskModule.saveTaskPromise(task);
        console.log("Success: Task saved using Async/Await.");
        taskEmitter.emit('taskAdded', task); // Trigger event
    } catch (error) {
        console.error("Failure: Caught error in async function.", error.message);
    }
}
saveTaskAsync('Master Async/Await');

async function triggerError() {
    try {
        await taskModule.saveTaskPromise('This will fail', './non_existent_folder/tasks.txt');
    } catch (error) {
         console.error("Expected Failure: Catch block fired successfully due to bad path.", error.message);
    }
}
triggerError();

// Task 13: Event Loop
console.log("1. Synchronous Console Log");
setTimeout(() => {
    console.log("3. SetTimeout");
}, 0);
Promise.resolve().then(() => {
    console.log("2. Promise Resolved");
});

// Task 5: readline interface at the end to keep script open
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Do you want to save the task? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
        console.log("Task saved successfully!");
    } else {
        console.log("Task saving cancelled.");
    }
    rl.close();
});
