import { ActionTypes } from '../Actions/actions';
import firebase from 'firebase';

let redirect = {};
let auth = firebase.auth();
let database = firebase.database().ref();



export function setNavigationProps(navigation) {
    console.log('navigation:', navigation)
    return dispatch => {
        redirect = navigation;


    }
}
export function microsoftLogIn() {
    return dispatch => {
        var provider = new firebase.auth.OAuthProvider('microsoft.com');
        provider.setCustomParameters({
            // Optional "tenant" parameter in case you are using an Azure AD tenant.
            // eg. '8eaef023-2b34-4da1-9baa-8bc8c9d6a490' or 'contoso.onmicrosoft.com'
            // or "common" for tenant-independent tokens.
            // The default value is "common".
            tenant: 'df236dfc-ca99-4c96-b450-34d0ce02b57a'
        });

        auth.signInWithPopup(provider)
            .then((result) => {
                // IdP data available in result.additionalUserInfo.profile.
                // ...

                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // OAuth access and id tokens can also be retrieved:
                var accessToken = credential.accessToken;
                var idToken = credential.idToken;

                console.log('accessToken', accessToken)
                console.log('idToken', idToken)
                const { displayName, mail } = result.additionalUserInfo.profile
                const { uid } = result.user
                const user = {
                    name: displayName,
                    email: mail,
                    company: ''
                }
                console.log('result', displayName, mail, uid)

                dispatch(setUserData(uid, user))

            })
            .catch((error) => {
                // Handle error.
            });

    }
}

export function signIn(email, password) {

    return dispatch => {
        dispatch({ type: ActionTypes.SIGNIN_SUCCESS, payload: true })

        auth.signInWithEmailAndPassword(email, password).then(() => {
            dispatch({ type: ActionTypes.SIGNIN_SUCCESS, payload: false })

            redirect.push('/dashboard')

        }).catch(error => {
            alert(error.message)
            dispatch({ type: ActionTypes.SIGNIN_SUCCESS, payload: false })

        })

    }
}

export function signUp(user, email, password) {

    return dispatch => {
        dispatch({ type: ActionTypes.SIGNUP_SUCCESS, payload: true })

        auth.createUserWithEmailAndPassword(email, password).then(ev => {

            dispatch(setUserData(ev.user.uid, user))

        }).catch(error => {
            alert(error.message)
            dispatch({ type: ActionTypes.SIGNUP_ERROR, payload: error.message })
            dispatch({ type: ActionTypes.SIGNUP_SUCCESS, payload: false })

        })

    }
}
export function setUserData(uid, user) {
    // Object.assign({}, user, { profileImg: url, uid: ev.user.uid })
    return dispatch => {
        database.child(`users/${uid}`).set(Object.assign({}, user, { uid: uid })).then(() => {
            dispatch({ type: ActionTypes.SIGNUP_SUCCESS, payload: false })
            redirect.push('/dashboard')
        })

    }
}

export function logOut() {
    // Object.assign({}, user, { profileImg: url, uid: ev.user.uid })
    return dispatch => {
        auth.signOut().then(() => {
            redirect.push('/')
        })
    }
}
