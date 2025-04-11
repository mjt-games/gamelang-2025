import type { Op } from "./Op";
import type { Pattern } from "./Pattern";

export type Value =
  | Range
  | Integer
  | Decimal
  | string
  | boolean
  | YmdDate
  | YmdDatePattern
  | HmTime
  | HmTimePattern
  | HmsTime
  | HmsTimePattern
  | List
  | ListEntry
  | KeyOperationListEntry
  | Pattern
  | ifExpr
  | ifElseExpr
  | Comment
  | Selector;

export type Identifier = string;
export type Selector = {
  path: Identifier[];
};
export type Comment = {
  comment: string;
};

export type ifExpr = {
  if: List;
  then: List;
};
export type ifElseExpr = {
  if: List;
  then: List;
  else: List;
};

export type Range = {
  start: Integer;
  end: Integer;
};
export type Integer = number;
export type Decimal = {
  int: Integer;
  dec: Integer;
};

export type YmdDate = {
  year: Integer;
  month: Integer;
  day: Integer;
};
export type YmdDatePattern = {
  year: Integer | Pattern;
  month: Integer | Pattern;
  day: Integer | Pattern;
};
export type HmTime = {
  hour: Integer;
  minute: Integer;
};
export type HmTimePattern = {
  hour: Integer | Pattern;
  minute: Integer | Pattern;
};
export type HmsTime = {
  hour: Integer;
  minute: Integer;
  second: Integer;
};
export type HmsTimePattern = {
  hour: Integer | Pattern;
  minute: Integer | Pattern;
  second: Integer | Pattern;
};

// export type AnonListEntry =  Value ;
export type ListEntry = {
  key: Selector;
  op: Op;
  value: Value;
};
export const isListEntry = (maybe: unknown): maybe is ListEntry => {
  const straw = maybe as ListEntry;
  return (
    typeof straw === "object" &&
    straw !== null &&
    "key" in straw &&
    "op" in straw &&
    "value" in straw
  );
};

export type KeyOperationListEntry = {
  key: Selector;
  op: Op;
};

export const isKeyOperationListEntry = (
  maybe: unknown
): maybe is KeyOperationListEntry => {
  const straw = maybe as KeyOperationListEntry;
  return (
    typeof straw === "object" &&
    straw !== null &&
    "key" in straw &&
    "op" in straw
  );
};

export type List = (Value | ListEntry | KeyOperationListEntry)[];
