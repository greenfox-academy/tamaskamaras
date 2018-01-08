'use strict'

// Write a program that draws a
// diamond like this:
//
//
//    *
//   ***
//  *****
// *******
//  *****
//   ***
//    *
//
// The diamond should have as many lines as lineCount is

var lineCount = 7;

let upIteration = Math.ceil(lineCount / 2);

let stars = '*'
for (let i = 1; i < upIteration + 1; i++) {
    console.log(
        ' '.repeat(upIteration - i) +
        stars
    )
    stars += '**'
}

let downIteration = Math.floor(lineCount / 2);
for (let i = 0; i < upIteration + 1; i++) {
    console.log(
        ' '.repeat(i) +
        '*'.repeat(2 * upIteration - (i * 2) ))
}














////////////////////////////////////

// console.log(' ')
// let star1 = '*';
// let spaces1 = (lineCount / 2);

// for (let i = 1; i < ((lineCount / 2) + 1); i++) {
//     console.log(
//         ' '.repeat(spaces1) + 
//         star1);
//     star1 += '**';
//     spaces1--;
// }

// let iteration = Math.floor(lineCount / 2)

// let star2 = iteration + 2
// for (let a = 1; a < (iteration + 1); a++) {
//     console.log(' '.repeat(a) + '*'.repeat(star2))
//     star2 -= 2;
// }
