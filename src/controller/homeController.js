import connection from "../configs/connectDB";
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
module.exports = {
    getHomePage,
    getDetailUser,
    createNewUser
}