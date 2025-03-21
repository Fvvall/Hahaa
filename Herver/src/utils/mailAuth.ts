import * as nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env["nodemailer_host"],
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env["nodemailer_auth_user"],
    pass: process.env["nodemailer_auth_pass"],
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(token: string, user: string, userMail: string) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Maddison Foo Koch 👻" <${ process.env["nodemailer_auth_user"] }>`, // sender address
    to: userMail, // list of receivers
    subject: `Hello ${ user }`, // Subject line
    text: "This is your auth pass", // plain text body
    html: `This is your auth pass \n
    <b>pass: ${ token }</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

export async function mASendMail(user: string, userMail: string, store: any) {
  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  store.set(token, user);
  sendMail(token, user, userMail);
}

export async function mAAuthUser(user: string, token: string, store: any) {
  if (store.get(token) === user) {
    store.delete(token);
    return true;
  } else {
    return false;
  }
}