import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";


export const ifElseExpr: TypedRule<GameLangSpec>["ifElseExpr"] = (r) => addLoc(
  P.seq(
    r.list,
    P.optWhitespace,
    P.string("?"),
    P.optWhitespace,
    r.list,
    P.optWhitespace,
    P.string(":"),
    P.optWhitespace,
    r.list
  ).map((value) => ({
    type: "ifElseExpr",
    value: {
      if: value[0],
      then: value[4],
      else: value[8],
    },
  }))
);
