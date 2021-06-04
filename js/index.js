const users = [
  { name: "Ali", age: "22", address: "Peshawar", valid: true },
  { name: "Basit", age: "22", address: "Peshawar", valid: false },
];
let global_id;
function fields() {
  const name = document.getElementById("name");
  const age = document.getElementById("age");
  const address = document.getElementById("address");
  const valid = document.getElementById("valid");
  const button = document.getElementById("btn");
  const props = { name, age, address, valid, button };
  return props;
}
function add_update() {
  const { name, age, address, valid, button } = fields();
  if (button.value === "Add") {
    users.push({
      name: name.value,
      age: age.value,
      address: address.value,
      valid: valid.checked,
    });
    setUsers();
    reset();
  } else {
    users.splice(global_id, 1, {
      name: name.value,
      age: age.value,
      address: address.value,
      valid: valid.checked,
    });
    setUsers();
    reset();
    button.value = "Add";
    global_id = undefined;
  }
}
function reset() {
  let { name, age, address, valid, button } = fields();
  name.value = "";
  age.value = "";
  address.value = "";
  valid.checked = false;
  button.value = "Add";
}
function deleteUser(id) {
  users.splice(id, 1);
  setUsers();
}
function enable_disable(id) {
  let user = users[id];
  user.valid = !user.valid;
  users.splice(id, 1, user);
  setUsers();
}
function editUser(id) {
  let user = users[id];
  global_id = id;
  let { name, age, address, valid, button } = fields();
  name.value = user.name;
  age.value = user.age;
  address.value = user.address;
  valid.checked = user.valid;
  button.value = "Update";
}
function search(users, query) {
  return query && query !== ""
    ? users.filter(
        (user) =>
          user.name.toLowerCase().startsWith(query.toLowerCase()) ||
          user.address.toLowerCase().startsWith(query.toLowerCase()) ||
          user.age.toString().toLowerCase().startsWith(query)
      )
    : users;
}
function setUsers() {
  const query = document.getElementById("search").value;
  const tbody = document.getElementById("data");
  const filteredUsers = search(users, query);
  const output = filteredUsers.map((user, i) => {
    return `<tr>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.address}</td>
        <td>${
          user.valid
            ? `<button class="btn btn-success" onclick="enable_disable(${i})">Enabled</button>`
            : `<button class="btn btn-danger" onclick="enable_disable(${i})">Disabled</button>`
        }</td>
        <td>
          <button class="btn btn-info" onclick="editUser(${i})">Edit</button>
          <button class="btn btn-danger" onclick="deleteUser(${i})">Delete</button>
        </td>
      </tr>`;
  });
  tbody.innerHTML = output.join("");
}
function main() {
  setUsers();
}
main();
fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((res) => console.log(res));
