$(document).ready(function () {
  // console.log('jQuery ready');

  function Parser () {
    // console.log('parser sanity check');

    // this.userString = userString
    this.verbSynonyms = ['go', 'get', 'use', 'look']
    this.nounSynonyms = ['north', 'east', 'south', 'west']
    this.approvedVerbs = ['go', 'get', 'use', 'look']

    this.stringToArray = () => {
      this.$userString = $('#user-input').val()
      // this breaks the string into words for parsing
      let workableArray = this.$userString.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').split(' ')
      return workableArray
    }

    this.findKeyword = (wordArrayType) => {
      // looks for the first approved verb in the string & returns that verb
      let workableArray = this.stringToArray()
      let words = wordArrayType

      for (let i = 0; i < workableArray.length; i++) {
        for (let it = 0; it < words.length; it++) {
          if (workableArray[i] === words[it]) {
            // console.log('Yay!!!! ' + workableArray[i] + ' DOES equal ' + words[it])
            return words[it]
          } else {
            // console.log(workableArray[i] + ' does not equal ' + words[it]);
          }
        }
      }
    }

    this.processInput = () => {
      // this takes the above couple functions and actually parses the string, returning the thing that the computer needs to do
      let theVerb = this.findKeyword(this.verbSynonyms)
      let theNoun = this.findKeyword(this.nounSynonyms)
      let output = {verb: theVerb, noun: theNoun}
      $('#chat-log').append('<li class="player-says">' + $('#user-input').val() + '</li>')
      $('#user-input').val('')
      console.log(output)
      return output

      // QUICK REFERENCE:
      // gameLogic.myParser.processInput()[0] => processed verb
      // gameLogic.myParser.processInput()[1] => processed noun
    }
  }

  function Rooms () {
    function RoomMaker (config) {
      // this is the template of all the rooms stored in a decorator function
      this.coordinates = config.coordinates
      this.description = config.description
      this.exits = { // whay does this notation work in combination with the this.var notation above?
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
      // RoomMaker.allRooms.push(this)
    }

    // RoomMaker.allRooms = []

    // The rooms
    this.room1 = new RoomMaker({
      coordinates: [0, 0, 0],
      north: [0, 1, 0], // when going north, move player to room with [x, y, z] coordinates
      east: [1, 0, 0],
      description: "This is the starting room. It's empty."
    })

    this.room2 = new RoomMaker({
      coordinates: [0, 1, 0],
      south: [0, 0, 0],
      description: "This is the northern room. It's empty."
    })

    this.room3 = new RoomMaker({
      coordinates: [1, 0, 0],
      west: [0, 0, 0],
      description: "This is the easterly room. It's empty."
    })
  }

  function Player (location) {
    this.location = location

    function PlayerMover () {
      // moves the player location to the coordinates listed in the direction typed
    }

    function PlayerUse () {
      // this prints the description
    }

    this.move = new PlayerMover()
    this.printStatus = new PlayerStatus()
  }

  myRooms = new Rooms()
  myParser = new Parser()
  myPlayer = new Player([0, 0, 0])

  $('#user-form').submit(function (event) {
    myParser.processInput()
  })
})

// debugger;
