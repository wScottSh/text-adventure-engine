$(document).ready(function () {
  // console.log("jQuery ready");

  function Game () {
    // console.log("Game sanity check");

    function Parser (userString) {
      // console.log("parser sanity check");

      this.userString = userString
      this.approvedVerbs = ['go', 'get']
      this.approvedNouns = []

      this.stringToArray = () => {
        // this breaks the string into words for parsing
        let lowerCaseString = this.userString.toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ')
        let workableArray = lowerCaseString.split(' ')
        return workableArray
      }

      this.findVerb = () => {
        // looks for the first approved verb in the string & returns that verb
        let workableArray = this.stringToArray()
        let verbs = this.approvedVerbs

        // I need to flip the functionality of this to look through the string and stop when it finds the first verb it sees. Start with the first word in the array and check to see if it equals any of the accepted verbs. If it matches, return that verb. If it doesn't match any of the verbs, move to the next word in the string array, and repeat the process. Continue until you find a match.
        for (let i = 0; i < workableArray.length; i++) {
          // debugger;
          for (let it = 0; it < verbs.length; it++) {
            if (workableArray[i] === verbs[it]) {
              console.log(workableArray[i] + ' equals ' + verbs[it])
              return verbs[it]
            }
          }
        }
      }

      this.findNouns = (array) => {
        // looks for the approved nouns in the string & return them
      }

      this.processInput = (noun, verbArray) => {
        // this takes the above couple functions and actually parses the string, returning the thing that the computer needs to do
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

    fromForm = 'I want get to the to go north and get the spade'
    this.myParser = new Parser(fromForm)
  };

  gameLogic = new Game()
})

// debugger;
