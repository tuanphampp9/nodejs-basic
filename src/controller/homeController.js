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
module.exports = {
    getHomePage,
    getDetailUser
}