const Express = require("express");
const {graphqlHTTP} = require("express-graphql");
const Mongoose = require("mongoose");
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");

var app = Express();


Mongoose.connect("mongodb://localhost:27017/graphql",{ useNewUrlParser: true, useUnifiedTopology: true });

let TaskSchema = new Mongoose.Schema({
    title: String
})


TaskSchema.add({
    parent: TaskSchema
})


 const TaskModel = Mongoose.model("Task",TaskSchema)

const TaskType = new GraphQLObjectType({
    name: "Task",
    fields: () => ({
        id:{
            type: GraphQLID,
        },
        title:{
            type: GraphQLString,
        },
        parent: {
            type: TaskType,
            resolve(task) {
                return task.parent? TaskModel.findById(task.parent.id).exec(): {}
            }
        }
    })
})

const schema= new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields:{
            tasks:{
                type: GraphQLList(TaskType),
                resolve: (root,args,context,info) =>{
                    return TaskModel.find().exec()
                }
            },
            task:{
                type: TaskType,
                args:{
                    id:{type: GraphQLNonNull(GraphQLString)}
                },
                resolve: (root,args,context,info)=>{
                    return TaskModel.findById(args.id).exec()
                }
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields:{
            createTask:{
                type: GraphQLID,
                args:{
                    title: { type: GraphQLNonNull(GraphQLString) },
                    parentId: { type: GraphQLString }
                },
                resolve: (root, args, context, info) =>{
                    const task = new TaskModel({parent:{_id:args.parentId? args.parentId: null},...args})
                    task.save()
                    return task.id
                }
            }
        }
    })
});

app.use("/graphql",graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(3000,()=>{console.log("Run")})