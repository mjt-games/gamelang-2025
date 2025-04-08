import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const shortTime: TypedRule<GameLangSpec>["shortTime"] = (r) =>
  addLoc(
    P.seq(r.integer, P.string(":"), r.integer).map((value) => ({
      type: "shortTime",
      value: {
        hour: value[0].value,
        minute: value[2].value,
      },
    }))
  );


