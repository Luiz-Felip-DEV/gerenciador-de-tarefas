import userUtils from "../utils/userUtils.js";

class userRequest {

    async setUser(req, res, next)
    {
        let msg = '';

        if (req.body.email && !userUtils.emailValido(req.body.email))
        {
            msg = 'Email inválido.';
        }

        if (!req.body.telefone)
        {
            msg = 'Parametro telefone é obrigatorio.';
        }
        
        if (!req.body.password)
        {
            msg = 'Parametro password é obrigatorio.';
        }

        if (!req.body.email)
        {
            msg = 'Parametro email é obrigatorio.';
        }

        if (!req.body.nome)
        {
            msg = 'Parametro nome é obrigatorio.';
        }

        if (msg) {
            return res.status(400).json({
              error: true,
              msgUser: msg,
              msgOriginal: msg,
            });
          }
      
          next();
    }

    async setLogin(req, res, next)
    {
        let msg = '';
        
        if (req.body.email && !userUtils.emailValido(req.body.email))
        {
            msg = 'Email inválido.';
        }
        
        if (!req.body.password)
        {
            msg = 'Parametro password é obrigatorio.';
        }

        if (!req.body.email)
        {
            msg = 'Parametro email é obrigatorio.';
        }

        if (msg) {
            return res.status(400).json({
              error: true,
              msgUser: msg,
              msgOriginal: msg,
            });
          }
      
          next();
    }
}

export default new userRequest();