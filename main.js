$(document).ready(function () {
  // console.log('jQuery ready');
  // debugger
  const $compySays = (say) => {
    $('#chat-log').append('<li class=\'compy-says\'>' + say + '</li>')
  }

  function Parser () {
    // this.userString = userString
    this.verbSynonyms = ['go', 'get', 'use', 'look']
    this.nounSynonyms = ['north', 'east', 'south', 'west']
    this.approvedVerbs = ['go', 'get', 'use', 'look']

    this.stringToArray = () => {
      this.$userString = $('#user-input').val()
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
            return words[it]
          }
        }
      }
    }

    this.processInput = () => {
      let theVerb = this.findKeyword(this.verbSynonyms)
      let theNoun = this.findKeyword(this.nounSynonyms)
      let output = {verb: theVerb, noun: theNoun}
      $('#chat-log').append('<li class=\'player-says\'>' + $('#user-input').val() + '</li>')
      $('#user-input').val('') // clears the input field
      player.performAction(output)
    }
  }

  function Rooms () {
    function RoomMaker (config) {
      this.coordinates = config.coordinates
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
      description: 'This is the starting room. It\'s empty.'
    })

    this.room1 = new RoomMaker({
      coordinates: [0, 1, 0],
      south: [0, 0, 0],
      description: 'This is the northern room. It\'s empty.'
    })

    this.room2 = new RoomMaker({
      coordinates: [1, 0, 0],
      west: [0, 0, 0],
      description: 'This is the easterly room. It\'s empty.'
    })
  }

  function Player (coords) {
    this.myCoords = coords
    this.myRoom
    this.myExits

    this.findMyRoom = () => {
      for (let i = 0; i < rooms.roomArray.length; i++) {
        let roomName = 'room' + i
        if (rooms[roomName]['coordinates'].join() === player.myCoords.join()) {
          player.myRoom = rooms[roomName]
          player.findExits(player.myRoom)
          return
        }
      }
    }

    this.findExits = (currentRoom) => {
      // use current room to determine which exits are available for me to move through
      let exits = currentRoom.exits
      const availableExits = []
      for (let k in exits) {
        if (typeof exits[k] !== 'undefined') {
          availableExits.push(k)
        }
      }
      player.myExits = availableExits
    }

    this.performAction = (words) => {
      console.log('Performing action on the words ' + words.verb + ' and ' + words.noun)
      if (words.verb === 'look') {
        player.look(words)
      } else if (words.verb === 'go') {
        player.move(words)
      } else if (words.verb === 'get') {
        player.get(words)
      } else if (words.verb === 'use') {
        player.use(words)
      }
    }

    this.look = (words) => {
      let room = rooms.room0 // replace this hard coded variable with player's current room
      $compySays(room.description)
      // and the exits are?
    }

    this.move = (words) => {
      // moves the player location to the coordinates listed in the direction typed
      if (words.noun !== undefined) {
        $compySays('In the future, you\'ll actually move ' + words.noun)
        // write the code to actually move in that direction :)
        // also check if the direction to move is a valid direction to move
      } else {
        $compySays('Which direction do you want to go? Available directions are (blah blah blah)')
      }
    }

    this.use = (words) => {
      // this is the interaction function. Either items in your inventory, or items in the world that are interactable but not pick-up-able.
      console.log('USE!')
    }

    this.get = (words) => {
      // this is the function that adds items to your inventory
      console.log('GET!')
    }
  }
// debugger
  rooms = new Rooms()
  parser = new Parser()
  player = new Player([0, 0, 0])
  rooms.roomLister(2)
  player.findMyRoom()

  $('#user-form').submit(function (event) {
    parser.processInput()
  })
})
