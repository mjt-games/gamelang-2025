import type { GameLangSpec } from "../../lang/spec/GameLangSpec";
import type { State } from "../state/State";


export type NodeEvaluator<T extends keyof GameLangSpec> = (
  state: State
) => (value: GameLangSpec[T]) => void;
