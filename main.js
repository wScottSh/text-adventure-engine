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
          // check the string array to see if it has any one of the approved verbs in it
          // for the verb[0], check indexOf(the string array)
        }

        if (workableArray.indexOf('walk') >= 0) {
          console.log('Walk is in the array!')
        } else {
          console.log('Walk is not in the array!')
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

    fromForm = 'walk This is My tEst strIng. How do you like that?'
    this.myParser = new Parser(fromForm)
  };

  gameLogic = new Game();
})

// debugger;
