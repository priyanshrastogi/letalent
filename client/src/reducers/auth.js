import { LOGIN_USER, LOGOUT_USER, AUTH_ERROR } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case LOGIN_USER:
            return { ...state, authenticated: true };

        case LOGOUT_USER:
            return { ...state, authenticated: false };

        case AUTH_ERROR:
            window.$.notify({
                message: action.payload

            }, {
                    type: 'danger',
                    timer: 1000,
                    delay: 2000,
                    placement: {
                        from: 'top',
                        align: 'center'
                    },
                });
            return {...state, error: action.payload};

        default:
            return state;
    }
}