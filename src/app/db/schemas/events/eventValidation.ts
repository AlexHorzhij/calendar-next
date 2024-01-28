import * as Yup from 'yup';

export const eventValidation = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Це поле має бути більше 2х символів')
    .max(100, 'Це поле має бути менше 100х символів')
    .required("Це поле обов'язкове"),
});
