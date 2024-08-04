import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import {
   apiKey,
   authDomain,
   projectId,
   storageBucket,
   messagingSenderId,
   appId,
   measurementId
} from '$env/static/private'

const firebaseConfig = {
   apiKey,
   authDomain,
   projectId,
   storageBucket,
   messagingSenderId,
   appId,
   measurementId
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage()
