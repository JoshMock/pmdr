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
let endTime = startTime.add(args.options.time || 25, 'minutes');

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

function printTimeLeft() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(formatSeconds(getSecondsLeft()));
}

setInterval(printTimeLeft, 1000);
