<template>
  <div class="user-form">
    <h1>{{ userId ? 'Edit User' : 'Create User' }}</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="user.name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="user.email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="user.password" required />
      </div>
      <button class="submit-button" type="submit">{{ userId ? 'Update' : 'Create' }}</button>
    </form>
  </div>
</template>

<script>
import UserService from '../services/UserService';

export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
      },
      userId: null,
    };
  },
  created() {
    if (this.$route.params.id) {
      this.userId = this.$route.params.id;
      UserService.getUser(this.userId).then(response => {
        this.user = response.data;
      });
    }
  },
  methods: {
    submitForm() {
      if (this.userId) {
        UserService.updateUser(this.userId, this.user).then(() => {
          this.$router.push({ name: 'UserList' });
        });
      } else {
        UserService.createUser(this.user).then(() => {
          this.$router.push({ name: 'UserList' });
        });
      }
    },
  },
};
</script>

<style scoped>
.user-form {
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
}

h1 {
  color: #2c3e50;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
