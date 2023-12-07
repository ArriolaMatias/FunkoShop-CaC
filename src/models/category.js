const pool = require('../config/database.js');

const getAllCategoriesFromDB = async()=>{
    try {
        const [datos] = await pool.query('SELECT * FROM category');
        return datos
    } catch (error) {
        console.error('Error querying MySQL:', error);
        throw error;
    }
}

module.exports = {
    getAllCategoriesFromDB
}