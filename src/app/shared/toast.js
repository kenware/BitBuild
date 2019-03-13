import { toast } from 'angular2-materialize';

const notify = (message, time) => {
  toast(message, time);
};

export default notify;
