import { test } from "vitest";
import { createGameLang } from "../lang/createGameLang";
import { SIMPLE_TEST_GAME } from "./programs/SIMPLE_TEST_GAME";
import { SMOKE_TEST_PROGRAM } from "./programs/SMOKE_TEST_PROGRAM";
import {
  IDENTIFIER_PROGRAM,
  SELECTOR_PROGRAM,
  SIMPLE_ADDITION,
} from "./programs/LANG_FEATURE_PROGRAMS";
import { createState } from "../runtime/state/State";
import { Arrays, isDefined, toMany } from "@mjt-engine/object";
import { evaluateProgram } from "../runtime/evaluate/evaluateProgram";

// test("evaluateProgram", () => {
//   // const program = createGameLang().program.tryParse(`{${SIMPLE_ADDITION}}`);
//   const program = createGameLang().program.tryParse(`{${SIMPLE_TEST_GAME}}`);
//   // console.log(JSON.stringify(program, null, 2));
//   const state = createState({});
//   evaluateProgram(state)(program);
//   console.log("state", state.getRoot());
//   console.log(JSON.stringify(state.getRoot(), null, 2));
// });

test("play with state", () => {
  const state = createState({
    players: { name: "John", items: { key: "yes", bar: false } },
  });
  state.subscribe(["players", "items", "key"], (p) => {
    console.log("players items key changed", p);
  });
  // state.subscribe(["players"], (p) => {
  //   console.log("players changed", p);
  // });
  state.subscribe(["players", "active"], (p) => {
    console.log("players acitve changed", p);
  });
  console.log(state.getRoot());
  // state.set(["players", "name"], "bar");
  // state.set(["players", "active"], false);
  state.set(["players", "items", "key"], ["123"]);
  const key = state.get(["players", "items", "key"]);
  console.log("key", key);
});

// test("smoke test", () => {
//   const parser = createGameLang();
//   parser.program.tryParse(`{${SMOKE_TEST_PROGRAM}}`);
// });

// test("test game", () => {
//   const parser = createGameLang();
//   parser.program.tryParse(`{${SIMPLE_TEST_GAME}}`);
// });

// test("play", () => {
//   const parser = createGameLang();
//   const result = parser.program.tryParse(IDENTIFIER_PROGRAM);
//   console.log(JSON.stringify(result, null, 2));
// });
export type GameObject = {
  [key: string]: (string | number | boolean | GameObject)[];
};

export type GameState = {};

export const createGame = (text: string) => {
  const program = createGameLang().program.tryParse(text);
  return {
    program,
  };
};
