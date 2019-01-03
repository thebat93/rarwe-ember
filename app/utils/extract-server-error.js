// Функция возвращает сообщение с ошибкой сервера

import { capitalize } from '@ember/string';

const generalErrorMessage = "Something went wrong, sorry.";

export default function extractServerError(errors) {
  if (!errors) {
    return generalErrorMessage;
  }

  // Пример ответа сервера:
  /*
  errors: [{
    title: "has already been taken",
    detail: "email - has already been taken",
    source: {
      pointer: "/data/attributes/email"
    },
    status: "422"
  }]
  */

  let [ errorObject ] = errors;
  let { title, detail, source } = errorObject;
  if (!source) {
    return generalErrorMessage;
  }

  let { pointer } = source;
  let attributePath = pointer.split('/');
  let errorAttribute = attributePath[attributePath.length - 1];

  return errorAttribute === 'base' ? detail :
  `${capitalize(errorAttribute)} ${title}`;
}