import * as Yup from "yup";
// import {
//   phoneRegExp,
//   emailRegExp,
//   nameRegExp,
// } from "../Common/FormComponents/formRegEx";

export const userValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Це поле має бути більше 2х символів")
    .max(30, "Це поле має бути менше 30х символів")
    // .matches(nameRegExp, t("regExOnlyLetters"))
    .required("Це поле обов'язкове"),
  email: Yup.string()
    .email()
    .max(50, "Це поле має бути менше 50х символів")
    // .matches(emailRegExp, t("emailRegEx"))
    .required("Це поле обов'язкове"),
  password: Yup.string()
    .min(6, "Це поле має бути більше 6х символів")
    .max(20, "Це поле має бути менше 20х символів")
    .required("Це поле обов'язкове"),
});

export const loginUserValidation = Yup.object().shape({
  email: Yup.string()
    .email()
    .max(50, "Це поле має бути менше 50х символів")
    // .matches(emailRegExp, t("emailRegEx"))
    .required("Це поле обов'язкове"),
  password: Yup.string()
    .min(6, "Це поле має бути більше 6х символів")
    .max(20, "Це поле має бути менше 20х символів")
    .required("Це поле обов'язкове"),
});
