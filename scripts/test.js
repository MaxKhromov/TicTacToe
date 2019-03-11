let arr = [1, 2, 3, 4, 5, 8];
let arrString = arr.join('');
if (/0/i.test(arrString) && /1/i.test(arrString) && /2/i.test(arrString) || /3/i.test(arrString) && /4/i.test(arrString) && /5/i.test(arrString) || /6/i.test(arrString) && /7/i.test(arrString) && /8/i.test(arrString) || /0/i.test(arrString) && /3/i.test(arrString) && /6/i.test(arrString) || /1/i.test(arrString) && /4/i.test(arrString) && /7/i.test(arrString) || /2/i.test(arrString) && /5/i.test(arrString) && /8/i.test(arrString) || /0/i.test(arrString) && /4/i.test(arrString) && /8/i.test(arrString) || /2/i.test(arrString) && /4/i.test(arrString) && /6/i.test(arrString)) {
    console.log('you win');
}