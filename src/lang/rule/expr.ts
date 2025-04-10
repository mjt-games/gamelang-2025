import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const expr: TypedRule<GameLangSpec>["expr"] = (r) =>
  addLoc(
    P.alt(
      r.ifElseExpr,
      r.ifExpr,
      r.list,
      r.boolean,
      r.selector,
      r.identifier,
      r.longTimePattern,
      r.longTime,
      r.shortTimePattern,
      r.shortTime,
      r.date,
      r.datePattern,
      r.range,
      r.decimal,
      r.integer,
      r.doubleQuoteString,
      r.singleQuoteString
    ).map((x) => ({
      type: "expr",
      value: x,
    }))
  );
