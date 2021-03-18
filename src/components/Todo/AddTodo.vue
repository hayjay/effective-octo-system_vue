<template>

  <div class="submit-form">
    <div class="alert alert-danger" v-if="form_error && !submitted">
      <p>{{ this.error_message }}</p>
    </div>
    <div v-if="!submitted">
      
      <div class="form-group has-error" :class="['controls', errorFlags.todo ? 'has-error' : '']">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="todo.title"
          name="title"
        />
        <span v-if="errorFlags.title" class="help-block">Todo title is required.</span>
      </div>

      <div class="form-group">
        <label for="description">Status</label>
      </div>
      <select name="status" id="inputStatus" class="form-control" v-model="todo.status" required="required" :class="['controls', errorFlags.status ? 'has-error' : '']">
            <option value="">Select One</option>
            <option value="true" selected="selected">Todo</option>
            <option value="false">Done</option>
      </select>
      <span v-if="errorFlags.status" class="help-block">Status field is required.</span>
      <br>
      <button @click="saveTodo" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>Todo addedd successfully!</h4>
      <button class="btn btn-success" @click="newTodo">Add New </button>
    </div>
  </div>
</template>

<script>
import TodoDataService from "../../services/Todo/DataService";

export default {
  name: "add-todo",
  data() {
    return {
      todo: {
        id: null,
        title: null,
        status: null
      },
      errorFlags: {
        status: false,
        title: false,
      },
      submitted: false,
      "form_error" : false,
      "error_message" : "",
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
        if(!this.todo.status) {
          isError = true;
          this.errorFlags.status = true;
        }
        if(!this.todo.title) {
          isError = true;
          this.errorFlags.title = true;
        }
    return !isError;
	},
    saveTodo() {
      if(!this.validateData()) {
        this.error_message = "Please fill all required fields";
        this.form_error = true;
      }
      var data = {
        description: this.todo.title,
        completed: JSON.parse(this.todo.status.toLowerCase()),
      };

      TodoDataService.create(data)
        .then(response => {
          this.todo.id = response.data._id;
          this.submitted = true;
          this.form_error = false;
        })
        .catch(err => {
            if (err.response) {
                this.error_message = err.response.data.error ? err.response.data.error : err.response.data;
                this.form_error = true;
            }
        });
    },
    
    newTodo() {
      this.submitted = false;
      this.todo = {};
    }
  }
};
</script>

<style>
  .submit-form {
    max-width: 300px;
    margin: auto;
  }
</style>
