import { success, notFound } from "../../services/response/";
import { sendMail } from "../../services/sendgrid";
import { PasswordReset } from ".";
import { User } from "../user";

export const create = (
  {
    bodymen: {
      body: { email, link }
    }
  },
  res,
  next
) =>
  User.findOne({ email })
    .then(notFound(res))
    .then(user => (user ? PasswordReset.create({ user }) : null))
    .then(reset => {
      if (!reset) return null;
      const { user, token } = reset;
      link = `${link.replace(/\/$/, "")}/${token}`;
      const content = `
        Salut, ${user.username}.<br><br>
        Tu as fait une demande de nouveau mot de passe pour ton compte sur react-blog-api.<br>
        Il te suffit de suivre le lien ci-dessous pour le réinitialiser. Ce lien expirera au bout d'une heure.<br><br>
        <a href="${link}">${link}</a><br><br>
        Si tu n'es pas à l'origine de cette demande, tu peux ignorer ce courriel tranquillement. :)<br><br>
        &mdash; L'équipe react-blog-api
      `;
      return sendMail({
        toEmail: email,
        subject: "Réinitialisation de mot de passe - react-blog-api",
        content
      });
    })
    .then(([response]) =>
      response ? res.status(response.statusCode).end() : null
    )
    .catch(next);

export const show = ({ params: { token } }, res, next) =>
  PasswordReset.findOne({ token })
    .populate("user")
    .then(notFound(res))
    .then(reset => (reset ? reset.view(true) : null))
    .then(success(res))
    .catch(next);

export const update = (
  {
    params: { token },
    bodymen: {
      body: { password }
    }
  },
  res,
  next
) => {
  return PasswordReset.findOne({ token })
    .populate("user")
    .then(notFound(res))
    .then(reset => {
      if (!reset) return null;
      const { user } = reset;
      return user
        .set({ password })
        .save()
        .then(() => PasswordReset.remove({ user }))
        .then(() => user.view(true));
    })
    .then(success(res))
    .catch(next);
};
