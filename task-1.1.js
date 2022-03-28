process.stdin.resume();
process.stdin.setEncoding('utf-8');

console.log('Enter the data to be displayed:');
process.stdin.on(
    'data',
    (data) => {
        process.stdout.write(`${Array.from(data.trim().toString()).reverse().join("")}\n\n`);
    }
);
