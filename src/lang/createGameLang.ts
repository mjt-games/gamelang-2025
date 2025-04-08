import P from "parsimmon";
import type { GameLangSpec } from "./spec/GameLangSpec";
import { program } from "./rule/program";
import { binaryExpr } from "./rule/binaryExpr";
import { comment } from "./rule/comment";
import { expr } from "./rule/expr";
import { blankLine } from "./rule/blankLine";
import { singleQuoteString } from "./rule/singleQuoteString";
import { doubleQuoteString } from "./rule/doubleQuoteString";
import { pattern } from "./rule/pattern";
import { decimal } from "./rule/decimal";
import { integer } from "./rule/integer";
import { longTimePattern } from "./rule/longTimePattern";
import { longTime } from "./rule/longTime";
import { shortTimePattern } from "./rule/shortTimePattern";
import { shortTime } from "./rule/shortTime";
import { listEntry } from "./rule/listEntry";
import { anonListEntry } from "./rule/anonListEntry";
import { keyOperationListEntry } from "./rule/keyOperationListEntry";
import { list } from "./rule/list";
import { ifExpr } from "./rule/ifExpr";
import { ifElseExpr } from "./rule/ifElseExpr";
import { datePattern } from "./rule/datePattern";
import { date } from "./rule/date";
import { boolean } from "./rule/boolean";
import { op } from "./rule/op";
import { identifier } from "./rule/identifier";
import { range } from "./rule/range";
import { memberExpr } from "./rule/memberExpr";

export const createGameLang = () =>
  P.createLanguage<GameLangSpec>({
    list,
    listEntry,
    comment,
    identifier,
    op,
    boolean,
    date,
    datePattern,
    shortTime,
    shortTimePattern,
    longTime,
    longTimePattern,
    integer,
    decimal,
    pattern,
    doubleQuoteString,
    singleQuoteString,
    blankLine,
    expr,
    binaryExpr,
    program,
    anonListEntry,
    keyOperationListEntry,
    range,
    ifExpr,
    ifElseExpr,
    memberExpr,
  });
