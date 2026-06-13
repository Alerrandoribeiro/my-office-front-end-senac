import { toast as toastify } from 'react-toastify';

export const useToast = () => {
  return {
    success: (msg, opts) => toastify.success(msg, opts),
    error: (msg, opts) => toastify.error(msg, opts),
    info: (msg, opts) => toastify.info(msg, opts),
    warning: (msg, opts) => toastify.warn(msg, opts),
  };
};

export default useToast;
