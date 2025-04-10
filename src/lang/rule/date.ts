import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const date: TypedRule<GameLangSpec>["date"] = (r) =>
  addLoc(
    P.seq(r.integer, P.string("."), r.integer, P.string("."), r.integer).map(
      (value) => ({
        type: "date",
        value: {
          year: value[0].value,
          month: value[2].value,
          day: value[4].value,
        },
      })
    )
  );
