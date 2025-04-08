import type P from "parsimmon";

export const addLoc = <T>(parser: P.Parser<T>) => {
  return parser
    .mark()
    .map(
      (mark) => ({ ...mark.value, loc: { start: mark.start, end: mark.end } } as const)
    );
};
