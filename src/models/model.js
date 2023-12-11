const pool = require('../config/database');

const getAllFunkosFromDB = async()=>{
    try {
        const [datos] = await pool.query('SELECT product.*, licence.* FROM product JOIN licence ON product.licence_id = licence.licence_id ORDER BY product_id DESC');
        return datos
    } catch (error) {
        console.error('Error querying MySQL:', error);
        throw error;
    }
}
const getFunkoFromDB = async(id)=>{
    try {
        const [datos] = await pool.query('SELECT product.*, licence.* FROM product JOIN licence ON product.licence_id = licence.licence_id WHERE product_id = ?',[id]);
        const [product] = datos;
        return product;
    } catch (error) {
        console.error('Error querying MySQL:', error);
        throw error;
    }
}
const addFunkoFromDB = async(funkoData)=>{
    try {
        const [datos] = await pool.query("INSERT INTO product SET ?",[funkoData]);
        return datos;
    } catch (error) {
        console.error('Error querying MySQL:', error);
        throw error;
    }
}
const updateFunkoFromDB = async(funkoData, id)=>{
    try {
        const [datos] = await pool.query("UPDATE product SET ? WHERE product_id = ?",[funkoData, id]);
        return datos;
    } catch (error) {
        console.error('Error querying MySQL:', error);
        throw error;
    }
}
const deleteFunkoFromDB = async(id)=>{
    try {
        const productEliminated = getFunkoFromDB(id);
        await pool.query('DELETE FROM product WHERE product_id = ?',[id]);
        return productEliminated;
    } catch (error) {
        console.error('Error querying MySQL:', error);
        throw error;
    }
}

module.exports = {
    getAllFunkosFromDB,
    getFunkoFromDB,
    addFunkoFromDB,
    updateFunkoFromDB,
    deleteFunkoFromDB
}