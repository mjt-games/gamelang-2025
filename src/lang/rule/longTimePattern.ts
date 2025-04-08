import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";


export const longTimePattern: TypedRule<GameLangSpec>["longTimePattern"] = (
  r
) => addLoc(
  P.seq(
    P.alt(r.integer, r.pattern),
    P.string(":"),
    P.alt(r.integer, r.pattern),
    P.string(":"),
    P.alt(r.integer, r.pattern)
  ).map((value) => ({
    type: "longTimePattern",
    value: {
      hour: value[0].value,
      minute: value[2].value,
      second: value[4].value,
    },
  }))
);
