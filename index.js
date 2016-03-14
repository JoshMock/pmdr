#!/usr/bin/env node
'use strict';

const argv = require('argv');
const moment = require('moment');
const pkg = require('./package.json');

function setupArgs() {
    // get command line args
    argv.version(pkg.version);
    argv.option({
        name: 'time',
        short: 't',
        type: 'int',
        description: 'How long the timer should run (in minutes)',
        example: '"--time 25" or "-t 25"',
    });
    return argv.run();
}

function calculateEndTime(start, duration) {
    return start.add(duration, 'minutes');
}

function getSecondsLeft() {
    const now = moment().unix();
    return endTime.unix() - now;
}

function formatSeconds(seconds) {
    const duration = moment.duration({ seconds });
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
    printTimeLeft();

    const secondsLeft = getSecondsLeft();
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

const args = setupArgs();
const startTime = moment();
const endTime = calculateEndTime(startTime, args.options.time || 25);
setInterval(checkIn, 1000);
