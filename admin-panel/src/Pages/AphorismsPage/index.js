import React from 'react';
import api from '../../helpers/api';
import AphorismsTable from '../../components/AphorismsTable';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AphorismsPage = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [aphorisms, setAphorisms] = React.useState({});
  React.useEffect(() => {
    const fetchAuth = async () => {
      const res = await api('/admin/aphorisms?isAdmin=true', 'GET');
      setAphorisms(res.data);
    };
    fetchAuth();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Добавить афоризм
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p>
          </div>
        </Fade>
      </Modal>
      <div>AforismsFilter</div>
      <AphorismsTable aphorisms={aphorisms} />
    </div>
  );
};

export default AphorismsPage;
