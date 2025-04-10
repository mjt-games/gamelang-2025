import { evaluateAnonListEntry } from "./evaluateAnonListEntry";
import { evaluateListEntry } from "./evaluateListEntry";
import type { NodeEvaluator } from "./NodeEvaluator";

export const evaluateList: NodeEvaluator<"list"> = (state) => (list) => {
  const { value } = list;
  // console.log("evaluateList", value);
  for (const entry of value) {
    switch (entry.type) {
      case "listEntry": {
        evaluateListEntry(state)(entry);
        continue;
      }
      case "anonlistEntry": {
        evaluateAnonListEntry(state)(entry);
        continue;
      }
    }
  }
};
