document.addEventListener('DOMContentLoaded', function() {
    // REGISZTRÁCIÓ
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();
  
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        let users = await localforage.getItem('users') || [];
  
        if (users.some(user => user.username === username)) {
          alert('Ez a felhasználónév már foglalt!');
          return;
        }
  
        users.push({ username, email, password });
        await localforage.setItem('users', users);
  
        alert('Regisztráció sikeres!');
        window.location.href = 'login.html';
      });
    }
  
    // BEJELENTKEZÉS
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
  
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
  
        const users = await localforage.getItem('users') || [];
        const user = users.find(user => user.username === username && user.password === password);
  
        if (user) {
          alert('Sikeres bejelentkezés! Átirányítás...');
          window.location.href = 'https://www.race-shop.hu'; // ✅ ide dob át
        } else {
          alert('Hibás felhasználónév vagy jelszó!');
        }
      });
    }
  });
  