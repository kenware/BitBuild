import swal from 'sweetalert';

export const formatContent = (messageObject) => {
  let content = '<ul>';
  const messagesArray = Object.entries(messageObject);
  messagesArray.forEach((messages) => {
    if (Array.isArray(messages[1])) {
      messages[1].forEach((message) => {
        content += `<li>${message}</li>`;
      });
    } else {
      content += `<li>${messages[1]}</li>`;
    }
  });
  content += '</ul>';
  // eslint-disable-next-line no-self-assign
  content = (content);
  return content;
};

export const Alert = (title, status, messageObject, timer) => {
  const content = formatContent(messageObject);
  return swal({
    // eslint-disable-next-line prefer-template
    title,
    timer,
    icon: status === 'error' ? 'warning' : status,
    button: 'Cancel',
    content: {
      element: 'span',
      attributes: {
        innerHTML: `${content}`,
      },
    },
  });
};

export const alertWithPromise = text => swal({
  text,
  content: 'input',
  buttons: {
    cancel: {
      text: 'Cancel',
      value: false,
      visible: true,
      className: '',
      closeModal: true,
    },
    confirm: {
      text: 'Proceed',
      value: true,
      visible: true,
      className: '',
      closeModal: true,
    },
  },
})
  .then(value => value);
