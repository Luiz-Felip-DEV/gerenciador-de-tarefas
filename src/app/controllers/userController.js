import userUtils from "../utils/userUtils.js";
import userRepository from "../repositories/userRepository.js";
import crypto from 'crypto';
import jwtUtils from "../utils/jwtUtils.js";
import emailController from "./emailController.js";
import emailRepository from "../repositories/emailRepository.js";
import emailUtils from "../utils/emailUtils.js";

class userController {

    async setUser(req, res)
    {
        if (await userUtils.verifyEmail(req.body.email)) {

            return res.status(500).json({
                error: true,
                msgUser: "Email já está cadastrado na base de dados, Por Favor, Coloque outro.",
                msgOriginal: "Email já está cadastrado na base de dados.",
                });
        }

        if (await userUtils.verifyTelefone(req.body.telefone)) {

            return res.status(500).json({
                error: true,
                msgUser: "Telefone já está cadastrado na base de dados, Por Favor, Coloque outro.",
                msgOriginal: "Telefone já está cadastrado na base de dados.",
                });
        }

        const arrDados = await userUtils.setUser(req.body);
        let arrInsert  = [];
        let verify     = false;

        try {
            arrInsert = await userRepository.setUser(arrDados);
            verify    = (arrInsert.affectedRows != 1) ? true : false;
        }catch (e) {
            return res.status(500).json({
                error: true,
                msgUser: "Erro ao cadastrar usuario, Por Favor, Tente novamente mais tarde.",
                msgOriginal: "Erro ao inserir usuario. Error: " + e.message,
              });
        }

        if (verify) {
            return res.status(500).json({
                error: true,
                msgUser: "Erro ao cadastrar usuario, Por Favor, Tente novamente mais tarde.",
                msgOriginal: "Erro ao cadastrar usuario, arrInsert vazio"
              });
        }

        return res.status(200).json({
            error: false,
            msgUser: "Usuario cadastrado com sucesso.",
            msgOriginal: null,
          });
    }  

    async setLogin(req, res)
    {
        const email    = req.body.email;
        const password = crypto.createHash('sha256').update(req.body.password).digest('hex'); 

        let arrDados   = [];
        let verify     = false;

        try {
            arrDados = await userRepository.setLogin(email, password);
            verify   = (!arrDados[0]) ? true : false;
        } catch (e) {
            return res.status(500).json({
                error: true,
                msgUser: "Erro ao tentar logar, Por Favor, Tente novamente mais tarde.",
                msgOriginal: "Erro ao tentar logar. Error: " + e.message,
              });
        }

        if (verify) {
            return res.status(400).json({
              error: true,
              msgUser: "O acesso foi negado devido a informações incorretas. Verifique suas credenciais e faça login novamente.",
              msgOriginal: "Dados incorretos fornecido pelo usuario.",
            });
          }

          const jwt = jwtUtils.createToken(arrDados[0].id, arrDados[0].nome, arrDados[0].email, arrDados[0].telefone);

          delete arrDados[0].id;

          return res.status(200).json({
            error: false,
            msgUser: null,
            msgOriginal: null,
            jwt: jwt,
            results: arrDados,
          });
    }

    async setCod(req, res)
    {
        const email = req.query.email; 

        if (!req.query.codigo) {
            const nome  = await userUtils.formatarNome(req.query.nome);
            let codigo  = '';

            try {
                codigo = await emailController.resetPassword(email, nome);
            } catch (e) {
                return res.status(500).json({
                    error: true,
                    msgUser: "Erro ao tentar enviar o email, Por Favor, Tente novamente mais tarde.",
                    msgOriginal: "Erro ao tentar enviar o email. Error: " + e.message,
                  });
            }

            if (await emailUtils.verifyEmail(email)) {
                
                try {
                    await emailRepository.putCod(email, codigo);
                } catch (e) {
                    return res.status(500).json({
                        error: true,
                        msgUser: "Erro ao tentar enviar o email, Por Favor, Tente novamente mais tarde.",
                        msgOriginal: "Erro ao tentar enviar o email. Error: " + e.message,
                      });
                }
            } else {
                const arrSetEmail = await emailUtils.setEmail(req.query, codigo);

                let arrEmail = [];
    
                try {
                    arrEmail = await emailRepository.setEmail(arrSetEmail);
                } catch (e) {
                    return res.status(500).json({
                        error: true,
                        msgUser: "Erro ao tentar enviar o email, Por Favor, Tente novamente mais tarde.",
                        msgOriginal: "Erro ao tentar enviar o email. Error: " + e.message,
                      });
                }
            }

            return res.status(200).json({
                error: false,
                msgUser: 'Codigo de confirmação enviado com sucesso',
                msgOriginal: null,
              });

        } else {
            const codigoUser = req.query.codigo;
            let   codigoVer  = '';
            let   nome       = '';

            try {
                const arrCodigo = await emailRepository.getCod(email);
                codigoVer       = arrCodigo[0].codigo;
                nome            = await userUtils.formatarNome(arrCodigo[0].nome);
            } catch (e) {
                return res.status(500).json({
                    error: true,
                    msgUser: "Erro ao tentar validar o codigo, Por Favor, Tente novamente mais tarde.",
                    msgOriginal: "Erro ao tentar validar o codigo. Error: " + e.message,
                  });
            }

            if (codigoUser !== codigoVer) {
                return res.status(500).json({
                    error: true,
                    msgUser: "Desculpe, o código de verificação que você inseriu parece ser inválido. Por favor, verifique o código e tente novamente. Se precisar de ajuda, entre em contato conosco. Obrigado.",
                    msgOriginal: null,
                  });
            }

            await emailController.confirmCadaster(nome, email);

            return res.status(200).json({
                error: false,
                msgUser: "Parabéns! O código de verificação foi aceito com sucesso.",
                msgOriginal: null,
              });
        }
    }
}

export default new userController();