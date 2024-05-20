const express = require('express')
const app = express()
const port = 5000;
const cors = require('cors');
const bcrypt = require('bcryptjs');
const filemulter = require('../backend/middleware/multer');
const filemulterUser = require('../backend/middleware/multerUser');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
app.use(bodyParser.json());
var mysql = require('mysql');
const { upload } = require('@testing-library/user-event/dist/upload');
const path = require('path');

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors({
    origin: '*',
    credentials: true, // если в запросе используются куки или заголовки аутентификации,
    allowedHeaders: 'Content-Type,Authorization',
}));
//  УРаааааа, я забыл тебе парсер json поставить , поэтому post не работал как надо, хах
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fotobank',
});

app.get('/', (req, res) => {
    pool.query(`SELECT * FROM users`, (error, results) => {
        if (error) throw error;
        if (results) {
            res.status(200).json({ success: false, data: results })
        }
    });
});

app.get('/user', (req, res) => {
    console.log(req.query);
    // const salt =  bcrypt.getSalt(10)

    bcrypt.hash(req.query.passwordreg, 10, (err, hash) => {
        if (err) {
            console.log("err: ", err);
            res.status(500).json({ success: false, data: error, message: "Ошибка! Повторите попытку." })
        }
        if (hash) {
            pool.query(`INSERT INTO users (name,fulname, number, email, password, selectetForm, sity, print ) VALUES ( '${req.query.name}', '${req.query.fulname}', '${req.query.number}' , '${req.query.emailreg}', '${hash}', '${req.query.selectedForm}', '${req.query.sity}', '${req.query.print}')`, (error, results) => {
                if (error) {//ловушка
                    console.log(error);
                    res.status(500).json({ success: false, data: error, message: "Ошибка! Повторите попытку." })
                }
                // Делай ловушку для ошибок! Иначе сервер будет ложиться :(
                if (results) {
                    console.log(results);
                    res.status(200).json({ success: true, data: results, message: "Пользователь зареган" })
                }
            });
        }
    })
});
app.get('/inputfoto', (req, res) => {
    console.log(req.query);
    pool.query(`INSERT INTO portvolio (iduser, name, fulname, number, sity, print, link) VALUES ('${req.query.userId}', '${req.query.name}', '${req.query.fulname}', '${req.query.number}', '${req.query.sity}', '${req.query.print}', '${req.query.portvolio}')`, (err, resSes) => {
        if (err) {

            res.status(500).json({ success: false, data: err, message: "Ошибка! Повторите попытку." })
            console.log(err);
        }
        else if (resSes) {
            res.status(200).json({ success: true, data: resSes, message: 'Данные зарегистрированы' })
            // res.status(200).json({ success: true, data: resSes, sessionId: sessionId, message: 'Данные зарегистрированы' }) - внимательнее с данными. Ошибка была в  sessionId: sessionId - его тут нет, потому что такая переменная не инитцилизированна и неоткуда не берется.
            console.log(resSes);
        }
    })

});

app.post('/create_image', (req, res) => {
    console.log(req.body);
});

app.get('/login', (req, res) => {
    pool.query(`SELECT * FROM users WHERE email = '${req.query.email}' `, (error, results) => {
        if (error) { //ловушка
            console.log(error);;
            res.status(500).json({ success: false, data: error, message: "Ошибка! Повторите попытку." })
        }
        if (results != '') {
            console.log(results[0].password);

            bcrypt.compare(req.query.password, results[0].password, function (err, passwordIsCorrect) {
                // result == true
                if (err) {
                    res.status(500).json({ success: false, data: err, message: "Ошибка! Повторите попытку." })
                } else if (passwordIsCorrect) {
                    // пароль подошел и пользователь найден, выдаем сессию
                    let sessionId = uuidv4();
                    pool.query(`INSERT INTO sessions(userId, sessionId) VALUES (${results[0].id}, '${sessionId}')`, (err, resSes) => {
                        if (err) {
                            res.status(500).json({ success: false, data: err, message: "Ошибка! Повторите попытку." })
                        }
                        else if (resSes) {
                            res.status(200).json({ success: true, data: resSes, sessionId: sessionId, message: 'Пользователь найден' })
                        }
                    })

                } else if (!passwordIsCorrect) {
                    res.status(500).json({ success: true, data: err, message: 'Неверный пароль!' })
                }

            });
        }
        else {
            res.status(500).json({ success: false, data: results, message: 'Пользователь не найден' })
        }
    })

})

app.get('/checkSession', (req, res) => {
    if (req.query.sessionId) {
        pool.query(`SELECT * FROM users JOIN sessions ON sessions.userId = users.id WHERE sessions.sessionId LIKE '${req.query.sessionId}'`, (err, resCheck) => {
            if (err) {
                res.status(500).json({ success: false, data: err, message: "Ошибка! Повторите попытку." })
            }
            else if (resCheck) {
                if (resCheck != '') {
                    res.status(200).json({ success: true, data: resCheck, message: 'Пользователь найден по сессии' })
                } else {
                    res.status(500).json({ success: false, data: resCheck, message: 'Пользователь не найден по сессии' })
                }
            }
        });
    }
    else
        res.status(500).json({ success: false, message: 'Необходимо указать сессию' })
});

// вывод фотографий

app.post('/upload', filemulter.single('image'), (req, res) => {
    const userId = req.body.userId;
    const title = req.body.title;
    const widthFoto = req.body.widthFoto;
    const description = req.body.description;
    const heightFoto = req.body.heightFoto;
    const tagOne = req.body.tagOne;
    const tagTwo = req.body.tagTwo;
    const tagThree = req.body.tagThree;

    if (!req.file || !userId || !title || !widthFoto || !description || !heightFoto || !tagOne || !tagTwo || !tagThree) {
        return res.status(400).send('Отсуствует файл или юзер');
    }

    const filename = req.file.filename;
    const filePath = `/fotousers/${filename}`;

    const sql = `INSERT INTO img (idu, img, title, widthFoto, description, heightFoto, tagOne, tagTwo, tagThree) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    pool.query(sql, [userId, filename, title, widthFoto, description, heightFoto, tagOne, tagTwo, tagThree], (err, result) => {
        if (err) throw err;
        res.send({ success: true, filename: filename, path: filePath });
    });
});
app.get('/selectfoto', (req,res)=>{
    pool.query(`SELECT img FROM img WHERE idu LIKE '${req.query.userId}'`, (err, resfoto)=>{
        if(err){
            res.status(500).json({ success: false, data: err, message: "Ошибка! Повторите попытку." })
            
        }
        else if(resfoto){
        if(resfoto){
            res.status(200).json({ success: true, data: resfoto, message: 'Данные перешли' })
        }
        else{
            res.status(500).json({ success: false, data: resfoto, message: 'Данных нет' })
        }
    }
    })
});
app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'fotousers', filename);
    res.sendFile(filePath);
});

app.post('/uploadAvatar', filemulterUser.single('image'), (req, res) => {
    const userId = req.body.userId;

    if (!req.file || !userId) {
        return res.status(400).send('Отсуствует файл или юзер');
    }

    const filename = req.file.filename;
    const filePath = `/avotarfoto/${filename}`;

    const sql = `INSERT INTO avatar (iduser, img) VALUES (?, ?)`;

    pool.query(sql, [userId, filename,], (err, result) => {
        if (err) throw err;
        res.send({ success: true, filename: filename, path: filePath });
    });
});
app.get('/selectfotoavatar', (req,res)=>{
    pool.query(`SELECT img FROM avatar WHERE iduser LIKE '${req.query.userId}'`, (err, resfoto)=>{
        if(err){
            res.status(500).json({ success: false, data: err, message: "Ошибка! Повторите попытку." })
            
        }
        else if(resfoto){
        if(resfoto){
            res.status(200).json({ success: true, data: resfoto, message: 'Данные перешли' })
        }
        else{
            res.status(500).json({ success: false, data: resfoto, message: 'Данных нет' })
        }
    }
    })
});
app.get('/uploadsAvatar/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'avotarfoto', filename);
    res.sendFile(filePath);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 
app.get('/selectimg', (req,res)=>{
    pool.query(`SELECT * FROM img `, (err, resfoto)=>{
        if(err){
            res.status(500).json({ success: false, data: err, message: "Ошибка! Повторите попытку." })
            
        }
        else if(resfoto){
        if(resfoto){
            res.status(200).json({ success: true, data: resfoto, message: 'Данные перешли' })
        }
        else{
            res.status(500).json({ success: false, data: resfoto, message: 'Данных нет' })
        }
    }
    })
});
app.get('/selectimgbeauty', (req,res)=>{
    pool.query(`SELECT  * FROM img WHERE tagOne='красота' OR tagTwo='красота' OR tagThree='красота' `, (err, resfoto)=>{
        if(err){
            res.status(500).json({ success: false, data: err, message: "Ошибка! Повторите попытку." })
            
        }
        else if(resfoto){
        if(resfoto){
            res.status(200).json({ success: true, data: resfoto, message: 'Данные перешли' })
        }
        else{
            res.status(500).json({ success: false, data: resfoto, message: 'Данных нет' })
        }
    }
    })
});
app.get('/selectimgeat', (req,res)=>{
    pool.query(`SELECT  * FROM img WHERE tagOne='еда' OR tagTwo='еда' OR tagThree='еда' `, (err, resfoto)=>{
        if(err){
            res.status(500).json({ success: false, data: err, message: "Ошибка! Повторите попытку." })
            
        }
        else if(resfoto){
        if(resfoto){
            res.status(200).json({ success: true, data: resfoto, message: 'Данные перешли' })
        }
        else{
            res.status(500).json({ success: false, data: resfoto, message: 'Данных нет' })
        }
    }
    })
});
app.get('/selectimganimals', (req,res)=>{
    pool.query(`SELECT  * FROM img WHERE tagOne='животное' OR tagTwo='животное' OR tagThree='животное' OR tagOne='животные' OR tagTwo='животные' OR tagThree='животные'`, (err, resfoto)=>{
        if(err){
            res.status(500).json({ success: false, data: err, message: "Ошибка! Повторите попытку." })
            
        }
        else if(resfoto){
        if(resfoto){
            res.status(200).json({ success: true, data: resfoto, message: 'Данные перешли' })
        }
        else{
            res.status(500).json({ success: false, data: resfoto, message: 'Данных нет' })
        }
    }
    })
});
app.get('/selectimgpipls', (req,res)=>{
    pool.query(`SELECT  * FROM img WHERE tagOne='люди' OR tagTwo='люди' OR tagThree='люди' OR tagOne='женщина' OR tagTwo='женщина' OR tagThree='женщина' OR tagOne='мужчина' OR tagTwo='мужчина' OR tagThree='мужчина'`, (err, resfoto)=>{
        if(err){
            res.status(500).json({ success: false, data: err, message: "Ошибка! Повторите попытку." })
            
        }
        else if(resfoto){
        if(resfoto){
            res.status(200).json({ success: true, data: resfoto, message: 'Данные перешли' })
        }
        else{
            res.status(500).json({ success: false, data: resfoto, message: 'Данных нет' })
        }
    }
    })
});
app.get('/selectimgsity', (req,res)=>{
    pool.query(`SELECT  * FROM img WHERE tagOne='город' OR tagTwo='город' OR tagThree='город'`, (err, resfoto)=>{
        if(err){
            res.status(500).json({ success: false, data: err, message: "Ошибка! Повторите попытку." })
            
        }
        else if(resfoto){
        if(resfoto){
            res.status(200).json({ success: true, data: resfoto, message: 'Данные перешли' })
        }
        else{
            res.status(500).json({ success: false, data: resfoto, message: 'Данных нет' })
        }
    }
    })
});
app.get('/selectimgaesthetics', (req,res)=>{
    pool.query(`SELECT  * FROM img WHERE tagOne='эстетика' OR tagTwo='эстетика' OR tagThree='эстетика'`, (err, resfoto)=>{
        if(err){
            res.status(500).json({ success: false, data: err, message: "Ошибка! Повторите попытку." })
            
        }
        else if(resfoto){
        if(resfoto){
            res.status(200).json({ success: true, data: resfoto, message: 'Данные перешли' })
        }
        else{
            res.status(500).json({ success: false, data: resfoto, message: 'Данных нет' })
        }
    }
    })
});
app.get('/selectportvolio', (req,res)=>{
    pool.query(`SELECT * FROM avatar JOIN portvolio ON avatar.iduser = portvolio.iduser`, (err, resfoto)=>{
        if(err){
            res.status(500).json({ success: false, data: err, message: "Ошибка! Повторите попытку." })
            
        }
        else if(resfoto){
        if(resfoto){
            res.status(200).json({ success: true, data: resfoto, message: 'Данные перешли' })
        }
        else{
            res.status(500).json({ success: false, data: resfoto, message: 'Данных нет' })
        }
    }
    })
});
app.get('/poisk', (req,res)=>{
    pool.query(`SELECT * FROM avatar JOIN portvolio ON avatar.iduser = portvolio.iduser WHERE portvolio.name LIKE '${req.query.poist}' OR portvolio.fulname LIKE '${req.query.poist}'`, (err, resfoto)=>{
        if(err){
            res.status(500).json({ success: false, data: err, message: "Ошибка! Повторите попытку." })
            
        }
        else if(resfoto){
        if(resfoto){
            res.status(200).json({ success: true, data: resfoto, message: 'Данные перешли' })
        }
        else{
            res.status(500).json({ success: false, data: resfoto, message: 'Данных нет' })
        }
    }
    })
});
app.get('/uploadsimg/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'fotousers', filename);
    res.sendFile(filePath);
});
app.get('/uploadsimgbeauty/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'fotousers', filename);
    res.sendFile(filePath);
});
app.get('/uploadsimgeat/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'fotousers', filename);
    res.sendFile(filePath);
});
app.get('/uploadsimganimals/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'fotousers', filename);
    res.sendFile(filePath);
});
app.get('/uploadsimgpipls/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'fotousers', filename);
    res.sendFile(filePath);
});
app.get('/uploadsimgsity/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'fotousers', filename);
    res.sendFile(filePath);
});
app.get('/uploadsimgaesthetics/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'fotousers', filename);
    res.sendFile(filePath);
});
app.get('/uploadsportvolio/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'avotarfoto', filename);
    res.sendFile(filePath);
});
app.get('/poisk/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'avotarfoto', filename);
    res.sendFile(filePath);
});