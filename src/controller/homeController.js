import connection from "../configs/connectDB";
import multer from "multer";
import path from 'path'
import appRootPath from "app-root-path";
const getHomePage = async (req, res) => {
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    return res.render('index.ejs', { dataUsers: rows });
}
const getDetailUser = async (req, res) => {
    let id = req.params.userId;
    let [user, fields] = await connection.execute(`select * from users where Id = ${id}`);
    console.log(user);
    return res.send(JSON.stringify(user))
}

const createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;

    await connection.execute(`insert into users(firstName, lastName, email, address) values('${firstName}', '${lastName}', '${email}', '${address}')`)
    return res.redirect('/');
}
const deleteUser = async (req, res) => {
    let { userId } = req.body;
    await connection.execute(`delete from users where Id=${userId}`)
    return res.redirect('/');
}
const updateUser = async (req, res) => {
    let id = req.params.id;
    let [user] = await connection.execute(`select * from users where Id=${id}`)
    return res.render('update.ejs', { dataUser: user });
}
const saveUser = async (req, res) => {
    let id = req.params.id;
    let { firstName, lastName, email, address } = req.body;
    await connection.execute(`update users set firstName = '${firstName}', lastName='${lastName}', email ='${email}' , address='${address}' where Id = ${id}`)
    return res.redirect('/');
}
const uploadFile = (req, res) => {
    return res.render('uploadFile.ejs');
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRootPath + '/src/public/image')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const handleFileUpload = (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');
    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        console.log(req.file);
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}

const handleUploadMultipleFiles = (req, res, error) => {
    let upload = multer({ storage: storage, fileFilter: imageFilter }).array('multiple_images', 3);
    if (error) {
        return res.send("Limit unexpected files!");
    }
    upload(req, res, function (err) {
        console.log(req.files[0]);
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload">Upload more images</a>';
        res.send(result);
    });
}
module.exports = {
    getHomePage,
    getDetailUser,
    createNewUser,
    deleteUser,
    updateUser,
    saveUser,
    uploadFile,
    handleFileUpload,
    handleUploadMultipleFiles
}