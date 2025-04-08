import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";
import { OPS } from "../spec/Op";

export const op: TypedRule<GameLangSpec>["op"] = (r) =>
  addLoc(
    P.alt(...OPS.map((op) => P.string(op))).map((value) => ({
      type: "op",
      value: value as GameLangSpec["op"]["value"],
    }))
  );
