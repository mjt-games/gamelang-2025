import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const range: TypedRule<GameLangSpec>["range"] = (r) =>
  addLoc(
    P.seq(r.integer, P.string(".."), r.integer).map((value) => ({
      type: "range",
      value: {
        start: value[0].value,
        end: value[2].value,
      },
    }))
  );
