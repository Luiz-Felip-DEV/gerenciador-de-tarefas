import emailUtils from "../utils/emailUtils.js";
import 'dotenv/config';

class emailController {

    /**
     * 
     * @param email
     * @param name 
     * action para o envio do email com codigo de reset de senha
     * @returns 
     */
    async resetPassword(email, name)
    {
        const transporter  = await emailUtils.emailConnection();
        const codigo       = await this.gerarCodigo();

        const htmlBody = await emailUtils.htmlResetSenha(name, codigo);

        try {
                
            transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "Verificação de Email",
                html: htmlBody,
                text: `Obrigado por enviar o formulario de ajuda, SR(A) <strong>${name}</strong>, Daqui alguns instantes você receberá um retorno!`
            });  
            
        } catch(error) {
            return false;
        }

        return codigo;
    }

    /**
     * 
     * @param name
     * @param email 
     * action para o envio do email com confirmação de reset de senha
     * @returns 
     */
    async confirmEmail(name, email)
    {
        const transporter  = await emailUtils.emailConnection();

        const htmlBody = await emailUtils.htmlConfirmEmail(name);

        try {
                
            transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "Alteração de Senha",
                html: htmlBody,
                text: `Obrigado por enviar o formulario de ajuda, SR(A) <strong>${name}</strong>, Daqui alguns instantes você receberá um retorno!`
            });  
            
        } catch(error) {
            return false;
        }

        return true;
    }

    /**
     * 
     * @param name
     * @param email 
     * action para o envio do email com confirmação de cadastro
     * @returns 
     */
    async confirmCadaster(name, email)
    {
        const transporter  = await emailUtils.emailConnection();

        const htmlBody = await emailUtils.htmlConfirmCadaster(name);

        try {
                
            transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: "Confirmação de cadastro",
                html: htmlBody,
                text: `Obrigado por enviar o formulario de ajuda, SR(A) <strong>${name}</strong>, Daqui alguns instantes você receberá um retorno!`
            });  
            
        } catch(error) {
            return false;
        }

        return true;
    }

    async gerarCodigo() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let codigo = '';
        for (let i = 0; i < 6; i++) {
          codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return codigo;
      }
}

export default new emailController();