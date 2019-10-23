import React from 'react';
import api from '../../helpers/api';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Input, Button, TextareaAutosize } from '@material-ui/core';
// import styles from './AphorismsPage.module.sass';

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
    display: 'flex',
    flexDirection: 'column',
    width: '450px',
  },
}));

const ModalForm = ({ isOpen, inverterModalForm, getDataFromModalForm }) => {
  const classes = useStyles();
  const [author, setAuthor] = React.useState('');
  const [body, setBody] = React.useState('');
  const [tags, setTags] = React.useState('');

  React.useEffect(() => {
    const fetchAuth = async () => {
      const res = await api('/admin/aphorisms?random=false', 'GET');
      // setAphorisms(res.data);
    };
    fetchAuth();
  }, []);

  const getDataFromThisForm = () => {
    const res = getDataFromModalForm({ author, body, tags });

    console.log('=============================');
    console.log('logging', res);
    console.log('=============================');
    if (res) {
      setAuthor('');
      setBody('');
      setTags('');
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={inverterModalForm}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <Input
              onChange={e => setAuthor(e.target.value)}
              value={author}
              // className={styles.inputs}
              placeholder="author"
            />
            <TextareaAutosize
              rows={6}
              onChange={e => setBody(e.target.value)}
              value={body}
              // className={styles.inputs}
              placeholder="body"
            />
            <Input onChange={e => setTags(e.target.value)} value={tags} placeholder="tags" />
            <Button onClick={getDataFromThisForm} variant="contained" color="primary">
              Добавить афоризм
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalForm;
