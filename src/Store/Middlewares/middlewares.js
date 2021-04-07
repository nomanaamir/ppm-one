import { ActionTypes } from '../Actions/actions';
import firebase from 'firebase';

let redirect = {};
let auth = firebase.auth();
let database = firebase.database().ref();
let currentUser = {}
let signUpTemplate = {}
export let projectTemplate = {}
export let bucketTemplate = []
export let tasksTemplate = []
export let tasks = []





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

export function addProject() {
    // Object.assign({}, user, { profileImg: url, uid: ev.user.uid })
    return dispatch => {
        console.log('projectTemplate', projectTemplate)
        console.log('tasks', tasks)
        const filteredTasks = tasks.filter(a => {
            if (a.tasks.length === 0) {
                return a.tasks = ['empty']
            }

        })
        // const project = Object.assign({}, projectTemplate, { tasks: tasks })

        getCurrentUser().then(user => {
            
            if (user && user?.uid !== '') {
                const userProject = Object.assign({}, projectTemplate, { uid: user.uid, buckets: tasks })
                userProject.forecastBurndownRange.filter(a => {
                    if (a.effort === undefined && a.financial === undefined) {
                        a.effort = '';
                        a.financial = ''
                    }
                })
                console.log('tasksssssssssss:=>', tasks)
                console.log('user.uid:=>', user.uid)
                console.log('userProject=>', userProject)

                database.child(`projects/${user.uid}`).push(userProject).then(() => {
                    database.child(`projectNumber`).set({ number: firebase.database.ServerValue.increment(1) }).then(() => {
                        alert('Project Added')
                    })
                    projectTemplate = {
                        contingency: "",
                        description: "",
                        endDate: '',
                        endDateDisplay: "",
                        fixedPrice: false,
                        forecastBreakdown: [],
                        forecastBurndownRange: [],
                        forecastHours: "",
                        name: "",
                        number: "",
                        projectServices: "",
                        startDate: '',
                        startDateDisplay: "",
                        timeMaterials: false,
                    }
                    bucketTemplate = []
                    tasksTemplate = []
                    tasks = []
                })
                // console.log(Object.assign({}, project, { uid: user.uid }))
            }
        })
        // database.child(`projects/${uid}`).push().then(() => {

        // })

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
export function getProjectNumber() {
    return dispatch => {
        database.child('projectNumber').on('value', ev => {
            if (ev.val()) {
                const { number } = ev.val()
                let newNumber = parseInt(number) + 1
                let code = 'PRO';
                let singleZero = '0';
                let doubleZero = '00';
                let proNum = '';
                if (newNumber <= 9) {
                    proNum = code + doubleZero + newNumber;
                } else if (newNumber <= 98) {
                    proNum = code + singleZero + newNumber;
                } else {
                    proNum = code + newNumber;
                }
                console.log('project number', proNum)
                dispatch({ type: ActionTypes.GET_PROJECT_NUMBER, payload: { projectNumber: proNum } })
            } else {
                dispatch({ type: ActionTypes.GET_PROJECT_NUMBER, payload: { projectNumber: '001' } })

            }
        })
    }
}
export function setProjectTemplate(project) {
    return dispatch => {
        projectTemplate = project
    }
}
export function setBucketTemplate(bucket) {
    return dispatch => {
        if (!bucketTemplate.some(a => a.bucketID === bucket.bucketID)) {
            bucketTemplate.push(bucket)
            tasks.push(
                {
                    bucketName: bucket.bucketName,
                    bucketID: bucket.bucketID,
                    startDate: '',
                    endDate: '',
                    startDateDisplay: '',
                    endDateDisplay: '',
                    tasks: []
                }
            )
        }

    }
}

export function setTasksTemplate(tasks) {
    return dispatch => {
        tasksTemplate = tasks
    }
}
export function setTasks(tasks) {
    return dispatch => {
        tasks = tasks
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
