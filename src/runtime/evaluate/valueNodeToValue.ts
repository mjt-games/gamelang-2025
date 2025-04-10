import type { List, Selector, Value } from "../../lang/spec/Value";
import type { ValueNode } from "../../lang/spec/ValueNode";

export const valueNodeToValue = (node: ValueNode): Value => {
  switch (node.type) {
    case "list": {
      return node.value.map((v) => valueNodeToValue(v)) as List;
    }
    case "ifElseExpr": {
      return {
        if: valueNodeToValue(node.value.if) as List,
        then: valueNodeToValue(node.value.then) as List,
        else: valueNodeToValue(node.value.else) as List,
      };
    }
    case "ifExpr": {
      return {
        if: valueNodeToValue(node.value.if) as List,
        then: valueNodeToValue(node.value.then) as List,
      };
    }
    case "listEntry": {
      return {
        key: valueNodeToValue(node.value.key) as Selector,
        op: node.value.op,
        value: valueNodeToValue(node.value.value),
      };
    }
    case "keyOperationListEntry": {
      return {
        key: valueNodeToValue(node.value.key) as Selector,
        op: node.value.op,
      };
    }
    case "anonlistEntry": {
      return valueNodeToValue(node.value);
    }
    case "comment": {
      return {
        comment: node.value,
      };
    }
  }
  return node.value;
};
