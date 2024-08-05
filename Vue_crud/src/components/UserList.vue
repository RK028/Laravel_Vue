<template>
  <div class="user-list">
    <h1>User List</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button class="edit-button" @click="editUser(user.id)">Edit</button>
            <button class="delete-button" @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="create-button" @click="createUser">Create User</button>
  </div>
</template>

<script>
import UserService from '../services/UserService';

export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      UserService.getUsers().then(response => {
        this.users = response.data;
      });
    },
    createUser() {
      this.$router.push({ name: 'UserCreate' });
    },
    editUser(id) {
      this.$router.push({ name: 'UserEdit', params: { id: id } });
    },
    deleteUser(id) {
      UserService.deleteUser(id).then(() => {
        this.fetchUsers();
      });
    },
  },
};
</script>

<style scoped>
.user-list {
  text-align: left;
  margin: 20px;
}

h1 {
  color: #2c3e50;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th, td {
  padding: 12px;
  border: 1px solid #ccc;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

button {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.create-button {
  background-color: #4CAF50;
  color: white;
  margin-top: 10px;
}

.edit-button {
  background-color: #FFC107;
  color: white;
  margin-right: 5px;
}

.delete-button {
  background-color: #F44336;
  color: white;
}
</style>
