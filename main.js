#!/usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalkAnimation from "chalk-animation";
console.clear();
const sleep = (ms = 1000) => new Promise((resolve, reject) => setTimeout(resolve, ms));
async function welcome() {
    const rainbowTitle = chalkAnimation.pulse("COUNTDOWN TIMER");
    await sleep();
    rainbowTitle.stop();
}
await welcome();
var count = await inquirer.prompt([
    {
        name: "down",
        type: "number",
        message: "Input the seconds for countdown:",
        validate: (input) => {
            if (isNaN(input)) {
                return "Please enter valid input";
            }
            else if (input > 60) {
                return "seconds must be in 60";
            }
            else {
                return true;
            }
        }
    }
]);
var input = count.down;
async function countdown(value) {
    var initial = new Date().setSeconds(new Date().getSeconds() + value + 2);
    var interval = new Date(initial);
    setInterval(() => {
        var current = new Date();
        var difference = differenceInSeconds(interval, current);
        if (difference <= 0) {
            console.log(`Timer Expired`);
            process.exit();
        }
        ;
        var min = Math.floor((difference % (3600 * 24)) / 3600); // ( x% (150))/3600
        var sec = Math.floor(difference % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000);
}
countdown(input);
