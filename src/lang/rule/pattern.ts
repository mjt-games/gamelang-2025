import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";


export const pattern: TypedRule<GameLangSpec>["pattern"] = (r) => addLoc(
  P.alt(P.string("*")).map((value) => ({
    type: "pattern",
    value: value,
  }))
);
