Vue.component('todo',{
    template:`
        <div>
            <form>
                <p v-if="errors.length">
                <b> Please correct the error(s):</b>
                    <ul>
                        <li v-for="error in errors">{{ error }}</li>
                    </ul>
                <p>
                <h1 class="text-center">To-Do Application</h1>
                <div class="form-group">
                    <input :class="[ 'form-control' , task && task.length > 5 ? 'textGreen' : 'textRed']" type="text" id="task" v-model="task"
                    value="task"  placeholder="Enter task">
                </div>
                <div class="form-group">
                    <input :class="[ 'form-control' , description && description.length > 5 ? 'textGreen' : 'textRed']" type="text" id="description" v-model="description"
                    value="description"  placeholder="Enter Description">
                </div>
                <div  class="form-group">
                    <button  @click.prevent="onUpdate" class="btn btn-primary" v-if="update">Update</button>
                    <button  @click.prevent="onSubmit" class="btn btn-primary">Submit</button>
                </div>
            </form>
            <showtask @edit="onChange" :tasks="tasks"></showtask>
        </div>
    `,
    data(){
        return{
            task:null,
            description:null,
            status:'Incompleted',
            tasks: [],
            editIndex :null,
            errors:[],
            update:false
        }
    },
    methods:{

        onChange(index){
            this.update = true
            this.task = this.tasks[index].task
            this.description = this.tasks[index].description
            this.editIndex = index
        },
        onUpdate(){
            let taskList = {
                task: this.task,
                description: this.description ,
                status : 'Incompleted',  
            }
            this.tasks[this.editIndex] = taskList
            this.task = null
            this.description = null
            this.update = false
        },

        onSubmit(){
            this.errors = []
            if(this.task && this.description){
                let taskList = {
                    task: this.task,
                    status: 'Incompleted',
                    description: this.description
                }
                this.tasks.push(taskList)
                this.task = null
                this.status = null
                this.description = null
            }
            else{
                if(!this.task) this.errors.push("Task Required")
                if(!this.description) this.errors.push("Description Required")
            }
        },

    }
})

Vue.component('showtask',{
    props:{
        tasks:{
            type:Array,
        }
    },
    template:`
        <div v-if="tasks.length" class="jumbotron">
            <h1> Task-List </h1>
            <hr class="my-4">
            <table class="table table-dark table-hover table-sm">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Task</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Option</th>
                    </tr>
                </thead>
                <tbody v-for="(task,index) in tasks" :key="index" >
                    <tr>
                    <th scope="row">{{index}}</th>
                    <td><p :class="{ checkList: task.status === 'Completed' }">{{task.task}} </p></td>
                    <td>{{task.description}}</td>
                    <td>{{task.status}}</td>
                    <td>
                        <button v-if="task.status === 'Incompleted'" v-on:click="taskCompleted(index)" class="form-control col-md btn-primary"> <i class="fas fa-check-square"></i> Completed </button>
                        <button v-on:click="taskEdit(index)" class="form-control col-md btn-warning mt-1 mb-2"> Edit </button> 
                        <button v-on:click="taskRemove(index)" class="form-control col-md btn-danger mt-1 mb-2"> x Remove </button>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    data(){
        return{
            
        }
    },
    methods:{
        taskCompleted(index){
           this.tasks[index]['status'] = 'Completed';
           
        },
        taskRemove(index){
            this.tasks.splice(index,1)
        },
        taskEdit(index){
            this.$emit('edit',index)
        }
    }

})

new Vue({
    el: '#app',
});