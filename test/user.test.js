const User = require("../models/user");
const UserController = require("../controllers/userController");


const userData = {
  name: 'Hermes',
  geschlecht: 'Männlich',
  alter: 23,
  hobbys: 'Sport',
  sucht: 'habe schon',
  interessiert: 'keine',
  wohnort: 'Berlin',
  religion: 'keine'
}

const bspBenutzer = {
  name: 'Hermes',
  geschlecht: 'Männlich',
  alter: 23,
  hobbys: 'Sport',
  sucht: 'habe schon',
  interessiert: 'keine',
  wohnort: 'Berlin',
  religion: 'keine'
}

  //test("example", () => {
    //const benutzer = new User("Hermes", "Man", 23, "Sport", "habe schon", "keine Interesse", "Berlin", "god");
    //const bspBenutzer = new User("Hermes", "Man", 23, "Sport", "habe schon", "keine Interesse", "Berlin", "god");
    //expect( benutzer == bspBenutzer);
  //});

  test("save user", function (done) {
    const testBenutzer = new UserController(userData)
    testBenutzer.save()
    .then(() => {
      UserController.find({})
      .then(result => {
        expect(testBenutzer == 1)
        done()
      })
    })
    .catch((error) => {
      done(error.message)
    })
  })
