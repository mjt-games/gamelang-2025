import type { GameLangSpec } from "../../lang/spec/GameLangSpec";
import type { State } from "../state/State";
import { evaluateList } from "./evaluateList";

export const evaluateProgram =
  (state: State) => (program: GameLangSpec["program"]) => {
    const { value } = program;
    for (const entry of value) {
      switch (entry.type) {
        case "comment": {
          continue;
        }
        case "list": {
          evaluateList(state)(entry);
        }
      }
    }
  };
