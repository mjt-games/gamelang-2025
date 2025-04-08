import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";


export const shortTimePattern: TypedRule<GameLangSpec>["shortTimePattern"] = (
  r
) => addLoc(
  P.seq(
    P.alt(r.integer, r.pattern),
    P.string(":"),
    P.alt(r.integer, r.pattern)
  ).map((value) => ({
    type: "shortTimePattern",
    value: {
      hour: value[0].value,
      minute: value[2].value,
    },
  }))
);
