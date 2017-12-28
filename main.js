$(document).ready(function () {
  // console.log('jQuery ready');

  function Game () {
    function Parser (userString) {
      // console.log('parser sanity check');

      this.userString = userString
      this.approvedVerbs = ['go', 'get', 'use', 'look']
      this.approvedNouns = ['north', 'east', 'south', 'west']

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
              console.log('Yay!!!! ' + workableArray[i] + ' DOES equal ' + words[it])
              return words[it]
            } else {
              console.log(workableArray[i] + ' does not equal ' + words[it]);
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

    function Rooms () {
      function RoomMaker (config) {
        // this is the template of all the rooms stored in a decorator function
        this.x = config.x
        this.y = config.y
        this.z = config.z
        this.description = config.description
        this.exits = {
          north: config.north,
          northEast: config.northEast,
          east: config.east,
          southEast: config.southEast,
          south: config.south,
          southWest: config.southWest,
          west: config.west,
          northWest: config.northWest,
          up: config.up,
          down: config.down
        }
        this.items = {}
      }

      this.room1 = new RoomMaker({
        x: 0,
        y: 0,
        z: 0,
        north: [0, 1, 0],
        east: [1, 0, 0],
        description: "This is the starting room. It's empty."
      })
    }

    let fromForm
    this.myRooms = new Rooms()
    this.myParser = new Parser(fromForm)
  }

  gameLogic = new Game()
})

// debugger;
