import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";


export const datePattern: TypedRule<GameLangSpec>["datePattern"] = (r) => addLoc(
  P.seq(
    P.alt(r.integer, r.pattern),
    P.string("."),
    P.alt(r.integer, r.pattern),
    P.string("."),
    P.alt(r.integer, r.pattern)
  ).map((value) => ({
    type: "datePattern",
    value: {
      year: value[0].value,
      month: value[2].value,
      day: value[4].value,
    },
  }))
);
