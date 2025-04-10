import { createGameLang } from "./lang/createGameLang";
import { createState } from "./runtime/state/State";

export * from "./lang/spec/GameLangSpec";

export * from "./lang/spec/Value";
export * from "./lang/spec/SourceIndex";
export * from "./lang/spec/SourceLocation";
export * from "./lang/spec/Op";

export const GameLangs = {
  createGameLang,
  createState,
};
