const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs"); 

const app = express();

const userFilepath = './users.json'; 

app.use(cors());
app.use(bodyParser.json());

const readUsers = () => {
    try {
        const data = fs.readFileSync(userFilepath, 'utf8');
        return JSON.parse(data); 
    } catch (error) {
       
        return [];
    }
};

const writeUsers = (data) => {
    fs.writeFileSync(userFilepath, JSON.stringify(data, null, 2), 'utf8');
};

app.post("/saveData", (req, res) => {
    const data = req.body; 

    const existingUsers = readUsers();

    existingUsers.push(data);

    writeUsers(existingUsers);

    console.log(data); 
    res.send({ message: "ok" });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const users = readUsers();

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        res.send({ message: "ok" });
    } else {
        res.status(401).send({ message: "Invalid credentials" });
    }
});

app.get("/showData", (req, res) => {
    const users = readUsers();
    res.json(users);
});

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});



































// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");


// const app = express();

// const arrData = []; 
// const userData=[]; 

// app.use(cors());

// app.use(bodyParser.json());

// app.post("/saveData", (req, res) => {
//     const data = req.body; 
//     arrData.push(data); 
//     userData.push({
//         email:data.email,
//         password:data.password,
//     });
//     console.log(data); 
//     res.send({ message: "ok" }); 
// });

// app.post("/login",(req,res)=>{
//     const{email,password}=req.body;

//     const user=userData.find(user => user.email===email && user.password === password);

//     if(user){
//         res.send({ message: "ok" });
//     }
//     else {
//         res.status(401).send({ message: "Invalid credentials" });
//     }
// });

// app.get("/showData", (req, res) => {
//     res.json(arrData); 
// });

// app.listen(5000, () => {
//     console.log("Server is running on http://localhost:5000");
// });