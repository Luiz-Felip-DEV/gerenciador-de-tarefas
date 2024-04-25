import userUtils from "../utils/userUtils.js";
import userRepository from "../repositories/userRepository.js";
import crypto from 'crypto';
import jwtUtils from "../utils/jwtUtils.js";

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
}

export default new userController();