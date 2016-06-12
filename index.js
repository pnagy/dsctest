function RomanNumber (number) {

  this.int = null
  this.string = null

}

RomanNumber.prototype.toInt = function() {
  return null
}

RomanNumber.prototype.toString = function() {
  return null
}

function testRoman () {

  var number, tested, error, expected

  tested = 0
  error = 'invalid range'
  number = new RomanNumber(tested)
  try {
    var isEx = false
    number.toString()
  } catch (e) {
    isEx = true
    console.log("%s tested: %s error: %s", (e.message === error) ? "YES" : "NO", tested, error)
  } finally {
    if (!isEx) console.log("%s tested: %s error: %s", "NO", tested, error)
  }

  tested = null
  error = 'invalid value'
  number = new RomanNumber(tested)
  try {
    var isEx = false
    number.toInt()
  } catch (e) {
    isEx = true
    console.log("%s tested: %s error: %s", (e.message === error) ? "YES" : "NO", tested, error)
  } finally {
    if (!isEx) console.log("%s tested: %s error: %s", "NO", tested, error)
  }

  tested = ""
  error = 'invalid value'
  number = new RomanNumber(tested)
  try {
    var isEx = false
    number.toInt()
  } catch (e) {
    isEx = true
    console.log("%s tested: %s error: %s", (e.message === error) ? "YES" : "NO", tested, error)
  } finally {
    if (!isEx) console.log("%s tested: %s error: %s", "NO", tested, error)
  }

  tested = 10000
  error = 'invalid range'
  number = new RomanNumber(tested)
  try {
    var isEx = false
    number.toString()
  } catch (e) {
    isEx = true
    console.log("%s tested: %s error: %s", (e.message === error) ? "YES" : "NO", tested, error)
  } finally {
    if (!isEx) console.log("%s tested: %s error: %s", "NO", tested, error)
  }

  tested = 'MMMMCMXCIX'
  error = 'invalid value'
  number = new RomanNumber(tested)
  try {
    var isEx = false
    number.toInt()
  } catch (e) {
    isEx = true
    console.log("%s tested: %s error: %s", (e.message === error) ? "YES" : "NO", tested, error)
  } finally {
    if (!isEx) console.log("%s tested: %s error: %s", "NO", tested, error)
  }

  tested = '1473'
  error = 'invalid value'
  number = new RomanNumber(tested)
  try {
    var isEx = false
    number.toInt()
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

}

testRoman()

module.exports = RomanNumber;