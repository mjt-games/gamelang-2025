import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const blankLine: TypedRule<GameLangSpec>["blankLine"] = (r) =>
  addLoc(
    P.seq(P.optWhitespace, P.end).map(() => ({
      type: "blankLine",
    }))
  );
