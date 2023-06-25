import connection from '../configs/connectDB'
const getAllUser = async (req, res) => {
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    return res.status(200).json({
        "message": "ok",
        "data": rows
    });
}

const createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    if (!firstName || !lastName || !email || !address) {
        return res.status(300).json({
            "message": "missing params required"
        })
    }
    await connection.execute(`insert into users(firstName, lastName, email, address) values('${firstName}', '${lastName}', '${email}', '${address}')`)
    return res.status(200).json({
        "message": "create new user successfully"
    })
}
const updateUser = async (req, res) => {
    let id = req.params.id;
    let { firstName, lastName, email, address } = req.body;
    if (!id || !firstName || !lastName || !email || !address) {
        return res.status(300).json({
            "message": "missing params required"
        })
    }
    await connection.execute(`update users set firstName = '${firstName}', lastName='${lastName}', email ='${email}' , address='${address}' where Id = ${id}`)
    return res.status(200).json({
        "message": "updated user successfully"
    })
}
const deleteUser = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(300).json({
            "message": "missing params required"
        })
    }
    await connection.execute(`delete from users where Id=${id}`)
    return res.status(200).json({
        "message": "deleted user successfully!"
    })
}
const getOneUser = async (req, res) => {
    let id = req.params.id;
    if (!id) {
        return res.status(300).json({
            "message": "missing params required"
        })
    }
    const [user] = await connection.execute(`select * from users where Id=${id}`)
    return res.status(200).json({
        "message": "ok",
        "data": user
    })
}
module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
    getOneUser
}