interface UserState {
  user?: object | null,
  loading?: boolean,
  error?: object | null
}

interface Action {
  type: string;
  payload: any;
}

export interface UserLoginState {
  authLogin: {
    user: {
      access: string,
      refresh: string,
      username: string,
      email: string
    } | null,
    loading: boolean,
    error: {
      messages: any,
      status: number
    }
  }
}

export interface UserRegisterState {
  authRegister: {
    user: object,
    loading: boolean,
    error: {
      messages: any,
      status: number
    }
  }
}

export interface AuthData {
  user: object | null;
  loading: boolean;
  error: {
    messages: any,
    status: number
  } | null;
}

export const initialState: AuthData = {
  user: null,
  loading: false,
  error: null
}

export enum loginReducerType {
  loading = 'auth/login/loading',
  success = 'auth/login/success',
  error = 'auth/login/error',
  logout = 'auth/login/logout'
}

export enum registerReducerType {
  loading = 'auth/register/loading',
  success = 'auth/register/success',
  error = 'auth/register/error'
}

export function loginReducer(state: UserState = initialState, action: Action) {
  switch (action.type) {
    case loginReducerType.loading:
      return {...state, loading: true};
    case loginReducerType.success:
      return {...state, loading: false, user: action.payload};
    case loginReducerType.error:
      return {...state, loading: false, error: action.payload};
    case loginReducerType.logout:
      return {...state, loading: false, user: null};
    default:
      return state;
  }
}

export function registerReducer(state: UserState = initialState, action: Action) {
  switch (action.type) {
    case registerReducerType.loading:
      return {...state, loading: true};
    case registerReducerType.success:
      return {...state, loading: false, user: action.payload};
    case registerReducerType.error:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
}
