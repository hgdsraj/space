QUnit.module('Space')

var _chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'

var randomString = function(min, max) {
  var string = ''
  length = (Math.round(Math.random() * (max - min))) + min
  
  for (var i = 0; i < length; i++) {
    var randomNumber = Math.floor(Math.random() * _chars.length)
    string += _chars.substring(randomNumber, randomNumber + 1)
  }
  
  return string
}

// Experimental method for quickly generating perf test data
var randomSpace = function (rows, depthOdds) {
  var space = new Space(),
      depthOdds = depthOdds || 0,
      property = '',
      value = ''

  while (rows > 0) {
    property = randomString(3, 6)

    // Nest
    if (depthOdds > Math.random())
      space.append(property, randomSpace(3, depthOdds))

    // Or set a leaf
    else {
      value = randomString(4, 8)
      space.append(property, value)
    }

    rows--
  }
  return space
}


test('Space', function() {
  Space._load2 = false
  var a = randomSpace(10000, 0.2).toString()
  
  var t = new Date().getTime()
  b = new Space(a)
  
  Space._load2 = true
  t = new Date().getTime()
  c = new Space(a)

  Space._load2 = false
  t = new Date().getTime()
  d = new Space(a)

  Space._load2 = true
  t = new Date().getTime()
  e = new Space(a)

  j = JSON.stringify(e.toObject())
  t = new Date().getTime()
  m = JSON.parse(j)
  ok(true)
})

