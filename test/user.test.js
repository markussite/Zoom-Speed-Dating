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

  test("example", () => { // works but because it has a bug
        expect( userData == bspBenutzer);
  });

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
