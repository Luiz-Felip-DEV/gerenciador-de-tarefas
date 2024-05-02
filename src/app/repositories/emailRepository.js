import conexao from "../dataBase/conexao.js";

class emailRepository {

    /**
     * 
     * @param {*} array 
     * query para login
     * @returns 
     */
    async setEmail(arrDados)
    {
        const sql = 'INSERT INTO validation_code SET ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,arrDados,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    } 

    /**
     * 
     * @param {*} array 
     * query para login
     * @returns 
     */
    async verifyEmail(email, type)
    {
        const sql = 'SELECT * FROM validation_code WHERE email = ? AND type = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,[email, type],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    } 

    /**
     * 
     * @param {*} array 
     * query para login
     * @returns 
     */
    async putCod(email, codigo, type)
    {
        const sql = 'UPDATE validation_code SET codigo = ? WHERE email = ? AND type = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,[codigo, email, type],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    } 

    /**
     * 
     * @param {*} array 
     * query para login
     * @returns 
     */
    async getCod(email, type)
    {
        const sql = 'SELECT codigo, nome FROM validation_code WHERE email = ? AND type = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,[email, type],(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    } 
}

export default new emailRepository();