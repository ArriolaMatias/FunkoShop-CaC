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

const getFunkosBy = async (filtros) => {
    let query = 'SELECT * FROM product ';
    let whereClause = '';
    let values = [];

    if (filtros.nombre){
        whereClause += 'product.product_name LIKE ? AND ';
        values.push(`%${filtros.nombre}%`);
    }

    if (filtros.precioMin && filtros.precioMax){
        whereClause += 'product.price BETWEEN ? AND ? AND ';
        values.push(`${filtros.precioMin}`);
        values.push(`${filtros.precioMax}`);
    } else if (filtros.precioMin) {
        whereClause += 'product.price >= ? AND ';
        values.push(`${filtros.precioMin}`);
    } else if (filtros.precioMax) {
        whereClause += 'product.price <= ? AND ';
        values.push(`${filtros.precioMax}`);
    }

    if (filtros.nuevos){
        whereClause += 'create_time > DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND ';
    }

    if (filtros.ultimos){
        whereClause += 'stock <= 5 AND '
    }
    
    // CONSTRUCCION DE LA QUERY 

    if (whereClause != ''){
        whereClause = 'WHERE ' + whereClause.slice(0, -5);
        query += '' + whereClause;
    }

    if (filtros.orden){
        const orden = filtros.orden === 'DESC'? 'DESC' : 'ASC';
        query += ` ORDER BY price ${orden}`
    }


    try {
        console.log(query, values);
        const [rows] = await pool.query(query, values);
        return rows;
        
    }catch (error){
        console.error('Error al obtener los productos de la base');
        console.error('Error querying MySQL:', error);
        throw error;
    }   
}

module.exports = {
    getAllFunkosFromDB,
    getFunkosBy,
    getFunkoFromDB,
    addFunkoFromDB,
    updateFunkoFromDB,
    deleteFunkoFromDB
}