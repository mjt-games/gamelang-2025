import type { GameLangSpec } from "./GameLangSpec";

export type ValueNode = GameLangSpec[
  | "range"
  | "integer"
  | "decimal"
  | "boolean"
  | "date"
  | "shortTime"
  | "longTime"
  | "datePattern"
  | "shortTimePattern"
  | "longTimePattern"
  | "pattern"
  | "selector"
  | "doubleQuoteString"
  | "singleQuoteString"
  | "listEntry"
  | "keyOperationListEntry"
  | "anonListEntry"
  | "ifElseExpr"
  | "ifExpr"
  | "comment"
  | "list"];
