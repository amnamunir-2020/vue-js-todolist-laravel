<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Todo List </div>

                    <div class="card-body">
                       <div class="input-group">
                        <input type="text" placeholder="todo..." class="form-control" v-model="todo_input" >



                      

                       <div class="input-group-append">
                        <button type="button" v-if="!edit_todo_id" class="btn btn-info" @click="saveTodo()"> Add </button>
                       
                        <button type="button" v-else class="btn btn-info" @click="updateTodo()"> Update </button>

                       </div>

                    </div>

                    <button type="button"  class="btn btn-sm text-danger  " @click="resetTodo()"> Reset </button>



                    <!-- {{ todos }}
                    -->

                    <table class="table table-bordered mt-3">
                        <thead>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Action</th>

                        </thead>

                        <tbody>
                            <tr v-for="(value,index) in todos" :key="index">
                                <td> {{ ++index }} </td>
                                <td>{{value.name}}</td>
                                <td> <button type="button" class="btn btn-danger btn-sm" @click="deleteTodo(--index)"> Delete</button>
                                    <button type="button" class="btn btn-info btn-sm " @click="editTodo(--index)"> Edit</button>
                                
                                </td>
                           
                           
                            </tr>

                        </tbody>

                    </table>

                      
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
     
        data(){
          return{
            todos:[],
            api:'http://127.0.0.1:8000/api/todos',
            todo_input:'',
            edit_todo_id:'',
            edit_index:''
          }
        },

          mounted()  {
            this.axios.get(this.api).then(res => {
         this.todos=res.data;
      });

         },


         methods:{saveTodo(){

            if(this.todo_input.length>0){
               let data={'name':this.todo_input};
                this.axios.post(this.api,data).then(res => {
       this.todos.push(res.data);
       this.todo_input='';

      });

            }

// console.log(this.todo_input)

         },
         deleteTodo(index){
            if(this.todos[index].id){
                this.axios.delete(this.api+'/'+this.todos[index].id).then(res=>{
                  this.todos.splice(index,1);
                });

            }

         },


         editTodo(index){

            if(this.todos[index].id){
               this.todo_input=this.todos[index].name;
               this.edit_todo_id=this.todos[index].id;
               this.edit_index=index;
              

            }

         },

         updateTodo(){
          
            if(this.todo_input.length>0){
               let data={'name':this.todo_input};
                this.axios.patch(this.api+'/'+this.todos[this.edit_index].id,data).then(res => {
    this.todos[this.edit_index].name=res.data.name;

      });

            }

         },

         resetTodo(){
            this.todo_input='';
            this.edit_index='';
            this.edit_todo_id='';
         }





        
        }
         


         
    }

     //listing ko hum varaibles mai define keraygay now property used data
      //todos in array form multiple objects hogaye
         
        //get api data fetch
    
        //first request hogi request hogi apnay vue js kai ander sub hi data ko fetch kerna chahta hai islia
          //data property ko access kernay kailia this keyword lagana peryaga

//jo bi apki api call hogi wo axios kai through hogi!!

// Axios is a promise-based HTTP library that lets developers make requests to either their own or a third-party server to fetch data.
 //It offers different ways of making requests such as GET , POST , PUT/PATCH , and DELETE 


    
</script>



