import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const selector: TypedRule<GameLangSpec>["selector"] = (r) =>
  addLoc(
    P.sepBy1(r.identifier, P.string("."))
      .map((value) => ({
        type: "selector",
        value: {
          path: value.map((v) => v.value),
        },
      }))
  );
