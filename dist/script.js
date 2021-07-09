doSomething().then(function () {
  return doSomethingElse()
})

doSomething().then(function () {
  doSomethingElse()
})

doSomething().then(doSomethingElse())

doSomething().then(doSomethingElse)