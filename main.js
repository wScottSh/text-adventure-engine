$(document).ready(function () {
  // console.log('jQuery ready');
  // debugger
  const $compySays = (say) => {
    $('#chat-log-box').append('<div class=\'compy-says chat-bubble\'><p>' + say + '</p></div>')
    $("#chat-log-box").scrollTop($("#chat-log-box")[0].scrollHeight)
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
      $('#chat-log-box').append('<div class=\'player-says chat-bubble\'><p>' + $('#user-input').val() + '</p></div>')
      $('#user-input').val('') // clears the input field
      player.performAction(output)
    }
  }

  function Rooms () {
    function RoomMaker (config) {
      this.coordinates = config.coordinates
      this.description = config.description
      this.image = config.image
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
      description: 'You\'re standing in a perfectly symmetrical glade. There are four felled and hollowed-out tree trunks, one at each cardinal direction. Each one looks like it will bring you deeper into the thicket.',
      north: [0, 0, 0],
      south: [0, 0, 0],
      east: [1, 0, 0],
      west: [-1, 0, 0],
      image: 'room0.png'
    })

    this.room1 = new RoomMaker({
      coordinates: [-1, 0, 0],
      description: 'You step out of the trunk into a much larger glade and spot an imp on a weathered trunk that stands nearly 10 feet high. The imp plays a flute, but otherwise ignores you. At the base of the imp\'s platform is a stump that almost feels like a spot to place an offering.',
      east: [0, 0, 0],
      south: [-1, -1, 0],
      image: 'room1.png'
    })

    this.room2 = new RoomMaker({
      coordinates: [-1, -1, 0],
      description: 'The sun filters through the misty air causing long streaks of light to spill across the bridge ahead of you. You recognize the bridge as the one that takes you outside of the Kokiri Meadow, but it surprises you how small it feels seen from this angle strung so high above your head. Further south there\'s what look\'s like a weathered old log sticking up from the soft earth.',
      north: [-1, 0, 0],
      south: [-1, -2, 0],
      image: 'room2.png'
    })

    this.room3 = new RoomMaker({
      coordinates: [1, 0, 0],
      description: 'There are two more hollowed out trunks that lead deeper into the woods on the north and south. But more interestingly, there\'s a small cliff to the east. Peering down, it look\'s as if there\'s a small thicket of wildflowers. A beam of light shines directly onto something you can\'t quite make out.',
      north: [1, 1, 0],
      west: [0, 0, 0],
      south: [0, 0, 0],
      down: [1, 0, -1],
      image: 'room3.png'
    })

    this.room4 = new RoomMaker({
      coordinates: [1, 0, -1],
      description: 'Climbing down into the wildflowers, you see that the beam of light rests directly onto a tree stump. As you approach, the wildflowers right next to the stump rustle as something scurries away.',
      up: [1, 0, 0],
      image: 'room4.png'
    })

    this.room5 = new RoomMaker({
      coordinates: [1, 1, 0],
      description: 'To your east and south are those hollowed out trunks that seem to be leading you deeper into the woods. Directly north is a large ivy-covered, but otherwise out of place, stone archway that leads into a black man-made cavern. Sadly, there are several large stones that make this route inaccessible. There seems to be a faint drum beat coming from behind the rocks.',
      east: [2, 1, 0],
      south: [1, 0, 0],
      image: 'room5.png'
    })

    this.room6 = new RoomMaker({
      coordinates: [2, 1, 0],
      description: 'On the eastern side of this round glade is a serene man-made pond which ripples in the breeze. Whatever the source of the water is, it\'s obvious that it\'s not from the muddy earth. The water is so clear you can see straight to the bottom of the pool. It\'s hard to tell, but your guess is that it\'s maybe 20-or-so feet deep. Hollowed out trunks are on the north, west, and south.',
      north: [2, 2, 0],
      south: [0, 0, 0],
      west: [1, 1, 0],
      image: 'room6.png'
    })

    this.room7 = new RoomMaker({
      coordinates: [2, 2, 0],
      description: 'Uh, oh... you\'re starting to think that maybe you\'re getting lost. This symmetrical glade is looking all too familiar with its trunks at all four cardinal directions.',
      north: [2, 3, 0],
      east: [0, 0, 0],
      south: [2, 1, 0],
      west: [1, 2, 0],
      image: 'room7.png'
    })

    this.room8 = new RoomMaker({
      coordinates: [1, 2, 0],
      description: 'A majestic tree towers over you, streams of light shooting through it\'s full canopy of leaves. A group of butterflies flutter around what looks as if it\'s a tight tunnel beneath the tree\'s roots.',
      east: [2, 2, 0],
      down: [1, 2, -1],
      image: 'room8.png'
    })

    this.room9 = new RoomMaker({
      coordinates: [2, 3, 0],
      description: 'A symmetrical glade again! The same familar hollowed out trucks penetrate the forest in all four directions.',
      north: [0, 0, 0],
      east: [0, 0, 0],
      south: [2, 2, 0],
      west: [1, 3, 0],
      image: 'room9.png'
    })

    this.room10 = new RoomMaker({
      coordinates: [1, 3, 0],
      description: 'You fear that the woods will never let you go! Four hollowed out trucks beckon you deeper into the impenetrable forest.',
      north: [1, 4, 0],
      east: [2, 3, 0],
      south: [0, 0, 0],
      west: [0, 0, 0],
      image: 'room10.png'
    })

    this.room11 = new RoomMaker({
      coordinates: [1, 4, 0],
      description: 'Can it be?! You\'ve found the Forest Temple, lost for centuries deep within the labrynthine Lost Woods.',
      image: 'room11.png'
    })

    this.room12 = new RoomMaker({
      coordinates: [1, 2, -1],
      description: 'Climbing down into the dank grotto beneath the tree proves to not be nearly as fruitful as you\'d hoped. Nothing but moist soil and fresh spiderwebs. A few stray beams of light illuminate the underground system beneath the roots to be large, but otherwise uninteresting.',
      up: [1, 2, 0],
      image: 'room12.png'
    })

    this.room13 = new RoomMaker({
      coordinates: [-1, -2, 0],
      description: 'The weathered log is much larger this close to it. In fact, it goes even higher than the bridge. There doesn\'t seem to be much else over here though.',
      north: [-1, -1, 0],
      image: 'room13.png'
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
      if (words.verb !== undefined) {
        if (words.verb === 'look') {
          player.look(words)
        } else if (words.verb === 'go') {
          player.move(words)
        } else if (words.verb === 'get') {
          player.get(words)
        } else if (words.verb === 'use') {
          player.use(words)
        }
      } else {
        $compySays('Cannot get ye flask')
      }
    }

    this.look = () => {
      let room = player.myRoom
      $('img')[0].outerHTML = '<img src="images/' + room.image + '" alt="Lost Woods">'
      $compySays(room.description)
      if (room.image === 'room11.png') {
        $compySays('YOU WIN!')
      } else {
        $compySays('You can go ' + player.myExits.join(', '))
      }
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
        $compySays('You can go ' + player.myExits.join(', '))
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
  rooms.roomLister(13)
  player.findMyRoom()

  $('#user-form').submit(function (event) {
    parser.processInput()
  })
})
