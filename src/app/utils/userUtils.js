import crypto from 'crypto';
import userRepository from '../repositories/userRepository.js';

class userUtils {

    /**
     * 
     * @param nome 
     * mascara para deixar as primeiras letras maisculas
     * @returns 
     */
    async formatarNome(nome)
    {
        const arrNome = nome.split(' ');
        for (let i = 0; i < arrNome.length; i++) {
            arrNome[i] = arrNome[i].charAt(0).toUpperCase() + arrNome[i].slice(1);
        }

        return arrNome.join(' ');
    }

    /**
     * 
     * @param telefone 
     * mascara para telefone
     * @returns 
     */
    async formatarTelefone(telefone)
    {
        const telefoneLimpo = telefone.replace(/\D/g, '');

        const regex = /^(\d{2})(\d{5})(\d{4})$/;
        return telefoneLimpo.replace(regex, '($1) $2-$3');
    }

     /**
     * 
     * @param email 
     * valida se um email é valido
     * @returns 
     */
     emailValido(email)
     {
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         return emailRegex.test(email);
     }


      /**
     * 
     * @array dados 
     * monta um array de inserção de dados
     * @returns 
     */
    async setUser(dados)
    {
        const nome     = (dados.nome)      ? await this.formatarNome(dados.nome)         : '';
        const telefone = (dados.telefone)  ? await this.formatarTelefone(dados.telefone) : '';
        const password = (dados.password)  ? crypto.createHash('sha256').update(dados.password).digest('hex') : '';
 
        const arrDados = {nome: nome, email: dados.email, password: password, telefone: telefone};

        return arrDados;
    }

      /**
     * 
     * @array dados 
     * monta um array de inserção de dados
     * @returns 
     */
      async verifyEmail(email)
      {
        const arrDados = await userRepository.verifyEmail(email);

        return (!arrDados[0]) ? false : true;
      }

      
      /**
     * 
     * @array dados 
     * monta um array de inserção de dados
     * @returns 
     */
      async verifyTelefone(telefone)
      {
        const arrDados = await userRepository.verifyTelefone(await this.formatarTelefone(telefone));

        return (!arrDados[0]) ? false : true;
      }
}

export default new userUtils();