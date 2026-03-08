// ==================== FIREBASE SETUP ====================
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";

// ==================== CONFIG ====================
const firebaseConfig = {
  apiKey: "AIzaSyBolg6tnT6fyp7TDRL5-T2avCHRxdGNKFc",
  authDomain: "coolkit-12345.firebaseapp.com",
  projectId: "coolkit-12345",
  storageBucket: "coolkit-12345.firebasestorage.app",
  messagingSenderId: "833182669653",
  appId: "1:833182669653:web:d0dde64f38e887230e2ddc",
};

// ==================== INITIALIZE ====================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ==================== AUTH FUNCTIONS ====================
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);
export const onAuthChange = (callback) => onAuthStateChanged(auth, callback);

// ==================== CLUB FUNCTIONS ====================

// Fetch clubs for a given user ID
export const fetchUserClubs = async (uid) => {
  const clubsSnap = await getDocs(collection(db, "clubs"));
  const userClubs = [];

  for (let clubDoc of clubsSnap.docs) {
    const memberDoc = await getDoc(doc(db, `clubs/${clubDoc.id}/members/${uid}`));
    if (memberDoc.exists()) userClubs.push({ id: clubDoc.id, ...clubDoc.data() });
  }

  return userClubs;
};

// Create a new club and set current user as admin
export const createClub = async (name, description, uid) => {
  const newClubRef = await addDoc(collection(db, "clubs"), { name, description });
  await setDoc(doc(db, `clubs/${newClubRef.id}/members`, uid), {
    role: "admin",
    createdBy: uid,
  });
};

// Join an existing club by club ID
export const joinClub = async (clubId, uid) => {
  const clubRef = doc(db, "clubs", clubId);
  const clubSnap = await getDoc(clubRef);

  if (!clubSnap.exists()) throw new Error("Club not found");

  await setDoc(doc(db, `clubs/${clubId}/members`, uid), {
    role: "member",
    createdBy: uid,
  });
};

// ==================== EXPORTS ====================
export { auth, db };