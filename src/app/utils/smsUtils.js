import 'dotenv/config';
import userUtils from './userUtils.js';
import emailController from '../controllers/emailController.js';

class smsUtils {

      /**
     * 
     * @array dados 
     * monta um array de inserção de dados
     * @returns 
     */
      async setSms(dados, cod)
      {
        const telefone  = await userUtils.formatarTelefone(dados.telefone);
        const codigo = cod; 
        const nome   = await userUtils.formatarNome(dados.nome);
   
        const arrDados = {nome: nome, email: null, telefone: telefone, codigo: codigo, type: 'SMS'};
  
        return arrDados;
      }

        /**
     * 
     * @array dados 
     * monta um array de inserção de dados
     * @returns 
     */
        async envioSms(telefone)
        {
            const mensagem = "seu+codigo+de+confirmação+é:+" + await emailController.gerarCodigo();

            const url =
                "https://api.iagentesms.com.br/webservices/http.php?metodo=envio&usuario=" +
                process.env.EMAIL_IA +
                "&senha=" +
                process.env.PASSWORD_IA +
                "&celular=" +
                telefone +
                "&mensagem=" +
                mensagem;

            try {
                const response = await fetch(url);
                console.log(response);
                const text = await response.text();

                if (text.ok && text.ok === "OK") {
                    return false;
                }

                return true;
            } catch (e) {

            }

        //     const url =
        //         "https://api.iagentesms.com.br/webservices/http.php?metodo=envio&usuario=" +
        //         process.env.EMAIL_IA +
        //         "&senha=" +
        //         process.env.PASSWORD_IA +
        //         "&celular=" +
        //         telefone +
        //         "&mensagem=" +
        //         mensagem;
    
        // await fetch(url)
        //   .then((response) => response.text())
        //   .then((text) => {
        //     if (text !== "OK") {
        //       return false;
        //     }

        //    return true;
        //   });
    }


    async testePdf(req,res)
    {
        const fs = require('fs');
        const PDFDocument = require('pdfkit');

        // Crie um novo documento PDF
        const doc = new PDFDocument();

        // Pipe its output somewhere, like to a file or HTTP response
        doc.pipe(fs.createWriteStream('example.pdf'));

        // Adicione um texto ao documento
        doc.fontSize(25).text('Hello, PDF!', 100, 100);

        // Adicione um retângulo ao documento
        doc.rect(100, 150, 400, 200).stroke();

        // Finalize o documento
        // doc.end();

        console.log(doc.end());
    }
}

export default new smsUtils();

