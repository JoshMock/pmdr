#!/usr/bin/env node
'use strict';

const argv = require('argv');
const moment = require('moment');
const pkg = require('./package.json');

// get command line args
argv.version(pkg.version);
argv.option({
    name: 'time',
    short: 't',
    type: 'int',
    description: 'How long the timer should run (in minutes)',
    example: '"--time 25" or "-t 25"',
});
const args = argv.run();

let startTime = moment();

function calculateEndTime(start, duration) {
    return start.add(duration, 'minutes');
}

let endTime = calculateEndTime(startTime, args.options.time || 25);

function getSecondsLeft() {
    let now = moment().unix();
    let timeLeft = endTime.unix() - now;
    return timeLeft;
}

function formatSeconds(seconds) {
    let duration = moment.duration({ seconds });
    let secs = seconds;

    let hours = Math.floor(duration.as('hours'));
    secs = secs - (hours * 60 * 60);

    let minutes = Math.floor(duration.as('minutes'));
    secs = secs - (minutes * 60);

    hours = hours < 10 ? `0${hours}` : `${hours}`;
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    secs = secs < 10 ? `0${secs}` : `${secs}`;

    return `${hours}:${minutes}:${secs}`;
}

function checkIn() {
    let secondsLeft = getSecondsLeft();
    printTimeLeft();
    if (secondsLeft <= 0) {
        console.log('\x07'); // system beep
        process.exit();
    }
}

function printTimeLeft() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(formatSeconds(getSecondsLeft()));
}

setInterval(checkIn, 1000);
