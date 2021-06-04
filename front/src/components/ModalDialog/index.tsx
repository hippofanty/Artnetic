import Dialog from '@material-ui/core/Dialog';
import { ReactNode } from 'react';
import { Login } from '../Login';
import { Signup } from '../SignUp';

interface ModalProps {
  isOpen: boolean,
  onClose: () => void,
  showLogin: boolean,
  showSignup: boolean,
}

export const ModalDialog: React.FC<ModalProps> = ({ isOpen, onClose, showLogin, showSignup }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      {showLogin ? <Login setModal={onClose} /> : null}
      {showSignup ? <Signup setModal={onClose} /> : null}
    </Dialog>
  );
};
