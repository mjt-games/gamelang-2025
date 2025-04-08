import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";


export const ifExpr: TypedRule<GameLangSpec>["ifExpr"] = (r) => addLoc(
  P.seq(r.list, P.optWhitespace, P.string("?"), P.optWhitespace, r.list).map(
    (value) => ({
      type: "ifExpr",
      value: {
        if: value[0],
        then: value[4],
      },
    })
  )
);
