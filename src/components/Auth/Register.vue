<template>

  <div class="submit-form">
    <div class="alert alert-info" v-if="!form_error && !submitted">
      <p>Welcome, To add a todo, kindly register as a user or <router-link to="/auth/login" class="nav-link" v-if="!is_authenticated">Login</router-link> if you already have an account.</p>
    </div>
    <div class="alert alert-danger" v-if="form_error && !submitted">
      <p>{{ this.error_message }}</p>
    </div>
    <div class="alert alert-success" v-if="!form_error && submitted">
      <p>{{ this.success_message }}</p>
    </div>
    <div v-if="!submitted">
      
      <div class="form-group has-error" :class="['controls', errorFlags.name ? 'has-error' : '']">
        <label for="title">Name</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="user.name"
          name="name"
        />
        <span v-if="errorFlags.name" class="help-block">Name field is required.</span>
      </div>
      <div class="form-group has-error" :class="['controls', errorFlags.email ? 'has-error' : '']">
        <label for="title">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          required
          v-model="user.email"
          name="email"
        />
        <span v-if="errorFlags.email" class="help-block">Email field is required.</span>
      </div>
      <div class="form-group has-error" :class="['controls', errorFlags.password ? 'has-error' : '']">
        <label for="title">Password</label>
        <input
          type="password"
          class="form-control"
          id="title"
          required
          v-model="user.password"
          name="password"
        />
        <span v-if="errorFlags.password" class="help-block">Password field is required.</span>
      </div>
      <br>
      <button @click="register" class="btn btn-success">Register</button>
    </div>

  </div>
</template>

<script>
import AuthDataService from "../../services/Auth/DataService";

export default {
  name: "add-user",
  data() {
    return {
      user: {
        id: null,
        name: null,
        email: null,
        password: null,
      },
      errorFlags: {
        name: false,
        email: false,
        password: false,
      },
      submitted: false,
      "form_error" : false,
      "error_message" : "",
      "success_message" : "",

    };
  },
  methods: {
    clearErrors: function() {
      for(var key in this.errorFlags) {
        if(this.errorFlags.hasOwnProperty(key)) {
          this.errorFlags[key] = false;
        }
      }
    },
    validateData: function() {
        this.clearErrors();
        var isError = false;
        if(!this.user.name) {
          isError = true;
          this.errorFlags.name = true;
        }
        if(!this.user.email) {
          isError = true;
          this.errorFlags.email = true;
        }
        if(!this.user.password) {
          isError = true;
          this.errorFlags.password = true;
        }
		return !isError;
	},
    register() {
      if(!this.validateData()) {
        this.error_message = "Please fill all required fields";
        this.form_error = true;
      }
      var data = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
      };

      AuthDataService.register(data)
        .then(response => {
          localStorage.setItem('x-access-token', response.data.token);
          let date = Date.now() + 6 * 60 * 60 * 1000;
          localStorage.setItem('x-access-token-expiration', date);
          this.submitted = true;
          this.form_error = false;
          this.success_message = "Registration successful, please login.";
          this.$router.push('/auth/login') 
        })
        .catch(err => {
            if (err.response) {
                this.error_message = err.response.data;
                this.form_error = true;
            }
        });
    },
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
