import type { Op } from "./Op";
import type { Pattern } from "./Pattern";
import type { SourceLocation } from "./SourceLocation";

export type Primitive = GameLangSpec[
  | "list"
  | "doubleQuoteString"
  | "singleQuoteString"
  | "integer"
  | "decimal"
  | "boolean"
  | "date"
  | "datePattern"
  | "shortTime"
  | "shortTimePattern"
  | "longTime"
  | "longTimePattern"
  | "pattern"
  | "identifier"];

export type GameLangSpec = {
  memberExpr: {
    type: "memberExpr";
    loc: SourceLocation;
    value: {
      object: GameLangSpec["identifier"];
      property: GameLangSpec["identifier" | "memberExpr"];
    };
  };

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
    value: GameLangSpec["listEntry"][];
  };

  anonListEntry: {
    type: "anonlistEntry";
    loc: SourceLocation;
    value: Primitive;
  };

  keyOperationListEntry: {
    type: "keyOperationListEntry";
    loc: SourceLocation;
    key: GameLangSpec["identifier"];
    op: Op;
  };

  listEntry: {
    type: "listEntry";
    loc: SourceLocation;
    key: GameLangSpec["identifier"];
    op: Op;
    value: Primitive;
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
    value: number;
  };
  range: {
    type: "range";
    loc: SourceLocation;
    value: { start: number; end: number };
  };
  date: {
    type: "date";
    loc: SourceLocation;
    value: {
      year: number;
      month: number;
      day: number;
    };
  };
  datePattern: {
    type: "datePattern";
    loc: SourceLocation;
    value: {
      year: number | Pattern;
      month: number | Pattern;
      day: number | Pattern;
    };
  };
  shortTime: {
    type: "shortTime";
    loc: SourceLocation;
    value: {
      hour: number;
      minute: number;
    };
  };
  shortTimePattern: {
    type: "shortTimePattern";
    loc: SourceLocation;
    value: {
      hour: number | Pattern;
      minute: number | Pattern;
    };
  };
  longTime: {
    type: "longTime";
    loc: SourceLocation;
    value: {
      hour: number;
      minute: number;
      second: number;
    };
  };
  longTimePattern: {
    type: "longTimePattern";
    loc: SourceLocation;
    value: {
      hour: number | Pattern;
      minute: number | Pattern;
      second: number | Pattern;
    };
  };
  boolean: {
    type: "boolean";
    loc: SourceLocation;
    value: boolean;
  };
  // symbol: {
  //   type: "symbol";
  //   loc: SourceLocation;
  //   value: string;
  // };
  op: {
    type: "op";
    loc: SourceLocation;
    value: Op;
  };
  identifier: {
    type: "identifier";
    loc: SourceLocation;
    value: string;
  };
  // keyword: {
  //   type: "keyword";
  //   loc: SourceLocation;
  //   value: string;
  // };
  expr: {
    type: "expr";
    loc: SourceLocation;
    value: GameLangSpec[
      | "ifElseExpr"
      | "ifExpr"
      | "list"
      | "boolean"
      | "memberExpr"
      | "longTimePattern"
      | "longTime"
      | "shortTimePattern"
      | "shortTime"
      | "date"
      | "datePattern"
      | "range"
      | "pattern"
      | "singleQuoteString"
      | "identifier"
      | "integer"
      | "decimal"
      | "doubleQuoteString"];
    // | "string"
    // | "number"
    // | "boolean"
    // | "symbol"
    // | "binaryExpr"
    // | "unaryExpr"
  };

  binaryExpr: {
    type: "binaryExpr";
    loc: SourceLocation;
    value: {
      left: GameLangSpec["expr"];
      op: GameLangSpec["op"];
      right: GameLangSpec["expr"];
    };
  };

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
    value: GameLangSpec["expr" | "comment" | "blankLine"][];
  };
};
