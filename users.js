
async function loadUsers() {
  const users = (await localforage.getItem("users")) || [];
  const list = document.getElementById("userList");
  list.innerHTML = "";

  if (users.length === 0) {
    list.innerHTML = "<p class='text-gray-600'>Nincsenek felhasználók.</p>";
    return;
  }

  users.forEach((user, index) => {
    const item = document.createElement("div");
    item.className = "p-4 bg-gray-50 rounded shadow flex justify-between items-center";
    item.innerHTML = `
      <div>
        <p><strong>Név:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
      </div>
      <button onclick="deleteUser(${index})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Törlés</button>
    `;
    list.appendChild(item);
  });
}

async function deleteUser(index) {
  const users = (await localforage.getItem("users")) || [];
  users.splice(index, 1);
  await localforage.setItem("users", users);
  loadUsers();
}

async function clearAll() {
  if (confirm("Biztosan törlöd az összes felhasználót?")) {
    await localforage.removeItem("users");
    loadUsers();
  }
}

loadUsers();
