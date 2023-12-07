const pool = require('../config/database.js');

const getAllLicencesFromDB = async()=>{
    try {
        const [datos] = await pool.query('SELECT * FROM licence');
        return datos
    } catch (error) {
        console.error('Error querying MySQL:', error);
        throw error;
    }
}

module.exports = {
    getAllLicencesFromDB
}