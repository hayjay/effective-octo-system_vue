<template>

  <div class="submit-form">
    <div class="alert alert-danger" v-if="form_error && !submitted">
      <p>{{ this.error_message }}</p>
    </div>
    <div class="alert alert-success" v-if="!form_error && submitted">
      <p>{{ this.success_message }}</p>
    </div>
    <div class="alert alert-info" v-if="!form_error && !submitted">
      <p>Please login to add a Todo.</p>
    </div>
    <div v-if="!submitted">
      
      
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
      <button @click="login" class="btn btn-success">Login</button>
    </div>

  </div>
</template>

<script>
import AuthDataService from "../../services/Auth/DataService";

export default {
  name: "login",
  data() {
    return {
      user: {
        id: null,
        email: null,
        password: null,
      },
      errorFlags: {
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
    login() {
        localStorage.removeItem("x-access-token");
        localStorage.removeItem("x-access-token-expiration");
      if(!this.validateData()) {
        this.error_message = "Please fill all required fields";
        this.form_error = true;
      }
      var data = {
        email: this.user.email,
        password: this.user.password,
      };
      AuthDataService.login(data)
        .then(response => {
            localStorage.setItem('x-access-token', response.data.token);
            let numOfHours = data.remember ? 200000 : 3;
            let date = Date.now() + numOfHours * 60 * 60 * 1000;
            localStorage.setItem('x-access-token-expiration', date);
            this.submitted = true;
            this.form_error = false;
            this.success_message = "Login successful.";
            document.location.href = "/add";
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
 