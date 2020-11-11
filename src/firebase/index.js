import router from '@/router'
import store from '@/store'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = ({
  apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
})

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const storage = firebase.storage()

const useridPrefix = 'user-'
const tweetidPrefix = 'tweet-'

export default {
  // App
  setAuthState () {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        store.commit('signin')
      } else {
        store.commit('signout')
      }
    })
  },
  // Home
  updateUsers () {
    db.collection('users').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        const action = change.type
        const data = change.doc.data()

        const user = {
          id: data.id,
          uid: data.uid,
          name: data.name,
          avatar: data.avatar,
          favoriteList: data.favoriteList
        }

        if (action === 'added') {
          store.commit('pushUser', user)
        } else if (action === 'modified') {
          store.commit('modifyUser', user)
        } else if (action === 'removed') {
          store.commit('removeUser', user)
        }
      })
    })
  },
  updateTweets () {
    db.collection('tweets').orderBy('date').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        const action = change.type
        const data = change.doc.data()

        const tweet = {
          id: data.id,
          user: data.user,
          text: data.text,
          date: data.date,
          favorite: data.favorite
        }

        if (action === 'added') {
          store.commit('pushTweet', tweet)
        } else if (action === 'modified') {
          store.commit('modifyTweet', tweet)
        } else if (action === 'removed') {
          store.commit('removeTweet', tweet)
        }
      })
    })
  },
  updateCurrentUser () {
    const uid = firebase.auth().currentUser.uid
    db.collection('users').doc(uid).get()
      .then(doc => {
        store.commit('setCurrentUser', doc.data())
      })
  },
  // Settings
  updateUserProfile (newUsername) {
    const currentUser = store.getters.currentUser
    db.collection('users').doc(currentUser.uid).update({
      name: newUsername
    }).then(() => {
      alert('Account profile is updated!')
    }).catch(error => {
      alert(error.message)
    })
  },
  // TweetForm
  addTweet (newTweetText) {
    const infoRef = db.collection('info').doc('tweet')
    const currentUser = store.getters.currentUser
    const now = new Date()

    db.runTransaction(transaction => {
      return transaction.get(infoRef)
        .then(doc => {
          const newTweetid = doc.data().newTweetid

          db.collection('tweets').doc(tweetidPrefix + newTweetid).set({
            id: tweetidPrefix + newTweetid,
            user: currentUser.uid,
            text: newTweetText,
            favorite: 0,
            date: now
          })
          transaction.update(infoRef, { newTweetid: newTweetid + 1 })
        })
    }).then(() => {
      alert('tweet success!')
    }).catch(error => {
      alert(error.message)
    })
  },
  // Timeline
  deleteTweet (id) {
    db.collection('tweets').doc(id).delete()
  },
  favorite (tweetid, favorite) {
    const currentUser = store.getters.currentUser
    const userRef = db.collection('users').doc(currentUser.uid)

    db.runTransaction(transaction => {
      return transaction.get(userRef)
        .then(doc => {
          const favoriteList = doc.data().favoriteList
          const tweetIndex = favoriteList.indexOf(tweetid)

          if (tweetIndex === -1) {
            db.collection('tweets').doc(tweetid).update({
              favorite: favorite + 1
            })
            transaction.update(userRef, { favoriteList: favoriteList.concat(tweetid) })
          } else {
            db.collection('tweets').doc(tweetid).update({
              favorite: favorite - 1
            })
            transaction.update(userRef, { favoriteList: favoriteList.filter(item => { return item !== tweetid }) })
          }
        })
    }).catch(error => {
      alert(error.message)
    })
  },
  // Register
  registerAccount () {
    const infoRef = db.collection('info').doc('user')
    const currentUser = firebase.auth().currentUser

    return db.runTransaction(transaction => {
      return transaction.get(infoRef)
        .then(doc => {
          const newUserid = doc.data().newUserid
          const usersList = doc.data().usersList

          const userObject = {
            id: useridPrefix + newUserid,
            uid: currentUser.uid,
            name: currentUser.displayName,
            avatar: currentUser.photoURL,
            favoriteList: []
          }

          if (usersList.indexOf(currentUser.uid) === -1) {
            db.collection('users').doc(currentUser.uid).set(userObject)

            transaction.update(infoRef, {
              newUserid: newUserid + 1,
              usersList: usersList.concat(currentUser.uid)
            })
          }
        })
    })
  },
  // Signin
  signin () {
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().signInWithPopup(provider)
      .then(() => {
        router.push('/processing')
      })
      .catch(error => {
        alert(error.message)
      })
  },
  // Signout
  signout () {
    firebase.auth().signOut()
      .then(() => {
        store.dispatch('signout')
        router.push('/signin')
      })
  },
  // Test
  uploadImg (img) {
    const imgRef = storage.ref().child('test.png')
    imgRef.put(img).then(snapshot => {
      console.log('success!')
    }).catch(error => {
      console.error(error.message)
    })
  }
}
