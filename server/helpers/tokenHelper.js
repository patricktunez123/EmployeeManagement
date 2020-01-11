import jwt from 'jsonwebtoken';

export default {
  genToken(info) {
    try {
      const payload = {
        id: info.id,
        employeeName: info.employeeName,
        email: info.email,
        phoneNumber: info.phoneNumber,
      };
      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '365d' });
      return token;
    } catch (err) {
      return err;
    }
  },
};
