import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";


export const integer: TypedRule<GameLangSpec>["integer"] = (r) => addLoc(
  P.regex(/^[0-9]+/).map((value) => ({
    type: "integer",
    value: parseInt(value, 10),
  }))
);
