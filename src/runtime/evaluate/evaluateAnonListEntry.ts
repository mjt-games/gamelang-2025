import type { NodeEvaluator } from "./NodeEvaluator";
import { valueNodeToValue } from "./valueNodeToValue";


export const evaluateAnonListEntry: NodeEvaluator<"anonListEntry"> = (state) => (anonListEntry) => {
  const { value } = anonListEntry;
  const valueObject = valueNodeToValue(value);
  console.log("evaluateAnonListEntry", valueObject);
  // switch (op) {
  //   case "=": {
  //     return state.set(
  //       key.value.path,
  //       Array.isArray(valueObject) ? valueObject : [valueObject]
  //     );
  //   }
  //   case "+=": {
  //     state.update(key.value.path, (cur) => {
  //       return [...cur, value.value];
  //     });
  //   }
  // }
};
