export const DATE_PROGRAM = `abc=2023.10.12`;
export const DATE_PATTERN_PROGRAM = `abc=2023.*.12`;
export const LONG_TIME_PROGRAM = `abc=23:59:42`;
export const LONG_TIME_PATTERN_PROGRAM = `abc=23:*:42`;
export const SHORT_TIME_PROGRAM = `abc=23:59`;
export const SHORT_TIME_PATTERN_PROGRAM = `abc=23:*`;
export const LIST_PROGRAM = `abc={a=*}`;
export const RANGE_PROGRAM = `abc=1..10`;
export const SELECTOR_PROGRAM = `foo.bar.baz=1`;
export const IDENTIFIER_PROGRAM = `foo=1`;
export const IF_PROGRAM = `{a=1} ? {
  b=2
}`;
export const IF_ELSE_PROGRAM = `{a=1} ? {
  b=2
} : {
  c=3 
}`;
export const NESTED_IF_PROGRAM = `{a=1} ? {
  b=2
  {b=2} ? {
    c=3
  } 
  
}`;

export const SIMPLE_ADDITION = ``;
