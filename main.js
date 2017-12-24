$(document).ready(function () {
  // console.log("jQuery ready");

  function Game () {
    // console.log("Game sanity check");

    function Parser (userString) {
      // console.log("parser sanity check");

      this.userString = userString
      this.approvedVerbs = ['go', 'get']
      this.approvedNouns = ['fart', 'north']

      this.stringToArray = () => {
        // this breaks the string into words for parsing
        let lowerCaseString = this.userString.toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ')
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
        console.log('The user input: "' + this.userString + '".')
        console.log('The computer sees: "' + this.stringToArray().join(' ') + '".')
        console.log('The verb is ' + verb + ' and the noun is ' + noun)
      }
    }

    function Player () {
      // contains all of the code for moving the player and interacting with the world.
    }

    // function ApprovedWords() {
    //   // All the words that the parser will recognize as valid
    //
    //   this.verbs = {
    //     getSynonyms = [],
    //     useSynonyms = []
    //   }
    // }

    // debugger;

    fromForm = 'this is a huge string go that test the Limits of WhAt C.an be ))   north      ((^&$%^#^) done with the fart)'
    this.myParser = new Parser(fromForm)
  };

  gameLogic = new Game()
})

// debugger;
