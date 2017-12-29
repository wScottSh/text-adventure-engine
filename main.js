$(document).ready(function () {
  // console.log('jQuery ready');
  // debugger

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
      player.performAction(output)

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
      this.exits = { // why does this notation work in combination with the 'this.var' notation above?
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

    this.roomLister = (maxRooms) => {
      for (let i = 0; i <= maxRooms; i++) {
        let roomName = 'room' + i
        this.roomArray.push(rooms[roomName]['coordinates'])
      }
    }

    this.roomArray = []

    // The rooms
    this.room0 = new RoomMaker({
      coordinates: [0, 0, 0],
      north: [0, 1, 0], // when going north, move player to room coords [x, y, z]
      east: [1, 0, 0],
      description: "This is the starting room. It's empty."
    })

    this.room1 = new RoomMaker({
      coordinates: [0, 1, 0],
      south: [0, 0, 0],
      description: "This is the northern room. It's empty."
    })

    this.room2 = new RoomMaker({
      coordinates: [1, 0, 0],
      west: [0, 0, 0],
      description: "This is the easterly room. It's empty."
    })
  }

  function Player (location) {
    this.location = location

    this.performAction = (words) => {
      console.log('Performing input on the words ' + words.verb + ' and ' + words.noun)
      if (words.verb === 'look') {
        player.look()
      }
    }

    this.look = () => {
      // this prints the room description and any exits
      console.log('LOOK!')
      $('#chat-log').append('<li class="compy-says">' + rooms.room0.description + '</li>')
    }

    this.move = () => {
      // moves the player location to the coordinates listed in the direction typed
      console.log('MOVE!')
    }

    this.use = () => {
      // this is the interaction function. Either items in your inventory, or items in the world that are interactable but not pickupable.
      console.log('USE!')
    }

    this.get = () => {
      // this is the function that adds items to your inventory
      console.log('GET!')
    }
  }
// debugger
  rooms = new Rooms()
  parser = new Parser()
  player = new Player([0, 0, 0])
  rooms.roomLister(2)

  $('#user-form').submit(function (event) {
    parser.processInput()
  })
})
