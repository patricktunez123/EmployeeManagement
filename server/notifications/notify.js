import nodemailer from 'nodemailer';

class Notify {
  Notify(employee, message) {
    this.sendNotification(employee, message);
  }

  async sendNotification(employee, message) {
    try {
      this.company = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAILINGUSER,
          pass: process.env.MAILINGPWD,
        },
      });

      this.mailOptions = {
        from: `Awesomity Lab ${process.env.MAILINGUSER}`,
        to: employee.email,
        subject: 'Employement Registration',
        html: `
        Hello <b> ${employee.employeename}</b>! <br>
        ${message}
        <b><h3>Here is your Information</h3></b>
        <p>Name: ${employee.employeename}</p>
        <p>NID: ${employee.nationalid}</p>
        <p>Phone: ${employee.phonenumber}</p>
        <p>Email: ${employee.email}</p>
        <p>DOB: ${employee.dateofbirth}</p>
        <p>Status: ${employee.status}</p>
        <p>Position: ${employee.position}</p>

        <h6>You were registered at ${employee.created_on}</h6>
        `,
      };
      return await this.company.sendMail(this.mailOptions);
    } catch (err) {
      return err;
    }
  }
}

export default new Notify();
