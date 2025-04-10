import { createStore } from "zustand/vanilla";
import { subscribeWithSelector } from "zustand/middleware";
import { produce } from "immer";

type Path = string[];

function getValueAtPath<T extends object, R = unknown>(obj: T, path: Path): R {
  return path.reduce<any>((acc, key) => acc?.[key], obj);
}

function setValueAtPath<T extends object>(
  obj: T,
  path: Path,
  value: unknown
): T {
  return produce(obj, (draft: any) => {
    let current = draft;
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) current[path[i]] = {};
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
  });
}

export type State<T extends object = object> = {
  get: <R = unknown>(path: Path) => R[];
  set: <R = unknown>(path: Path, value: R[]) => void;
  subscribe: <R = unknown>(path: Path, cb: (val: R) => void) => () => void;
  getRoot: () => T;
  update: <R = unknown>(path: Path, updater: (cur: unknown[]) => R[]) => void;
};

export const updateState =
  (state: State) =>
  <T>(path: string[], value: T) => {
    const current: unknown[] = state.get(path) ?? [];
    const updated = [...current, value].filter((x) => x !== undefined);
    return state.set(path, updated);
  };

export function createState<T extends object>(initialState: T): State<T> {
  const store = createStore(subscribeWithSelector(() => initialState));

  return {
    get: (path) => getValueAtPath(store.getState(), path),
    set: (path, value) => {
      store.setState((state) => setValueAtPath(state, path, value));
    },
    subscribe: (path, cb) => {
      return store.subscribe((state) => getValueAtPath(state, path), cb, {
        equalityFn: Object.is,
      });
    },
    getRoot: () => store.getState(),
    update: (path, updater) => {
      const current: unknown[] = getValueAtPath(store.getState(), path) ?? [];
      const updated = updater(current);
      return store.setState((state) =>
        setValueAtPath(
          state,
          path,
          updated.filter((x) => x !== undefined)
        )
      );
    },
  };
}
