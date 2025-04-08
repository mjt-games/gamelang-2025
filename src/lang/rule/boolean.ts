import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";


export const boolean: TypedRule<GameLangSpec>["boolean"] = (r) => addLoc(
  P.alt(
    P.string("true"),
    P.string("false"),
    P.string("yes"),
    P.string("no")
  ).map((value) => ({
    type: "boolean",
    value: value === "true" || value === "yes",
  }))
);
