import conexao from "../dataBase/conexao.js";

class userRepository {

    /**
     * 
     * @param {*} array 
     * query para login
     * @returns 
     */
    async setUser(arrDados)
    {
        const sql = 'INSERT INTO users SET ?';

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
     * @param email 
     * query para login
     * @returns 
     */
    async verifyEmail(email)
    {
        const sql = 'SELECT nome FROM users WHERE email = ?';

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
     * @param email 
     * query para login
     * @returns 
     */
     async verifyTelefone(telefone)
     {
         const sql = 'SELECT nome FROM users WHERE telefone = ?';
 
         return new Promise((resolve, reject) => {
             conexao.query(sql,telefone,(error, result) => {
                 if (error) return reject(false);
 
                 const row = JSON.parse(JSON.stringify(result));
                 return resolve(row);
             });
         });
     }

     
     /**
     * 
     * @param email 
     * query para login
     * @returns 
     */
     async setLogin(email, senha)
     {
         const sql = 'SELECT id, nome, email, telefone FROM users WHERE email = ? AND password = ?';
 
         return new Promise((resolve, reject) => {
             conexao.query(sql,[email, senha],(error, result) => {
                 if (error) return reject(false);
 
                 const row = JSON.parse(JSON.stringify(result));
                 return resolve(row);
             });
         });
     }
}

export default new userRepository();