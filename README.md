crazyhorse
==========

In your project's root directory use:
```
npm install crazyhorse
```

So one function well need to have is the ability to remember where words came from after they've been mixed.

In otherwords save an array with references to the original tweet.

The selection of words process should not be totally random. We should allow users to place weights on different tags returned by pos node module. This also lends itself well to machine learning in the future.
Basically the wrong part of speech will never replace the wrong one( even if the right one has a 0 weight) but in a sentence where either could be used the part tag with higher weight will supercede. 

POS tags:
```
CC Coord Conjuncn           and,but,or
CD Cardinal number          one,two
DT Determiner               the,some
EX Existential there        there
FW Foreign Word             mon dieu
IN Preposition              of,in,by
JJ Adjective                big
JJR Adj., comparative       bigger
JJS Adj., superlative       biggest
LS List item marker         1,One
MD Modal                    can,should
NN Noun, sing. or mass      dog
NNP Proper noun, sing.      Edinburgh
NNPS Proper noun, plural    Smiths
NNS Noun, plural            dogs
POS Possessive ending       's
PDT Predeterminer           all, both
PP$ Possessive pronoun      my,one's
PRP Personal pronoun         I,you,she
RB Adverb                   quickly
RBR Adverb, comparative     faster
RBS Adverb, superlative     fastest
RP Particle                 up,off
SYM Symbol                  +,%,&
TO 'to'                     to
UH Interjection             oh, oops
VB verb, base form          eat
VBD verb, past tense        ate
VBG verb, gerund            eating
VBN verb, past part         eaten
VBP Verb, present           eat
VBZ Verb, present           eats
WDT Wh-determiner           which,that
WP Wh pronoun               who,what
WP$ Possessive-Wh           whose
WRB Wh-adverb               how,where
, Comma                     ,
. Sent-final punct          . ! ?
: Mid-sent punct.           : ; "
$ Dollar sign               $
# Pound sign                #
" quote                     "
( Left paren                (
) Right paren               )
```
We wil produce simple sentences at first.

Sentence structure produced by crazyhorse:
```
[Interjection]||[CurseWord],[Sentence][Random Final Punctuation]
						   	[Noun Phrase] [Verb Phrase]
										  [Verb][NounPhrase]
										  	    [NounPhrase][Sentence]
										  				    [Noun Phrase][Verb Phrase]
```
Simple Grammar:
```
[Noun Phrase] : [Article][Adjective || Adverb][Noun] || [Possesive][Noun || ProperNoun]
[Verb Phrase] : [Verb][NounPhrase]
[Sentence]    : [Preposition][Sentence] || [Noun Phrase][Verb Phrase]
```

Usage:
======

Crazy horse will be one function call. It will take a list of sentences or a string of sentences.

```javascript

var crazyhorse = require('crazyhorse')

crazyhorse(list_of_sentences, function(remixed_sentence){
	
	console.log(remixed_sentence)
})
```

Structure of the Buckets:
```JSON
{
	"CC":["and", "or", "but"],
	.
	.
	.
	"DT":["the", "some"],
	"NN":["dog", "cat", "frog"],
	"NNP":["Edinburgh", "Jack"],
	.
	.
	.
}
```

Nitpicked the most impactful curse words from:

https://github.com/reimertz/curse-words


Test sentence list to be used as a list of sentences:

Water polo, or Water ball, is a team water sport. The playing team consists of six field players and one goalkeeper. The winner of the game is the team that scores the most goals. Game play involves swimming, treading water (using a sort of kicking motion known as 'eggbeater kick'), players passing the ball while being defended by opponents, and scoring by throwing the ball into a net defended by a goalie. 'Man-up' (or 'power play') situations occur frequently. Water polo, therefore, has strong similarities to the land-based game of team handball.The White House says now is not the time for Congress to get involved on Iran. When you skydive you have a backup altimeter that will deploy the chute at 1000 feet. All things normal, you'll live but have a rough landing if you are unconscious. The dangerous parts are what obstacles are there. You don't jump directly over the landing zone. You fly to it under canopy with the winds. Without guidance, thing like that river become deadly for an unconscious skydiver. It is also all over in today's Championship game as goals from Bradley Johnson and Lewis Grabban secure Norwich a league double over local rivals Ipswich. College admission season ignites deep anxieties for Asian American families, who spend more than any other demographic on education. At elite universities across the U.S., Asian Americans form a larger share of the student body than they do of the population as a whole. And increasingly they have turned against affirmative action policies that could alter those ratios, and accuse admissions committees of discriminating against Asian American applicants. Last year, a rumor that Harvard University would stop accepting any more Asian American students from San Marino High School spread like a trending hashtag. Just 12 hours ago, I posted a brief piece about the continuing Europtechnopanic in Germany and the effort of publishers there to blame their every trouble on Google—even the so-called sin of free content and the price of metaphoric wurst. Tomorrowland: In Silicon Valley, a new elite doesn’t just want to determine what we consume but how we live. They want to change the world and accept no regulation. Must we stop them?  It is nothing less than prewar propaganda, trying to stir up a populace against a boogeyman enemy in hopes of goading politicians to action to stop these people. If anyone would know better, you’d think they would. Schade.

