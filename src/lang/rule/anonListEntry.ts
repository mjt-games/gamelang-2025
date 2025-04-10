import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const anonListEntry: TypedRule<GameLangSpec>["anonListEntry"] = (r) =>
  addLoc(
    P.seq(
      P.optWhitespace,
      P.alt(
        r.ifElseExpr,
        r.ifExpr,
        r.list,
        r.boolean,
        r.selector,
        r.longTimePattern,
        r.longTime,
        r.shortTimePattern,
        r.shortTime,
        r.date,
        r.datePattern,
        r.decimal,
        r.integer,
        r.doubleQuoteString,
        r.singleQuoteString
      ),

      P.alt(P.optWhitespace, r.comment)
    ).map((value) => ({
      type: "anonlistEntry",
      value: value[1],
    }))
  );
