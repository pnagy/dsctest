var ERRORS = {
  INVALID_VALUE: "invalid value",
  INVALID_RANGE: "invalid range",
}

var ROMAN_DIGITS = ["I", "V", "X", "L", "C", "D", "M"]
var ARABIC_DIGITS = [1, 5, 10, 50, 100, 500, 1000]


var getArabicValue = function (number) {
  if (typeof number === "string") return ARABIC_DIGITS[ROMAN_DIGITS.indexOf(number)]
  return null
}

var getRomanValue = function (number) {
  if (typeof number === "number") return ROMAN_DIGITS[ARABIC_DIGITS.indexOf(number)]
  return null
}

var checkArabicInput = function(number) {
  if (typeof  number === "number") {
    //check number range
    if (number < 1 || number > 3999) throw new Error(ERRORS.INVALID_RANGE)
    return number
  }
  return 0
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
  return ""
}


function RomanNumber (number) {

  if (!number) throw new Error(ERRORS.INVALID_VALUE)
  this.arabic = checkArabicInput(number)
  this.roman = checkRomanInput(number)

}

RomanNumber.prototype.toInt = function() {
  if (this.arabic) return this.arabic

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

    var arabValue = getArabicValue(this.roman[j])
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
      this.arabic += arabValue - subsum
      subsum = 0
    }
    //if we find a less digit eg. XI, LX
    if (currIndex < prevIndex) {
      //if we find a less digit but the next digit is greater again XIX, MCM
      if (currIndex < nextIndex) {
        this.arabic += subsum + getArabicValue(this.roman[j+1]) - arabValue
        subsum = 0
        //we used the next digit, so we need to skip the next iteration
        skipDigit = true
      } else {
        this.arabic += arabValue + subsum
        subsum = 0
      }
    }
  }
  this.arabic += subsum
  return this.arabic
}

function getDigitValues(number, base) {
  var romanDigits = [9, 5, 4]
  var roman = ""
  for (var i = 0; i < romanDigits.length; ++i) {
    if (number >= (romanDigits[i] * base)) {
      var value = getRomanValue(romanDigits[i] * base)
      if (value) {
        roman += value
      } else {
        roman += getRomanValue(base) + getRomanValue((romanDigits[i] + 1) * base)
      }
      number -= (romanDigits[i] * base)
    }
  }
  for (var i = 0; i < Math.floor(number / base); ++i) {
    roman += getRomanValue(base)
  }
  return roman
}

RomanNumber.prototype.toString = function() {
  if (this.roman) return this.roman

  var remaining = this.arabic
  while (remaining > 0) {
    var base = Math.pow(10, Math.floor(Math.log10(remaining)))
    var part = Math.trunc(remaining / base) * base
    this.roman += getDigitValues(part, base)
    remaining -= part
  }
  return this.roman
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