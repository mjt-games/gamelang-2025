export const SIMPLE_TEST_GAME = `

# game UI will need to be aware of the shape of the game and what its control surfaces are.

ticks_per_second = 60
tick=0

# setup time 
minutes=0
hours=0
days=0

# setup game entities
characters = {}
items = {"apple" "banana" "pear"}
player_character = {} # the player character, assume UI fleshes this out

# events are automatically removed on each tick
event = {} # the UI interacts with the game via exposing an event, 

next_id = 0 # incremented when read, provided by the UI


# content
names = {"Alice" "Bob" "Carol"}
happiness_range = 0..10 # range syntax
d20 = 1..20 # TODO impl range syntax

# rules for time
{tick%=60} ? {minutes+=1}
{minutes%=60} ? {hours+=1 minutes=0}
{hours%=24} ? {days+=1 hours=0}

# create a character every hour until we have 10
{hours%=1 characters<10} ? {
  # add character entity
  characters+= {
    id=next_id
    name?=names # ?= means pick random
    happiness?=happiness_range
  }
}

# user has to perform action to eat an apple
rule += {event.type == "eat_apple"} ? {
  # roll a d20
  subRule += {d20?>10} ? {
    player_character.happiness+=1
  } : {
    player_character.happiness-=1
  }
}

rule += {player_character.happiness>10} ? {
  log+= "You win!"
}

rule += {player_character.happiness<0} ? {
  log+= "You lose!"
}


`;
