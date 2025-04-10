import P from "parsimmon";
import { anonListEntry } from "./rule/anonListEntry";
import { blankLine } from "./rule/blankLine";
import { boolean } from "./rule/boolean";
import { comment } from "./rule/comment";
import { date } from "./rule/date";
import { datePattern } from "./rule/datePattern";
import { decimal } from "./rule/decimal";
import { doubleQuoteString } from "./rule/doubleQuoteString";
import { expr } from "./rule/expr";
import { identifier } from "./rule/identifier";
import { ifElseExpr } from "./rule/ifElseExpr";
import { ifExpr } from "./rule/ifExpr";
import { integer } from "./rule/integer";
import { keyOperationListEntry } from "./rule/keyOperationListEntry";
import { list } from "./rule/list";
import { listEntry } from "./rule/listEntry";
import { longTime } from "./rule/longTime";
import { longTimePattern } from "./rule/longTimePattern";
import { op } from "./rule/op";
import { pattern } from "./rule/pattern";
import { program } from "./rule/program";
import { range } from "./rule/range";
import { selector } from "./rule/selector";
import { shortTime } from "./rule/shortTime";
import { shortTimePattern } from "./rule/shortTimePattern";
import { singleQuoteString } from "./rule/singleQuoteString";
import type { GameLangSpec } from "./spec/GameLangSpec";

export const createGameLang = () =>
  P.createLanguage<GameLangSpec>({
    list,
    listEntry,
    comment,
    identifier,
    op,
    boolean,
    date: date,
    datePattern,
    shortTime,
    shortTimePattern,
    longTime: longTime,
    longTimePattern,
    integer,
    decimal,
    pattern,
    doubleQuoteString,
    singleQuoteString,
    blankLine,
    expr,
    program,
    anonListEntry,
    keyOperationListEntry,
    range,
    ifExpr,
    ifElseExpr,
    selector,
    // memberExpr,
  });
