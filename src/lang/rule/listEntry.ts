import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const listEntry: TypedRule<GameLangSpec>["listEntry"] = (r) =>
  addLoc(
    P.seq(
      P.optWhitespace,
      r.identifier,
      P.optWhitespace,
      r.op,
      P.optWhitespace,
      P.alt(
        r.ifElseExpr,
        r.ifExpr,
        r.list,
        r.boolean,
        r.memberExpr,
        r.identifier,
        r.longTimePattern,
        r.longTime,
        r.shortTimePattern,
        r.shortTime,
        r.date,
        r.datePattern,
        r.decimal,
        r.integer,
        r.doubleQuoteString,
        r.singleQuoteString,
        r.pattern
      ),

      P.alt(P.optWhitespace, r.comment)
    ).map((value) => ({
      type: "listEntry",
      key: value[1],
      op: value[3].value,
      value: value[5],
    }))
  );
