import { ActionTypes } from '../Actions/actions';
import firebase from 'firebase';

let redirect = {};
let auth = firebase.auth();
let database = firebase.database().ref();
let currentUser = {}
let signUpTemplate = {}
export let projectTemplate = {}

export function setNavigationProps(navigation) {
    return dispatch => {
        console.log('Navigation,', navigation)
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

                const paymentDetails = {
                    fullName: '',
                    address: '',
                    city: '',
                    state: '',
                    postCode: '',
                    country: '',

                    cardNumber: '',
                    cardholderName: '',
                    expiryDate: '',
                    cvv: '',
                }

                dispatch(setUserData(uid, user))
                dispatch(setUserPaymentDetails(uid, paymentDetails))

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
            dispatch(getCurrentUserData())
            dispatch({ type: ActionTypes.SIGNIN_SUCCESS, payload: false })

            redirect.push('/home/dashboard')

        }).catch(error => {
            alert(error.message)
            dispatch({ type: ActionTypes.SIGNIN_SUCCESS, payload: false })

        })

    }
}

export function signUp(paymentDetails) {

    return dispatch => {

        dispatch({ type: ActionTypes.SIGNUP_SUCCESS, payload: true })

        auth.createUserWithEmailAndPassword(signUpTemplate.email, signUpTemplate.password).then(ev => {

            dispatch(setUserData(ev.user.uid, signUpTemplate.user))
            dispatch(setUserPaymentDetails(ev.user.uid, paymentDetails))


        }).catch(error => {
            alert(error.message)
            dispatch({ type: ActionTypes.SIGNUP_ERROR, payload: error.message })
            dispatch({ type: ActionTypes.SIGNUP_SUCCESS, payload: false })

        })

    }
}

export function signUpSaveData(user, email, password) {

    return dispatch => {
        signUpTemplate = {
            user,
            email,
            password
        }

    }
}

export function setUserData(uid, user) {
    // Object.assign({}, user, { profileImg: url, uid: ev.user.uid })
    return dispatch => {
        database.child(`users/${uid}`).set(Object.assign({}, user, { uid: uid })).then(() => {
            // dispatch({ type: ActionTypes.SIGNUP_SUCCESS, payload: false })
            // redirect.push('/dashboard')
        })

    }
}

export function setUserPaymentDetails(uid, paymentDetails) {
    // Object.assign({}, user, { profileImg: url, uid: ev.user.uid })
    return dispatch => {
        database.child(`paymentDetails/${uid}`).set(Object.assign({}, paymentDetails, { uid: uid })).then(() => {
            dispatch({ type: ActionTypes.SIGNUP_SUCCESS, payload: false })
            redirect.push('/home/dashboard')
        })

    }
}

export function getCurrentUser() {
    return new Promise((reslove, reject) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                reslove(user);
            }
        });
    })
}
export function getCurrentUserData() {
    return dispatch => {
        getCurrentUser().then(user => {
            console.log(' getCurrentUser()', user)
            if (user) {
                database.child(`users/${user.uid}`).on('value', ev => {
                    if (ev.val()) {
                        dispatch({ type: ActionTypes.GET_USER_DATA, payload: ev.val() })
                    }
                })
            }
        })

    }
}

export function setProjectTemplate(project) {
    return dispatch => {
        projectTemplate = project
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
