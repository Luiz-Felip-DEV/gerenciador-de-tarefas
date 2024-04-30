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
    async verifyEmail(email)
    {
        const sql = 'SELECT * FROM validation_code WHERE email = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,email,(error, result) => {
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
    async putCod(email, codigo)
    {
        const sql = 'UPDATE validation_code SET codigo = ? WHERE email = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,[codigo, email],(error, result) => {
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
    async getCod(email)
    {
        const sql = 'SELECT codigo, nome FROM validation_code WHERE email = ?';

        return new Promise((resolve, reject) => {
            conexao.query(sql,email,(error, result) => {
                if (error) return reject(false);

                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);
            });
        });
    } 
}

export default new emailRepository();