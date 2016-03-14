# PMDR

Try out the [Pomodoro time management technique](http://pomodorotechnique.com/)
in your terminal!

## Usage

Start a 25-minute countdown (the default):

```bash
pmdr
```

Start a countdown for a custom number of minutes (in this case, 10):

```bash
pmdr --time 10
```

## TODO

- [ ] Command for taking breaks
- [ ] A way to track pomodoro sessions in a file
- [ ] A way to run arbitrary scripts on timer start, timer end, breaks, etc.
- [ ] Prompt at the end of a session if they want to start a timed break, exit
  the process, start a new pomodoro, etc.
- [ ] Add a note to describe what is being accomplished during the next
  pomodoro session
