"use strict";

import { useReducer, useCallback, useRef, useMemo } from "react";

/**
 * A hook that manages state with undo/redo history.
 * Uses useReducer for predictable state updates.
 */

type HistoryState<T> = {
  past: T[];
  present: T;
  future: T[];
  lastSaved: T;
};

type HistoryAction<T> =
  | { type: "SET"; payload: T | ((prev: T) => T); isFunction: boolean }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "COMMIT" } // Commit current present to history
  | { type: "RESET"; payload: T }; // Reset to initial state

function createReducer<T>() {
  return function reducer(
    state: HistoryState<T>,
    action: HistoryAction<T>,
  ): HistoryState<T> {
    switch (action.type) {
      case "SET":
        // Resolve payload if it's a function
        const nextPresent = action.isFunction
          ? (action.payload as (prev: T) => T)(state.present)
          : (action.payload as T);

        // Update present without affecting history yet
        return {
          ...state,
          present: nextPresent,
        };

      case "COMMIT":
        // ... (rest same)
        // Save lastSaved to past, update lastSaved to current present
        const presentJson = JSON.stringify(state.present);
        const lastSavedJson = JSON.stringify(state.lastSaved);

        if (presentJson === lastSavedJson) {
          return state; // Nothing changed since last save
        }

        return {
          past: [...state.past, state.lastSaved],
          present: state.present,
          future: [], // Clear future on new action
          lastSaved: state.present,
        };

      case "UNDO":
        if (state.past.length === 0) return state;
        const previous = state.past[state.past.length - 1];
        return {
          past: state.past.slice(0, -1),
          present: previous,
          future: [state.present, ...state.future],
          lastSaved: previous,
        };

      case "REDO":
        if (state.future.length === 0) return state;
        const next = state.future[0];
        return {
          past: [...state.past, state.present],
          present: next,
          future: state.future.slice(1),
          lastSaved: next,
        };

      case "RESET":
        return {
          past: [],
          present: action.payload,
          future: [],
          lastSaved: action.payload,
        };

      default:
        return state;
    }
  };
}

export function useHistoryState<T>(initialState: T, delayMs = 500) {
  const reducer = useMemo(() => createReducer<T>(), []);

  const [historyState, dispatch] = useReducer(reducer, {
    past: [],
    present: initialState,
    future: [],
    lastSaved: initialState,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialStateRef = useRef<T>(initialState);

  const undo = useCallback(() => {
    // Clear any pending commit
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    dispatch({ type: "UNDO" });
  }, []);

  const redo = useCallback(() => {
    // Clear any pending commit
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    dispatch({ type: "REDO" });
  }, []);

  const set = useCallback(
    (value: T | ((prev: T) => T)) => {
      const isFunc = value instanceof Function;

      dispatch({
        type: "SET",
        payload: value,
        isFunction: isFunc,
      });

      // Schedule commit after debounce
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        dispatch({ type: "COMMIT" });
        timeoutRef.current = null;
      }, delayMs);
    },
    [delayMs],
  );

  const pushSnapshot = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    dispatch({ type: "COMMIT" });
  }, []);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    dispatch({ type: "RESET", payload: initialStateRef.current });
  }, []);

  return {
    state: historyState.present,
    set,
    undo,
    redo,
    reset,
    canUndo: historyState.past.length > 0,
    canRedo: historyState.future.length > 0,
    pushSnapshot,
  };
}
