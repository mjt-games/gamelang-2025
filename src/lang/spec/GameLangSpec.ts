import type { Op } from "./Op";
import type { Pattern } from "./Pattern";
import type {
  Selector,
  Decimal,
  Range,
  YmdDate,
  YmdDatePattern,
  HmTime,
  HmTimePattern,
  HmsTime,
  HmsTimePattern,
  Identifier,
} from "./Value";
import type { SourceLocation } from "./SourceLocation";
import type { ValueNode } from "./ValueNode";

export type GameLangSpec = {
  selector: {
    type: "selector";
    loc: SourceLocation;
    value: Selector;
  };
  // memberExpr: {
  //   type: "memberExpr";
  //   loc: SourceLocation;
  //   value: unknown;
  // };

  ifExpr: {
    type: "ifExpr";
    loc: SourceLocation;
    value: {
      if: GameLangSpec["list"];
      then: GameLangSpec["list"];
    };
  };
  ifElseExpr: {
    type: "ifElseExpr";
    loc: SourceLocation;
    value: {
      if: GameLangSpec["list"];
      then: GameLangSpec["list"];
      else: GameLangSpec["list"];
    };
  };

  list: {
    type: "list";
    loc: SourceLocation;
    value: GameLangSpec[
      | "listEntry"
      | "keyOperationListEntry"
      | "anonListEntry"][];
  };

  anonListEntry: {
    type: "anonlistEntry";
    loc: SourceLocation;
    value: ValueNode;
  };

  keyOperationListEntry: {
    type: "keyOperationListEntry";
    loc: SourceLocation;
    value: {
      key: GameLangSpec["selector"];
      op: Op;
    };
  };

  listEntry: {
    type: "listEntry";
    loc: SourceLocation;
    value: {
      key: GameLangSpec["selector"];
      op: Op;
      value: ValueNode;
    };
  };

  blankLine: {
    type: "blankLine";
    loc: SourceLocation;
  };
  comment: {
    type: "comment";
    loc: SourceLocation;
    value: string;
  };
  pattern: {
    type: "pattern";
    loc: SourceLocation;
    value: Pattern;
  };
  doubleQuoteString: {
    type: "doubleQuoteString";
    loc: SourceLocation;
    value: string;
  };
  singleQuoteString: {
    type: "singleQuoteString";
    loc: SourceLocation;
    value: string;
  };
  integer: {
    type: "integer";
    loc: SourceLocation;
    value: number;
  };
  decimal: {
    type: "decimal";
    loc: SourceLocation;
    value: Decimal;
  };
  range: {
    type: "range";
    loc: SourceLocation;
    value: Range;
  };
  date: {
    type: "date";
    loc: SourceLocation;
    value: YmdDate;
  };
  datePattern: {
    type: "datePattern";
    loc: SourceLocation;
    value: YmdDatePattern;
  };
  shortTime: {
    type: "shortTime";
    loc: SourceLocation;
    value: HmTime;
  };
  shortTimePattern: {
    type: "shortTimePattern";
    loc: SourceLocation;
    value: HmTimePattern;
  };
  longTime: {
    type: "longTime";
    loc: SourceLocation;
    value: HmsTime;
  };
  longTimePattern: {
    type: "longTimePattern";
    loc: SourceLocation;
    value: HmsTimePattern;
  };
  boolean: {
    type: "boolean";
    loc: SourceLocation;
    value: boolean;
  };
  op: {
    type: "op";
    loc: SourceLocation;
    value: Op;
  };
  identifier: {
    type: "identifier";
    loc: SourceLocation;
    value: Identifier;
  };
  expr: {
    type: "expr";
    loc: SourceLocation;
    value: GameLangSpec[
      | "ifElseExpr"
      | "ifExpr"
      | "list"
      | "boolean"
      | "selector"
      | "longTimePattern"
      | "longTime"
      | "shortTimePattern"
      | "shortTime"
      | "date"
      | "datePattern"
      | "range"
      | "pattern"
      | "singleQuoteString"
      | "integer"
      | "decimal"
      | "doubleQuoteString"];
  };

  // binaryExpr: {
  //   type: "binaryExpr";
  //   loc: SourceLocation;
  //   value: {
  //     left: GameLangSpec["expr"];
  //     op: GameLangSpec["op"];
  //     right: GameLangSpec["expr"];
  //   };
  // };

  // unaryExpr: {
  //   type: "unaryExpr";
  //   loc: SourceLocation;
  //   op: GameLangSpec["op"];
  //   operand: GameLangSpec["expr"];
  //   value: string;
  // };

  program: {
    type: "program";
    loc: SourceLocation;
    value: GameLangSpec["comment" | "list"][];
  };
};
