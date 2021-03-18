import { ActionTypes } from '../Actions/actions';

const InitialState = {

    microsoft_user: {},
    signIn_success: false,
    signUp_success: false,
    signUp_error: ''
}
export default (state = InitialState, action) => {
    switch (action.type) {
        case ActionTypes.MICROSOFT_LOGIN:
            return ({ ...state, microsoft_user: action.payload });

        case ActionTypes.SIGNUP_SUCCESS:
            return ({ ...state, signUp_success: action.payload });
        case ActionTypes.SIGNUP_ERROR:
            return ({ ...state, signUp_error: action.payload });
        case ActionTypes.SIGNIN_SUCCESS:
            return ({ ...state, signIn_success: action.payload });

        default:
            return state;
    }
}