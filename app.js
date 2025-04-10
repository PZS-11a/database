
const { useState } = React;

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setMessage("Minden mező kitöltése kötelező!");
      return;
    }

    const newUser = { username, email, password };

    try {
      const users = (await localforage.getItem("users")) || [];
      users.push(newUser);
      await localforage.setItem("users", users);
      setMessage("✅ Sikeres regisztráció!");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage("❌ Hiba történt: " + error.message);
    }
  };

  return React.createElement(
    'div',
    { className: 'min-h-screen flex items-center justify-center p-4' },
    React.createElement(
      'div',
      { className: 'bg-white p-6 rounded-2xl shadow-xl w-full max-w-md' },
      React.createElement('h1', { className: 'text-2xl font-bold mb-4 flex items-center gap-2' }, '📝 Regisztráció'),
      React.createElement('form', { onSubmit: handleRegister, className: 'space-y-4' },
        React.createElement('input', {
          type: 'text',
          className: 'w-full p-2 border rounded',
          placeholder: 'Felhasználónév',
          value: username,
          onChange: (e) => setUsername(e.target.value)
        }),
        React.createElement('input', {
          type: 'email',
          className: 'w-full p-2 border rounded',
          placeholder: 'Email',
          value: email,
          onChange: (e) => setEmail(e.target.value)
        }),
        React.createElement('input', {
          type: 'password',
          className: 'w-full p-2 border rounded',
          placeholder: 'Jelszó',
          value: password,
          onChange: (e) => setPassword(e.target.value)
        }),
        React.createElement('button', {
          type: 'submit',
          className: 'w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
        }, 'Regisztráció')
      ),
      message && React.createElement('p', { className: 'text-sm text-center mt-2' }, message)
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(Register));
