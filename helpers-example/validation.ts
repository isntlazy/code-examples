import { AxiosError } from 'axios';

export const isValidEmail = (val: string) => {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val);
};

enum ValidationMessage {
  GENERAL_ERROR = 'GENERAL_ERROR',
  USER_AUTH_ERROR = 'USER_AUTH_ERROR',
  USER_EXISTS_ERROR = 'USER_EXISTS_ERROR',
}

export const validationMessages = {
  GENERAL_ERROR: 'Упсс... Щось пішло не так',
  USER_AUTH_ERROR: 'Неправильний Email або Пароль',
  USER_EXISTS_ERROR: 'Користувач з таким Email уже існує'
}

export const generateErrorMessage = (error: AxiosError) => {
  let errorMessage = validationMessages.GENERAL_ERROR
  const backendMessage: ValidationMessage = error.response ? error.response.data.detail : null
  if (backendMessage) {
    errorMessage = validationMessages[backendMessage]
  }
  return errorMessage
}
