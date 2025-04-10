import type { NodeEvaluator } from "./NodeEvaluator";
import { valueNodeToValue } from "./valueNodeToValue";

export const evaluateListEntry: NodeEvaluator<"listEntry"> =
  (state) => (listEntry) => {
    const { key, op, value } = listEntry.value;
    const valueObject = valueNodeToValue(value);
    switch (op) {
      case "=": {
        return state.set(
          key.value.path,
          Array.isArray(valueObject) ? valueObject : [valueObject]
        );
      }
      case "+=": {
        state.update(key.value.path, (cur) => {
          return [...cur, valueObject];
        });
      }
    }
  };
