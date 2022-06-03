import React, {useReducer} from "react";

interface State {
  value: string;
  isTouched: boolean;
}

interface Action {
  type: string;
  value?: string;
  isTouched?: boolean;
}

const initialState: State = {
  value: "",
  isTouched: false
}

type Reducer = (state: State, action: Action) => State;

export function useInput(validator: (val: string) => boolean, trim=false) {
  const [inputState, inputDispatch] = useReducer<Reducer>((state, action) => {
    switch (action.type) {
      case 'INPUT':
        return {
          value: action.value || '',
          isTouched: state.isTouched
        };
      case 'BLUR':
        return {
          value: state.value,
          isTouched: true
        };
      case 'RESET':
        return initialState;
      default:
        return state;
    }
  }, initialState);

  const valueIsValid = validator(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(trim)
      inputDispatch({type:'INPUT', value: e.target.value.trim()});
    else
      inputDispatch({type:'INPUT', value: e.target.value});
  };

  const valueBlurHandler = () => {
    inputDispatch({type: 'BLUR'});
  };

  const reset = () => {
    inputDispatch({type:'RESET'});
  };

  return {
    value: inputState.value,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset
  }
}