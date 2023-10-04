const express = require('express');
const app = express ();
const PORT = 3000;
const bodyParser = require('body-parser');
const {Comment} = require('./models');
const cors = require("cors")
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use (
    cors({
        origin: "*",
    })
);

app.get("/list-kritik-dan-saran", async (req, res) => {
    try {
        const results = await Comment.findAll();
        return res.send({
            message: "Berhasil menyimpan data",
            status: 200,
            data: results,
        });
    } catch (error) {
        returnres.status(500).send({
            message: "Gagal menampilkan data"
        });
    }
});

app.post("/list-kritik-dan-saran", async (req, res) => {
    try {
        const body = req.body;
        const nama = body.nama;
        const email = body.email; 
        const jenisKeluhan = body.jenisKeluhan;
        const deskripsi = body.deskripsi;

        await Comment.create({
            nama,
            email,
            jenisKeluhan,
            deskripsi,
        });
        return res.send({
            message: "Berhasil menyimpan data",
            status: 200,
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Gagal menyimpan data',
        });
    }
});

app.listen(PORT, () => {
    console.log(`localhost:${PORT}`)
})