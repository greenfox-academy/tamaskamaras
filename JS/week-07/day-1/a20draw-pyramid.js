'use strict'

var lineCount = 4;

// Write a program that draws a
// pyramid like this:
//
//
//    *
//   ***
//  *****
// *******
//
// The pyramid should have as many lines as lineCount is

// for (let j = (lineCount - 1); j > 0; j--) {
//     console.log('x'.repeat(j));
// }

let stars = '*'
for (let i = 1; i < lineCount + 1; i++) {
    console.log(
        ' '.repeat(lineCount - i) +
        stars
    )
    stars += '**'
}