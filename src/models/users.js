const pool = require('../config/database.js');

const getAllUsersFromDB = async () => {
    try {
        const [datos] = await pool.query(`SELECT user.*, role.*
        FROM user
        JOIN user_has_role ON user.user_id = user_has_role.user_user_id
        JOIN role ON user_has_role.role_role_id = role.role_id;`);
        return datos
    } catch (error) {

    }
}
const getUserByEmailFromDB = async(email)=>{
    try {
        const [datos] = await pool.query(`SELECT * FROM user WHERE email = ?`,[email]);
        const [user] = datos
        return user;
    } catch (error) {
        
    }
}
const addUserFromDB = async(userData, email)=>{
    try {
        const [datos] = await pool.query(`INSERT INTO user SET ?`,[userData]);
        const {user_id} = await getUserByEmailFromDB(email);
        await pool.query(`INSERT INTO user_has_role (user_user_id, role_role_id) VALUES (?, ?)`,[user_id,2]);
        return datos
    } catch (error) {
        
    }
}

module.exports = {
    getAllUsersFromDB,
    addUserFromDB,
    getUserByEmailFromDB
}