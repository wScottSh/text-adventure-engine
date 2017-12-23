$(document).ready(function () {
  // console.log("jQuery ready");

  function Game () {
    // console.log("Game sanity check");

    function Parser (userString) {
      // console.log("parser sanity check");

      this.userString = userString
      this.approvedVerbs = [
        'go',
        'get'
      ]

      this.arrayMaker = () => {
        // this breaks the string into words for parsing
        let lowerCaseString = this.userString.toLowerCase()
        let workableArray = lowerCaseString.split(' ')
        return workableArray
      }

      this.findVerb = () => {
        // looks for the first approved verb in the string & returns that verb
        let workableArray = this.arrayMaker()
        let verbs = this.approvedVerbs

        for (var i = 0; i < verbs.length; i++) {
          if (workableArray.indexOf(verbs[i]) >= 0) {
            console.log(verbs[i] + ' is in the array!')
          } else {
            console.log(verbs[i] + ' is not in the array!')
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

    fromForm = 'walk This is My tEst strIng go get . How do you like that?'
    this.myParser = new Parser(fromForm)
  };

  gameLogic = new Game();
})

// debugger;
