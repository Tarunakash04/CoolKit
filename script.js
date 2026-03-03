// ==================== ICONS ====================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
});

// ==================== FIREBASE ====================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBolg6tnT6fyp7TDRL5-T2avCHRxdGNKFc",
    authDomain: "coolkit-12345.firebaseapp.com",
    projectId: "coolkit-12345",
    storageBucket: "coolkit-12345.firebasestorage.app",
    messagingSenderId: "833182669653",
    appId: "1:833182669653:web:d0dde64f38e887230e2ddc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ==================== PAGE ELEMENTS ====================
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const heroUsername = document.getElementById('heroUsername');
const clubsContainer = document.getElementById('clubsContainer');
const createClubBtn = document.getElementById('createClubBtn');
const joinClubBtn = document.getElementById('joinClubBtn');
const dashboardMain = document.getElementById('dashboard-main');
const clubWorkspace = document.getElementById('club-workspace');
const clubTitle = document.getElementById('clubTitle');
const clubDesc = document.getElementById('clubDesc');

// ==================== LOGIN ====================
if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        try {
            await signInWithPopup(auth, provider);
            window.location.href = 'dashboard.html';
        } catch (err) {
            console.error("Login failed:", err);
            alert("Login failed. Check console for details.");
        }
    });
}

// ==================== AUTH STATE ====================
onAuthStateChanged(auth, user => {
    if (!user) return;

    // Landing page may not have dashboard elements
    if (heroUsername) heroUsername.textContent = `👋 Welcome, ${user.displayName || 'User'}!`;

    // Dashboard page
    if (clubsContainer) fetchUserClubs(user.uid);
});

// ==================== LOGOUT ====================
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        await signOut(auth);
        window.location.href = 'index.html';
    });
}

// ==================== FETCH USER CLUBS ====================
async function fetchUserClubs(uid) {
    if (!clubsContainer) return;
    clubsContainer.innerHTML = '';

    try {
        const clubsSnap = await getDocs(collection(db, 'clubs'));
        const userClubs = [];

        for (let clubDoc of clubsSnap.docs) {
            const memberDoc = await getDoc(doc(db, `clubs/${clubDoc.id}/members/${uid}`));
            if (memberDoc.exists()) userClubs.push({ id: clubDoc.id, ...clubDoc.data() });
        }

        if (userClubs.length === 0) {
            clubsContainer.innerHTML = `<p style="text-align:center; color:#6b7280;">You haven’t joined any clubs yet. Use the buttons above to create or join one!</p>`;
        } else {
            userClubs.forEach(club => {
                const card = document.createElement('div');
                card.classList.add('feature-card');
                card.innerHTML = `
                    <div class="feature-icon">🏛️</div>
                    <h3>${club.name}</h3>
                    <p>${club.description}</p>
                `;
                card.addEventListener('click', () => openClubWorkspace(club));
                clubsContainer.appendChild(card);
            });
        }
    } catch (err) {
        console.error('Error fetching clubs:', err);
        clubsContainer.innerHTML = `<p style="text-align:center; color:red;">Failed to load clubs. Refresh the page.</p>`;
    }
}

// ==================== OPEN CLUB WORKSPACE ====================
function openClubWorkspace(club) {
    if (!dashboardMain || !clubWorkspace || !clubTitle || !clubDesc) return;
    dashboardMain.classList.add('hidden');
    clubWorkspace.classList.remove('hidden');
    clubTitle.textContent = club.name;
    clubDesc.textContent = club.description;
    localStorage.setItem('selectedClub', club.id);
}

// ==================== CREATE / JOIN CLUB ====================
if (createClubBtn) {
    createClubBtn.addEventListener('click', async () => {
        const clubName = prompt("Enter club name:");
        if (!clubName) return alert("Club name required!");
        const clubDesc = prompt("Enter club description:");
        if (!clubDesc) return alert("Description required!");

        try {
            const newClubRef = await addDoc(collection(db, 'clubs'), {
                name: clubName,
                description: clubDesc
            });
            await setDoc(doc(db, `clubs/${newClubRef.id}/members`, auth.currentUser.uid), {
                role: 'admin',
                createdBy: auth.currentUser.uid
            });
            alert("Club created!");
            fetchUserClubs(auth.currentUser.uid);
        } catch (err) {
            console.error(err);
            alert("Failed to create club.");
        }
    });
}

if (joinClubBtn) {
    joinClubBtn.addEventListener('click', async () => {
        const clubId = prompt("Enter Club ID to join:");
        if (!clubId) return alert("Club ID required!");
        try {
            const clubDocRef = doc(db, 'clubs', clubId);
            const clubSnap = await getDoc(clubDocRef);
            if (!clubSnap.exists()) return alert("Club not found!");
            await setDoc(doc(db, `clubs/${clubId}/members`, auth.currentUser.uid), {
                role: 'member',
                createdBy: auth.currentUser.uid
            });
            alert("Joined club!");
            fetchUserClubs(auth.currentUser.uid);
        } catch (err) {
            console.error(err);
            alert("Failed to join club.");
        }
    });
}