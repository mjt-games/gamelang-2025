import P from "parsimmon";
import type { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const binaryExpr: TypedRule<GameLangSpec>["binaryExpr"] = (r) =>
  addLoc(
    P.seq(r.expr, P.optWhitespace, r.op, P.optWhitespace, r.expr).map(
      (value) => ({
        type: "binaryExpr",
        value: {
          left: value[0],
          op: value[2],
          right: value[4],
        },
      })
    )
  );
