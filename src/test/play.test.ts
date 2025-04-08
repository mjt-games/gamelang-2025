import { expect, test } from "vitest";
import { createGameLang } from "../lang/createGameLang";

const COMPLEX_PROGRAM = `# This is a comment
// This is another comment
abc=12 #third comment
abc= "test 123"
abc= 'test xyz'
abc= 12.34
abc = yes
abc = false
abc = 2023.10.12
abc = 23:59:42
abc = 23:59
abc = 2023.*.12
abc = 23:*
abc = 23:*:42
abc = { a=1
  a= 2 
  b= {z="test"}
  c=3
}
`;

const SIMPLE_GAME = `

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
{event.type == "eat_apple"} ? {
  # roll a d20
  {d20?>10} ? {
    player_character.happiness+=1
  } : {
    player_character.happiness-=1
  }
}

{player_character.happiness>10} ? {
  log+= "You win!"
}

{player_character.happiness<0} ? {
  log+= "You lose!"
}


`;

const DATE_PROGRAM = `abc=2023.10.12`;
const DATE_PATTERN_PROGRAM = `abc=2023.*.12`;
const LONG_TIME_PROGRAM = `abc=23:59:42`;
const LONG_TIME_PATTERN_PROGRAM = `abc=23:*:42`;
const SHORT_TIME_PROGRAM = `abc=23:59`;
const SHORT_TIME_PATTERN_PROGRAM = `abc=23:*`;
const LIST_PROGRAM = `abc={a=*}`;
const RANGE_PROGRAM = `abc=1..10`;
const MEMBER_EXP_PROGRAM = `foo.bar.baz=1`;
const IF_PROGRAM = `{a=1} ? {
  b=2
}`;

const IF_ELSE_PROGRAM = `{a=1} ? {
  b=2
} : {
  c=3 
}`;

const NESTED_IF_PROGRAM = `{a=1} ? {
  b=2
  {b=2} ? {
    c=3
  } 
  
}`;

const parser = createGameLang();
test("playing around", () => {
  parser.program.tryParse(SIMPLE_GAME);
  // parser.program.tryParse(SHORT_TIME_PROGRAM);
  // const result = parser.program.tryParse(DATE_PATTERN_PROGRAM);
  // const result = parser.program.tryParse(LIST_PROGRAM);
  const result = parser.program.tryParse(MEMBER_EXP_PROGRAM);
  console.log(JSON.stringify(result, null, 2));
  // expect(createGameLang()).toBe(3);
});
