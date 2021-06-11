import Dialog from '@material-ui/core/Dialog';
import { LoginForm } from '../Login';
import { SignupForm } from '../SignUp';

interface ModalProps {
  isOpen: boolean,
  onClose: () => void,
  showLogin: boolean,
  showSignup: boolean,
}

export const ModalDialog: React.FC<ModalProps> = ({ isOpen, onClose, showLogin, showSignup }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      {/* {showLogin ? <Login setModal={onClose} /> : null} */}
      {showLogin ? <LoginForm setModal={onClose} /> : null}
      {/* {showSignup ? <Signup setModal={onClose} /> : null} */}
      {showSignup ? <SignupForm setModal={onClose} /> : null}
    </Dialog>
  );
};
