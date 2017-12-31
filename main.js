$(document).ready(function () {
  // console.log('jQuery ready');
  // debugger
  const $compySays = (say) => {
    $('#chat-log').append('<li class=\'compy-says\'>' + say + '</li>')
  }

  function Parser () {
    // this.userString = userString
    this.verbSynonyms = ['go', 'get', 'use', 'look']
    this.nounSynonyms = ['north', 'east', 'south', 'west', 'up', 'down']
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
      description: 'You\'re in Room 0',
      north: [0, 0, 0],
      south: [0, 0, 0],
      east: [1, 0, 0],
      west: [-1, 0, 0]
    })

    this.room1 = new RoomMaker({
      coordinates: [-1, 0, 0],
      description: 'You\'re in Room 1',
      east: [0, 0, 0],
      south: [-1, -1, 0]
    })

    this.room2 = new RoomMaker({
      coordinates: [-1, -1, 0],
      description: 'You\'re in Room 2',
      north: [-1, 0, 0]
    })

    this.room3 = new RoomMaker({
      coordinates: [1, 0, 0],
      description: 'You\'re in Room 3',
      north: [1, 1, 0],
      west: [0, 0, 0],
      south: [0, 0, 0],
      down: [1, 0, -1]
    })

    this.room4 = new RoomMaker({
      coordinates: [1, 0, -1],
      description: 'You\'re in Room 4',
      up: [1, 0, 0]
    })

    this.room5 = new RoomMaker({
      coordinates: [1, 1, 0],
      description: 'You\'re in Room 5',
      north: [0, 0, 0],
      east: [2, 1, 0],
      south: [1, 0, 0]
    })

    this.room6 = new RoomMaker({
      coordinates: [2, 1, 0],
      description: 'You\'re in Room 6',
      north: [2, 2, 0],
      south: [0, 0, 0],
      west: [1, 1, 0]
    })

    this.room7 = new RoomMaker({
      coordinates: [2, 2, 0],
      description: 'You\'re in Room 7',
      north: [2, 3, 0],
      east: [0, 0, 0],
      south: [2, 1, 0],
      west: [1, 2, 0]
    })

    this.room8 = new RoomMaker({
      coordinates: [1, 2, 0],
      description: 'You\'re in Room 8',
      east: [2, 2, 0],
      down: [1, 2, -1]
    })

    this.room9 = new RoomMaker({
      coordinates: [2, 3, 0],
      description: 'You\'re in Room 9',
      north: [0, 0, 0],
      east: [0, 0, 0],
      south: [2, 2, 0],
      west: [1, 3, 0]
    })

    this.room10 = new RoomMaker({
      coordinates: [1, 3, 0],
      description: 'You\'re in Room 10',
      north: [1, 4, 0],
      east: [2, 3, 0],
      south: [0, 0, 0],
      west: [0, 0, 0]
    })

    this.room11 = new RoomMaker({
      coordinates: [1, 4, 0],
      description: 'You\'re in Room 11',
      south: [1, 3, 0]
    })

    this.room12 = new RoomMaker({
      coordinates: [1, 2, -1],
      description: 'You\'re in Room 12',
      up: [1, 2, 0]
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
          return player.myRoom
        }
      }
    }

    this.findExits = (currentRoom) => {
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

    this.look = () => {
      let room = player.myRoom
      $compySays(room.description)
      $compySays('Exits are ' + player.myExits.join(', '))
    }

    this.move = (words) => {
      if (words.noun !== undefined) {
        if (player.myExits.indexOf(words.noun) > -1) {
          player.myCoords = player.myRoom.exits[words.noun]
          player.findMyRoom()
          player.look()
        } else {
          $compySays('You can\'t go ' + words.noun)
        }
      } else {
        $compySays('Which direction do you want to go?')
        $compySays('Exits are ' + player.myExits.join(', '))
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

  rooms = new Rooms()
  parser = new Parser()
  player = new Player([0, 0, 0])
  rooms.roomLister(12)
  player.findMyRoom()

  $('#user-form').submit(function (event) {
    parser.processInput()
  })
})
