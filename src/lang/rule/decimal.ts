import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";


export const decimal: TypedRule<GameLangSpec>["decimal"] = (r) => addLoc(
  P.regex(/^[0-9]+\.[0-9]+/).map((value) => ({
    type: "decimal",
    value: parseFloat(value),
  }))
);
