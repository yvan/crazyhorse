var pos = require('pos')
var posbuckets = require('./json/POSBuckets.json')
var curses = require('./json/cursewords.json')

module.exports = remix

/* - sentences is an array of sentences, or
   - or it is a single string of punctuation
   - delimited sentences
   */

function remix(sentences, number_of_levels, callback) {

	switch (typeof(sentences)){

		case "string":
			var words = new pos.Lexer().lex(sentences)
			var taggedWords = new pos.Tagger().tag(words)
			bucketplace(taggedWords)
			//first construct a verb phrase and a noun phrase
			var nounPhrase = formNounPhrase()
			var verbPhrase = formVerbPhrase()
			callback(nounPhrase.capitalizeFirstLetter()+' '+verbPhrase)

		default:
			var sentence_string = ""
			for (var i = 0, sentence; sentence=sentences[i]; i++)
				sentence_string+=sentence+' '
			
			var words = new pos.Lexer().lex(sentence_string)
			var taggedWords = new pos.Tagger().tag(words)
			bucketplace(taggedWords)
			var nounPhrase = formNounPhrase()
			var verbPhrase = formVerbPhrase()
			callback(nounPhrase+' '+verbPhrase)
	}
}

/* - fast and dirty bucket implementaton
   - we will place tagged words in particular buckets 
   - with repeats everytime we need a certain kind of word
   - we will just pluck it from the proper bucket.
   */

function bucketplace(stuff_to_place){
	
	for(i in stuff_to_place){
		var taggedWord = stuff_to_place[i]
		var word = taggedWord[0]
		var tag = taggedWord[1]
		posbuckets[tag].push(word)
	}
}

/*	- generates a random number for 
	- plucking things from proper buckets
	*/

function generateRand(range){
	return Math.floor((Math.random() * range) + 1)
}

/*	- creates a nounPhrase from
	- a DT bucket element,a JJ element, a NN element
	*/

function formNounPhrase(){

	// DT + JJ + NN 
	var article = posbuckets["DT"][generateRand(posbuckets["DT"].length-2)]
	var adjective = posbuckets["JJ"][generateRand(posbuckets["JJ"].length-2)]
	var noun = posbuckets["NN"][generateRand(posbuckets["NN"].length-2)]
	// simple grammar check to use 'a' or 'an'
	if((article==='a' || article==='A') && isVowel(adjective.charAt(0)))
		article += 'n'
	return article+' '+adjective+' '+noun
}

function formVerbPhrase(){

	// VBD + nounPhrase
	return posbuckets["VBD"][generateRand(posbuckets["VBD"].length-2)]+' '+formNounPhrase()
}

/* - tests a char ch
   - to see if it's a
   - vowel for basic 
   - grammar chacking
   */
function isVowel(ch){

	// - the reason I don't just want to toLowerCase, is because
	// - I want to handle all that separately after the end
	// - to not screw up personal pronouns when I add more code
	return['a','e','i','o','u', 'A', 'E', 'I', 'O', 'U'].indexOf(ch) !== -1
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}