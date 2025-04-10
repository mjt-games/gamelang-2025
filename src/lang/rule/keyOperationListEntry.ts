import P, { TypedRule } from "parsimmon";
import type { GameLangSpec } from "../spec/GameLangSpec";
import { addLoc } from "../util/addLoc";

export const keyOperationListEntry: TypedRule<GameLangSpec>["keyOperationListEntry"] =
  (r) =>
    addLoc(
      P.seq(
        P.optWhitespace,
        r.selector,
        P.optWhitespace,
        r.op,

        P.alt(P.optWhitespace, r.comment)
      ).map((value) => ({
        type: "keyOperationListEntry",
        value: {
          key: value[1],
          op: value[3].value,
        },
      }))
    );
