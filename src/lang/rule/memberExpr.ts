import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const memberExpr: TypedRule<GameLangSpec>["memberExpr"] = (r) =>
  addLoc(
    P.seq(
      r.identifier,
      P.optWhitespace,
      P.string("."),
      P.optWhitespace,
      P.alt(r.memberExpr, r.identifier)
    ).map((value) => ({
      type: "memberExpr",
      value: {
        object: value[0],
        property: value[4],
      },
    }))
  );
