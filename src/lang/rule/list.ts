import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const list: TypedRule<GameLangSpec>["list"] = (r) =>
  addLoc(
    P.seq(
      P.string("{"),
      P.alt(r.listEntry, r.keyOperationListEntry, r.anonListEntry, r.comment)
        .skip(P.optWhitespace)
        .many(),
      P.string("}")
    ).map((value) => ({
      type: "list",
      value: value[1],
    }))
  );
