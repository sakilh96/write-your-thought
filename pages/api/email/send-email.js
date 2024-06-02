import UserModel from "lib/models/user.model";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import ReactDOMServer from "react-dom/server"; // Import ReactDOMServer
import EmailTemplate from "pages/common/emailTemplate"; // Adjust the import path as needed
import mongoConnect from "pages/mongoose";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT, // Port number provided by Mailtrap
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

export default async function handler(req, res, next) {
  try {
    if (req.method == "POST") {
        await mongoConnect();
      const email = req.body.email;
      const user = await UserModel.find({ email: email });
    //   console.log('useruser',user);
      if (user.length > 0) {
        const randNum = Math.floor(900000 + Math.random() * 100000).toString();
        const pass = await bcrypt.hash(randNum, 10);
        await UserModel.findByIdAndUpdate({_id:user[0]._id}, {password: pass});
        // console.log('user', user[0].name);
        // Render the EmailTemplate component to HTML
        const emailHtml = ReactDOMServer.renderToString(<EmailTemplate randNum={randNum} name={user[0].name}/>);
        
        const mailOptions = {
          from: process.env.MAIL_FROM_ADDRESS,
          to: email,
          subject: "Your New Password",
          html: emailHtml,
        };

        const info = await transporter.sendMail(mailOptions);
        // console.log('info',info);
        res
          .status(200)
          .json({ message: "Email sent successfully, Please check" });
      } else {
        res.status(404).json({ error: "This email is not registerd with us" });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (e) {
    console.log("e", e);
    res.status(500).json({ error: "Error sending email" });
  }
}
