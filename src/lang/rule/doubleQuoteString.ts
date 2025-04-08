import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";


export const doubleQuoteString: TypedRule<GameLangSpec>["doubleQuoteString"] = (
  r
) => addLoc(
  P.seq(P.string('"'), P.regex(/[^"]*/), P.string('"')).map((value) => ({
    type: "doubleQuoteString",
    value: value[1] ?? "",
  }))
);
