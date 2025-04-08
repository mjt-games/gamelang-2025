import P from "parsimmon";
import type { TypedRule } from "parsimmon";

import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const identifier: TypedRule<GameLangSpec>["identifier"] = (r) =>
  addLoc(
    P.regex(/^[a-zA-Z_][a-zA-Z0-9_]*/).map((value) => ({
      type: "identifier",
      value: value,
    }))
  );


