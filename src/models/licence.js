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


const getLicenceById = async(id) => {
    try{
        const [datos] = await pool.query('SELECT * FROM licence WHERE licence_id = ?',[id]);
        const [product] = datos;
        return product;
    } catch (error){
        console.error('Error querying MySQL:', error);
        throw error;
    }
}


module.exports = {
    getAllLicencesFromDB,
    getLicenceById
}