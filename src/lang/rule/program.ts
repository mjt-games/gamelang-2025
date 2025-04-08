import P from "parsimmon";
import type { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const program: TypedRule<GameLangSpec>["program"] = (r) =>
  addLoc(
    P.alt(r.comment, r.ifElseExpr, r.ifExpr, r.binaryExpr)
      .skip(P.optWhitespace)
      .many()
      .map((x) => ({
        type: "program",
        value: x,
      }))
  );
