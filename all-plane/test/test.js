// const md5 = require('md5')

// console.log(md5('gxlself'))
// console.log(md5('123456'))

// var p = Promise.resolve(32)
// p.then((v) => {
//   console.log(v)
//   return new Promise((resolve, reject) => {
//     resolve(v * 2)
//   })
// })
//   .then(k => {
//     console.log(`k is ${k}`)
//     return new Promise((resolve, reject) => {
//       console.log(`k * 2 second output ${k * 2}`)
//       resolve(k * 2)
//     })
//   })
//   .then(j => {
//     console.log(`j is ${j}`)
//   })

// function delay(time) {
//   time = time ? time : 0
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, time)
//   })
// }
// console.time()
// delay(1000)
//           .then(() => {
//             console.log(`step 1 is after 1000ms output`)
//           })
//           .then(() => {
//             console.log(`step 2 is after 1000ms output`)
//           })
//           .then(() => {
//             console.log(`step 3 is after 1000ms output`)
//             return delay(2000)
//           })
//           .then(() => {
//             console.log(`step 4 is after 2000ms`)
//             console.timeEnd()
//           })

// console.time()
// setTimeout(function() {
//   console.log(`step 1`)
//   console.log(`step 2`)
//   console.log(`step 3`)
//   setTimeout(() => {
//     console.log(`step 4`)
//     console.timeEnd()
//   }, 2000)
// }, 1000)

var aFunc_3 = function() {
	var MyFunc = function() {};
	return function() {
		return MyFunc;
	}
}
var f3 = aFunc_3();
var f4 = aFunc_3();
console.log(`f3 === f4 结果：${f3 === f4}`)