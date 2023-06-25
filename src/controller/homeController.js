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
module.exports = {
    getHomePage,
    getDetailUser,
    createNewUser,
    deleteUser,
    updateUser,
    saveUser
}