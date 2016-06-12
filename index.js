var ERRORS = {
  INVALID_VALUE: "invalid value",
  INVALID_RANGE: "invalid range",
}

var ROMAN_DIGITS = ["I", "V", "X", "L", "C", "D", "M"]

var checkInput = function (number) {


  throw new Error(ERRORS.INVALID_VALUE)
}

var checkArabicInput = function(number) {
  if (typeof  number === "number") {
    //check number range
    if (number < 1 || number > 3999) throw new Error(ERRORS.INVALID_RANGE)
    return number
  }
  return null
}

var checkRomanInput = function(number) {
  if (typeof  number === "string") {
    //empty string not allowed
    if (number.length === 0) throw new Error(ERRORS.INVALID_VALUE)
    for (var i = 0; i < number.length; ++i) {
      //every character should be a roman digit
      if (ROMAN_DIGITS.indexOf(number[i]) < 0) throw new Error(ERRORS.INVALID_VALUE)
      // more than 3 repeating digit is not allowed
      if ((i > 2) && (number[i] === number[i - 1]) && (number[i - 2] === number[i - 1]) && (number[i - 3] === number[i - 2])) throw new Error(ERRORS.INVALID_VALUE)
    }
    return number
  }
  return null
}


function RomanNumber (number) {

  if (!number) throw new Error(ERRORS.INVALID_VALUE)
  this.arabic = checkArabicInput(number)
  this.string = checkRomanInput(number)

}

RomanNumber.prototype.toInt = function() {
  if (this.arabic !== null) return this.arabic
}

RomanNumber.prototype.toString = function() {
  if (this.roman !== null) return this.roman
}

function testRoman () {

  var number, tested, error, expected

  tested = 0
  error = ERRORS.INVALID_VALUE
  try {
    var isEx = false
    number = new RomanNumber(tested)
  } catch (e) {
    isEx = true
    console.log("%s tested: %s error: %s", (e.message === error) ? "YES" : "NO", tested, error)
  } finally {
    if (!isEx) console.log("%s tested: %s error: %s", "NO", tested, error)
  }

  tested = null
  error = ERRORS.INVALID_VALUE
  try {
    var isEx = false
    number = new RomanNumber(tested)
  } catch (e) {
    isEx = true
    console.log("%s tested: %s error: %s", (e.message === error) ? "YES" : "NO", tested, error)
  } finally {
    if (!isEx) console.log("%s tested: %s error: %s", "NO", tested, error)
  }

  tested = ""
  error = ERRORS.INVALID_VALUE
  try {
    var isEx = false
    number = new RomanNumber(tested)
  } catch (e) {
    isEx = true
    console.log("%s tested: %s error: %s", (e.message === error) ? "YES" : "NO", tested, error)
  } finally {
    if (!isEx) console.log("%s tested: %s error: %s", "NO", tested, error)
  }

  tested = 10000
  error = ERRORS.INVALID_RANGE
  try {
    var isEx = false
    number = new RomanNumber(tested)
  } catch (e) {
    isEx = true
    console.log("%s tested: %s error: %s", (e.message === error) ? "YES" : "NO", tested, error)
  } finally {
    if (!isEx) console.log("%s tested: %s error: %s", "NO", tested, error)
  }

  tested = 'MMMMCMXCIX'
  error = ERRORS.INVALID_VALUE
  try {
    var isEx = false
    number = new RomanNumber(tested)
  } catch (e) {
    isEx = true
    console.log("%s tested: %s error: %s", (e.message === error) ? "YES" : "NO", tested, error)
  } finally {
    if (!isEx) console.log("%s tested: %s error: %s", "NO", tested, error)
  }

  tested = '1473'
  error = ERRORS.INVALID_VALUE
  try {
    var isEx = false
    number = new RomanNumber(tested)
  } catch (e) {
    isEx = true
    console.log("%s tested: %s error: %s", (e.message === error) ? "YES" : "NO", tested, error)
  } finally {
    if (!isEx) console.log("%s tested: %s error: %s", "NO", tested, error)
  }

  tested = 1
  expected = "I"
  number = new RomanNumber(tested)
  console.log("%s tested: %s expected: %s", (number.toString() === expected) ? "YES" : "NO", tested, expected)

  tested = 3
  expected = "III"
  number = new RomanNumber(tested)
  console.log("%s tested: %s expected: %s", (number.toString() === expected) ? "YES" : "NO", tested, expected)

  tested = 4
  expected = "IV"
  number = new RomanNumber(tested)
  console.log("%s tested: %s expected: %s", (number.toString() === expected) ? "YES" : "NO", tested, expected)

  tested = 5
  expected = "V"
  number = new RomanNumber(tested)
  console.log("%s tested: %s expected: %s", (number.toString() === expected) ? "YES" : "NO", tested, expected)

  tested = 1968
  expected = "MCMLXVIII"
  number = new RomanNumber(tested)
  console.log("%s tested: %s expected: %s", (number.toString() === expected) ? "YES" : "NO", tested, expected)

  tested = 2999
  expected = "MMCMXCIX"
  number = new RomanNumber(tested)
  console.log("%s tested: %s expected: %s", (number.toString() === expected) ? "YES" : "NO", tested, expected)

  tested = 3000
  expected = "MMM"
  number = new RomanNumber(tested)
  console.log("%s tested: %s expected: %s", (number.toString() === expected) ? "YES" : "NO", tested, expected)

  tested = "I"
  expected = 1
  number = new RomanNumber(tested)
  console.log("%s tested: %s expected: %s", (number.toInt() === expected) ? "YES" : "NO", tested, expected)

  tested = "III"
  expected = 3
  number = new RomanNumber(tested)
  console.log("%s tested: %s expected: %s", (number.toInt() === expected) ? "YES" : "NO", tested, expected)

  tested = "IV"
  expected = 4
  number = new RomanNumber(tested)
  console.log("%s tested: %s expected: %s", (number.toInt() === expected) ? "YES" : "NO", tested, expected)

  tested = "V"
  expected = 5
  number = new RomanNumber(tested)
  console.log("%s tested: %s expected: %s", (number.toInt() === expected) ? "YES" : "NO", tested, expected)

  tested = "CDXXIX"
  expected = 429
  number = new RomanNumber(tested)
  console.log("%s tested: %s expected: %s", (number.toInt() === expected) ? "YES" : "NO", tested, expected)

  tested = "MCDLXXXII"
  expected = 1482
  number = new RomanNumber(tested)
  console.log("%s tested: %s expected: %s", (number.toInt() === expected) ? "YES" : "NO", tested, expected)

  tested = "MCMLXXX"
  expected = 1980
  number = new RomanNumber(tested)
  console.log("%s tested: %s expected: %s", (number.toInt() === expected) ? "YES" : "NO", tested, expected)

}

testRoman()

module.exports = RomanNumber;