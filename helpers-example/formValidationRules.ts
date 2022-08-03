import { isValidEmail } from 'src/helpers/validation';

const REQUIRED_FIELD = 'Обов\'язкове поле';

export const requiredFieldValidation = (val: string) => val && val.length > 0 || REQUIRED_FIELD

export const requiredEmailValidation = [
  requiredFieldValidation,
  (val: string) => isValidEmail(val) || 'Некоректний Email'
]

export const requiredPasswordValidation = [
  requiredFieldValidation,
  (val: string) => val.length >= 8 || 'Мінімум 8 символів',
]

export const requiredFullNameValidation = [
  requiredFieldValidation,
  (val: string) => val.length >= 2 || 'Мінімум 2 символи',
]

export const requiredConfirmCodeValidation = [
  requiredFieldValidation,
  (val: string) => val.length === 5 || 'Отриманий код містить 5 цифр',
]
