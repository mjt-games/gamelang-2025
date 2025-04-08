import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";


export const singleQuoteString: TypedRule<GameLangSpec>["singleQuoteString"] = (
  r
) => addLoc(
  P.seq(P.string("'"), P.regex(/[^']*/), P.string("'")).map((value) => ({
    type: "singleQuoteString",
    value: value[1] ?? "",
  }))
);
