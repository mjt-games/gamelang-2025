import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const decimal: TypedRule<GameLangSpec>["decimal"] = (r) =>
  addLoc(
    P.seq(
      r.integer,
      P.optWhitespace,
      P.string("."),
      P.optWhitespace,
      r.integer
    ).map((value) => ({
      type: "decimal",
      value: {
        int: value[0].value,
        dec: value[4].value,
      },
    }))
  );
