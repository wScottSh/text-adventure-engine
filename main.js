$(document).ready(function () {
  // console.log("jQuery ready");

  function Game () {
    function Parser (userString) {
      // console.log("parser sanity check");

      this.userString = userString
      this.approvedVerbs = ['go', 'get', 'use']
      this.approvedNouns = ['fart', 'north']

      this.stringToArray = () => {
        // this breaks the string into words for parsing
        let lowerCaseString = this.userString.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ')
        let workableArray = lowerCaseString.split(' ')
        return workableArray
      }

      this.findKeyword = (wordArrayType) => {
        // looks for the first approved verb in the string & returns that verb
        let workableArray = this.stringToArray()
        let words = wordArrayType

        for (let i = 0; i < workableArray.length; i++) {
          for (let it = 0; it < words.length; it++) {
            if (workableArray[i] === words[it]) {
              return words[it]
            }
          }
        }
      }

      this.processInput = () => {
        // this takes the above couple functions and actually parses the string, returning the thing that the computer needs to do
        let noun = this.findKeyword(this.approvedNouns)
        let verb = this.findKeyword(this.approvedVerbs)
        return [verb, noun]

        // QUICK REFERENCE:
        // gameLogic.myParser.processInput()[0] => processed verb
        // gameLogic.myParser.processInput()[1] => processed noun
      }
    }

    function Player () {
      // contains all of the code for moving the player and interacting with the world.
    }

    function Rooms () {
      function RoomMaker (x, y, z, n, ne, e, se, s, sw, w, nw, u, d, descString) {
        // this is the template of all the rooms stored in a decorator functions
        let xLocation = x
        let yLocation = y
        let zLocation = z
        let description = descString
        let exits = {
          north: n,
          northEast: ne,
          east: e,
          southEast: se,
          south: s,
          southWest: sw,
          west: w,
          northWest: nw,
          up: u,
          down: d
        }
        // let interactions = {intractionArray} // add the things via the param array
      }
      this.room1 = new RoomMaker(0, 0, 0, true, false, true, false, false, false, false, false, false, false, 'You are standing in a room. There is nothing around.')
    }

    fromForm = 'this is a huge \ string go that test the Limits of WhAt C.an be ))   north      ((^&$%^#^) done with the fart)'
    this.myRooms = new Rooms()
    this.myParser = new Parser(fromForm)
  };

  gameLogic = new Game()
})

// debugger;
