import { body } from 'express-validator';

export const registrationValidator = [
   body('email', 'Укажите e-mail')
      .isEmail()
      .withMessage('Неверный e-mail')
      .isLength({
         min: 5,
         max: 30
      })
      .withMessage('Данное поле должно содержать от 5 до 30 символов'),

   body('password', 'Укажите пароль')
      .isLength({
         min: 5,
         max: 30
      })
      .withMessage('Данное поле должно содержать от 5 до 30 символов'),
]