var ERRORS = {
  INVALID_VALUE: "invalid value",
  INVALID_RANGE: "invalid range",
}

var ROMAN_DIGITS = ["I", "V", "X", "L", "C", "D", "M"]
var ARABIC_DIGITS = [1, 5, 10, 50, 100, 500, 1000]


var getValue = function (number) {
  if (typeof number === "string") return ARABIC_DIGITS[ROMAN_DIGITS.indexOf(number)]
  return null
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
  this.roman = checkRomanInput(number)

}

RomanNumber.prototype.toInt = function() {
  if (this.arabic !== null) return this.arabic
  var sum = 0
  var subsum = 0
  var skipDigit = false
  for (var j = 0; j < this.roman.length; ++j) {
    if (skipDigit) {
      skipDigit = false
      continue;
    }
    var currIndex = ROMAN_DIGITS.indexOf(this.roman[j])
    var prevIndex = ROMAN_DIGITS.indexOf(this.roman[j - 1])
    var nextIndex = ROMAN_DIGITS.indexOf(this.roman[j + 1])

    var arabValue = getValue(this.roman[j])
    //if we start a new calculation
    if (subsum === 0) {
      subsum = arabValue
      continue
    }

    //if we find a digit which is the same as the previous one eg. III, CC
    if (currIndex === prevIndex) {
      subsum = subsum + arabValue
    }
    //if we find a greater digit eg. IX, XL, CD
    if (currIndex > prevIndex) {
      sum += arabValue - subsum
      subsum = 0
    }
    //if we find a less digit eg. XI, LX
    if (currIndex < prevIndex) {
      //if we find a less digit but the next digit is greater again XIX, MCM
      if (currIndex < nextIndex) {
        sum += subsum + getValue(this.roman[j+1]) - arabValue
        subsum = 0
        //we used the next digit, so we need to skip the next iteration
        skipDigit = true
      } else {
        sum += arabValue + subsum
        subsum = 0
      }
    }
  }
  return sum + subsum
}

RomanNumber.prototype.toString = function() {
  if (this.roman !== null) return this.roman
  var num = ""
  var rem = this.arabic
  var curr

  if (rem > 999) {
    curr = Math.floor(rem / 1000)
    rem = rem % 1000
    for (var i = 0; i < curr; ++i) {
      num += "M"
    }
  }
  if (rem >= 900) {
    num += "CM"
    rem -= 900
  }
  if (rem >= 500) {
    num += "D"
    rem -= 500
  }
  if (rem >= 400) {
    num += "CD"
    rem -= 400
  }

  if (rem > 99) {
    curr = Math.floor(rem / 100)
    rem = rem % 100
    for (var i = 0; i < curr; ++i) {
      num += "C"
    }
  }
  if (rem >= 90) {
    num += "XC"
    rem -= 90
  }
  if (rem >= 50) {
    num += "L"
    rem -= 50
  }
  if (rem >= 40) {
    num += "LX"
    rem -= 40
  }

  if (rem > 9) {
    curr = Math.floor(rem / 10)
    rem = rem % 10
    for (var i = 0; i < curr; ++i) {
      num += "X"
    }
  }
  if (rem === 9) {
    num += "IX"
    rem -= 9
  }
  if (rem >= 5) {
    num += "V"
    rem -= 5
  }
  if (rem === 4) {
    num += "IV"
    rem -= 4
  }
  curr = rem
  for (var i = 0; i < curr; ++i) {
    num += "I"
  }
  return num
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