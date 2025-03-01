const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql")
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'estudiantesweb',
    password:'admin12345',
    database: 'cursoweb',
    port:3306
});

connection.connect(err =>{
    if (err) throw err;
    console.log("conectado a mysql")
});

app.get("/cloud", (req,res)=>{
    const {identification} = req.body;
    connection.query('SELECT * FROM student WHERE identification = ?',[identification], (req,result)=>{
        res.send(result);
    })
    
})
app.get("/usuario/:identification", (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = cursoweb.find(p => p.id === id);
    if (!usuario) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.json(usuario);
});

app.get("/usuarios", (req,res) =>{
    connection.query('SELECT * FROM student', (req,result)=>{
        res.send(result)
    })

})

app.put("/tel",(req,res) => {
    const id = req.body.id
    const new_phone = req.body.phone;

    connection.query('UPDATE student SET phone = ? where id = ?', [new_phone,id], (err,result) => {
        if (err){

        }
        if (result.affectdRows === 0){

        }
        res.json("numero de telefono actualizado")
    })
})

app.put("/identificacion"),(req, res)=>{
    connection.query('UPDATE identification student (identification) VALUES(?)', )
} 
   
app.post("/lista", (req, res) => {
    const {name,last_name,identification,email,phone} = req.body;
    connection.query('INSERT INTO student (name,last_name,identification,email,phone) VALUES (?,?,?,?,?)',
    [name,last_name,identification,email,phone],(err,result) =>{
        
    });
    res.status(201).json({ mensaje: "Usuario agregado"});
});

app.put("/producto/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, precio } = req.body;
    const producto = productos.find(p => p.id === id);
    if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    producto.nombre = nombre;
    producto.precio = precio;
    res.json({ mensaje: "Producto actualizado", producto });
});

app.delete("/producto/:id", (req, res) => {
    const id = parseInt(req.params.id);
    productos = productos.filter(p => p.id !== id);
    res.json({ mensaje: "Producto eliminado" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
