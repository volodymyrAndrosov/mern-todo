// default imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//custom imports
const Todo = require('./models/Todo');

//main app
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connected to DB ")
}).catch(console.error);

app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
});

app.post('/todo/new', (req, res) => {
    const { text } = req.body;
    const todo = new Todo({
        text
    });

    todo.save();
    res.json(todo);
});

//id is dynamic parameter URL
app.delete('/todo/delete/:id', async (req, res) => {
    const { id } = req.params;

    const result = await Todo.findByIdAndDelete(id);

    res.json(result);
})

app.put('/todo/complete/:id', async (req, res) => {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})


app.listen(3001, () => console.log("Server is stared on port 3001"));
