<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <select name="status" id="inputStatus" class="form-control" @change="filterByStatus($event)" v-model="title" required="required">
            <option value="">Filter by Status</option>
            <option value="true" selected="selected">Todo</option>
            <option value="false">Done</option>
        </select>
        
      </div>
    </div>
    
    <div class="col-md-12">
      <h4>Todo List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          v-for="(todo, index) in todos"
          :key="index"
        >
          {{ todo.description }}
        </li>
      </ul>

      
    </div>
  </div>
</template>

<script>
import TodoDataService from "../../services/Todo/DataService";
export default {
  data() {
    return {
      todos: [],
      currentTodo: null,
      title: ""
    };
  },
  methods: {
    retrieveTodos() {
      TodoDataService.getAll()
        .then(response => {
          this.todos = response.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    filterByStatus(event) {
      TodoDataService.findByStatus(event.target.value)
        .then(response => {
          this.todos = response.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveTodos();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
