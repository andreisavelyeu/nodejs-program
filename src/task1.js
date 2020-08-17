process.stdin.on('data', data => {
    const reversedString = data.reverse().toString();
    process.stdout.write(`${reversedString}\n`);
});

