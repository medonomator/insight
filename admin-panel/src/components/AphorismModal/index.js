import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Input, Button, TextareaAutosize } from '@material-ui/core';
import styles from './ModalForm.module.sass';
import { withRouter } from 'react-router-dom';

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

const ModalForm = ({ requestHandler, textButton, history }) => {
  const classes = useStyles();
  const [author, setAuthor] = React.useState('');
  const [body, setBody] = React.useState('');
  const [tags, setTags] = React.useState('');

  const getDataFromThisForm = async () => {
    const res = await requestHandler({ author, body, tags });
    if (res) {
      setAuthor('');
      setBody('');
      setTags('');
    }
  };

  const handlerOnClose = () => {
    history.goBack();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        onClose={handlerOnClose}
        BackdropProps={{
          timeout: 100,
        }}
        open
      >
        <Fade in>
          <div className={classes.paper}>
            <Input
              onChange={e => setAuthor(e.target.value)}
              value={author}
              className={styles.inputs}
              placeholder="author"
            />
            <TextareaAutosize
              rows={10}
              onChange={e => setBody(e.target.value)}
              value={body}
              className={styles.inputs}
              placeholder="body"
            />
            <Input
              onChange={e => setTags(e.target.value)}
              value={tags}
              className={styles.inputs}
              placeholder="tags"
            />
            <Button onClick={getDataFromThisForm} variant="contained" color="primary">
              {textButton}
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default withRouter(ModalForm);
