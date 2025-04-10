import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const longTime: TypedRule<GameLangSpec>["longTime"] = (r) =>
  addLoc(
    P.seq(r.integer, P.string(":"), r.integer, P.string(":"), r.integer).map(
      (value) => ({
        type: "longTime",
        value: {
          hour: value[0].value,
          minute: value[2].value,
          second: value[4].value,
        },
      })
    )
  );
