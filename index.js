let express = require('express')
let cors = require('cors')
const db = require('./connection')
const path = require('path');

let app = express();
app.use(express.json())
app.use(cors());

const publicPath = path.join(__dirname, 'Assests');
app.use(express.static(publicPath));


// const generateId = () => {
//     return Math.floor((Math.random() * 10) + 5);
// }

// let tasks = [
//     {
//         id: 1,
//         task: "awake at 7 AM"
//     }
// ]


//http://localhost:8080/tolist

app.route('/tolist')
    .get((req, res) => {
        db.query('SELECT * FROM todolist', (err, result) => {
            if (err) {
                console.log('error', err);
                return;
            }
            // console.log("result", result);
            res.send(result)
        })
    })
    .post((req, res) => {
        const { task } = req?.body;
        const sql = 'INSERT INTO todolist (task) VALUES (?)';

        db.query(sql, [task], (err, result) => {
            if (err) {
                console.log("post error", err)
            }
            // console.log("post data", result)
            res.send(result);
        })

    })
    .delete((req, res) => {
        const { id } = req.query;
        const query = `DELETE FROM todolist WHERE id = ${id}; `
        db.query(query, (err, result) => {
            if (err) { console.log("delte error", err) }
            res.send({ message: "deleted" })
        })
    })
    .patch((req, res) => {
        const { id, task } = req.body;
        console.log("update", task, id)
        db.query('UPDATE todolist SET task=?  WHERE id=?', [task, id], (err, result) => {
            if (err) { console.log("patch ERRor", err) }
            res.send(result);
        })
    })

// http://localhost:8080/api/bulb
app.get('/api/bulb', (req, res) => {
    const { status } = req.query
    res.sendFile(path.join(publicPath, `bulb${status}.jpg`));
});

//http://localhost:8080/all-type
app.post('/all-type/:id/:name', (req, res) => {
    const param = req.params;
    const query = req.query;
    const body = req.body;
    res.send({ param: param, query: query, body: body });
})
//http://localhost:8080/all-type/2/i am param?id=3 &name="i am query"



app.listen(8080, () => {
    console.log("server is running on port 8080")
})
