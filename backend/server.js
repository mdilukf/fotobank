const express = require('express')
const app = express()
const port = 5000;
const cors = require('cors');
const bcrypt = require('bcryptjs');
const filemulter = require('../backend/middleware/multer')

const { v4: uuidv4 } = require('uuid');

var mysql = require('mysql');
const { upload } = require('@testing-library/user-event/dist/upload');

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors({
    origin: '*',
    credentials: true, // если в запросе используются куки или заголовки аутентификации,
    allowedHeaders: 'Content-Type,Authorization',
}));

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
// app.get('/inputfoto', (req, res) => {
//     console.log(req.query); 
    
//     pool.query(`INSERT INTO img (idu, img, title, widthFoto, description, heightFoto, tagOne, tagTwo, tagThree) VALUES (${req.query.iduser}, '${req.query.file}', '${req.query.title}', '${req.query.widthFoto}', '${req.query.description}', '${req.query.heightFoto}', '${req.query.tagOne}', '${req.query.tagTwo}', '${req.query.tagThree}')`, (err, resSes) => {
//         if (err) {
//             console.log(error);
//             res.status(500).json({ success: false, data: err, message: "Ошибка! Повторите попытку." })
//         }
//         else if (resSes) {
//             console.log(results);
//             res.status(200).json({ success: true, data: resSes, sessionId: sessionId, message: 'Данные загружены' })
//         }
//     })

//                 // res.status(200).json({ success: true, data: results, message: 'Пользователь найден' })
//                 // res.status(200).json({success: true, data:results, message: 'Пользователь найден', results.id, results.name, results.fulname, results.sity, results.print})

// });

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
            // res.status(200).json({ success: true, data: results, message: 'Пользователь найден' })
            // res.status(200).json({success: true, data:results, message: 'Пользователь найден', results.id, results.name, results.fulname, results.sity, results.print})
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

app.post('/upload', filemulter.single('image'), (req, res)=>{
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    res.send({filename: req.file.filename, rath: `/fotousers/${req.file.filename}`});
});
app.get('/uploads/:filename', (req,res)=>{
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'fotousers', filename);
    res.sendFile(filePath);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 