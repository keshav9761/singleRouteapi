let express = require('express')
let cors = require('cors')
const path = require('path')

let app = express();
app.use(express.json())
app.use(cors());

const publicPath = path.join(__dirname, 'Assests');
app.use(express.static(publicPath));


const generateId = () => {
    return Math.floor((Math.random() * 10) + 5);
}

let tasks = [
    {
        id: 1,
        task: "awake at 7 AM"
    }
]


//http://localhost:8080/tolist
app.route('/tolist')
    .get((req, res) => {
        res.send(tasks)
    })
    .post((req, res) => {
        const data = req?.body;
        data.id = generateId();
        tasks?.push(data);
        console.log("id", data.task)
        res.status(201).send({ msg: "Add data successfully", body: data })
    })
    .delete((req, res) => {
        const { id } = req.query;
        const remove = tasks?.filter((v, i) => v.id != id)
        tasks = remove;
        // console.log("first", remove)
        res.send({ msg: "deleted" })
    })
    .patch((req, res) => {
        const { id } = req.body;
        const edit = tasks?.findIndex((v) => v.id == id)
        tasks[edit] = req.body;
        res.send({ msg: "updated data" })
    })

// http://localhost:8080/api/bulb
app.get('/api/bulb', (req, res) => {
    const { status } = req.query
    res.sendFile(path.join(publicPath, `bulb${status}.jpg`));
});





app.listen(8080, () => {
    console.log("server is running on port 8080")
})
