import { ActionTypes } from '../Actions/actions';

const InitialState = {

    microsoft_user: {},
    signIn_success: false,
    signUp_success: false,
    signUp_error: '',

    user_data: {},
    project_number: {},
    project_list: {},

    selected_project: {}
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
        case ActionTypes.GET_USER_DATA:
            return ({ ...state, user_data: action.payload });
        case ActionTypes.GET_PROJECT_NUMBER:
            return ({ ...state, project_number: action.payload });
        case ActionTypes.GET_PROJECTS:
            return ({ ...state, project_list: action.payload });

        case ActionTypes.SELECTED_PROJECT:
            return ({ ...state, selected_project: action.payload });

        default:
            return state;
    }
}