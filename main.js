$(document).ready(function() {
  // console.log("jQuery ready");

  function Game() {
    // console.log("Game sanity check");

    function Parser(userString) {
      // console.log("parser sanity check");

      this.arrayMaker = (userString) => {
        // this breaks the string into words for parsing
        let lowerCaseString = userString.toLowerCase();
        let workableArray = lowerCaseString.split(" ");
        return workableArray;
      }

      this.findVerb = (array) => {
        // looks for the first approved verb in the string & returns that verb
      }

      this.findNoun = (array) => {
        // looks for the first approved noun in the string & returns that noun
      }

      this.processInput = (noun, verb) => {
        // this takes the above couple functions and actually parses the string, returning the thing that the computer needs to do
      }
    }

    function Player() {

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

    let fromForm = "This is my test string";
    this.myParser = new Parser(fromForm);
  };

  gameLogic = new Game();

});

// debugger;
