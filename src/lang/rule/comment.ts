import P from "parsimmon";
import type { TypedRule } from "parsimmon";
import { COMMENT_PREFIXES } from "../spec/COMMENT_PREFIXES";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const comment: TypedRule<GameLangSpec>["comment"] = (r) =>
  addLoc(
    P.seq(
      P.optWhitespace,
      P.alt(...COMMENT_PREFIXES.map((p) => P.string(p))),
      P.regex(/[^\n]*/)
    ).map((value) => ({
      type: "comment",
      value: value[2] ?? "",
    }))
  );


