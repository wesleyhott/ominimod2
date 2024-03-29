import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = You.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    })

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, nome } = user;

    return res.json({
      user: {
        id,
        nome,
        email,
      },
      // segundo parâmetro é gerado em MD5 online: https://www.md5online.org/
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
