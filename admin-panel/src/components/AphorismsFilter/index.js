import React from 'react';
import { Input } from '@material-ui/core';
import styles from './AphorismsFilter.module.sass';

const AphorismsFilter = ({ handlerInput }) => {
  const [author, setAuthor] = React.useState('');
  const [body, setBody] = React.useState('');
  const [currentChange, setCurrentChange] = React.useState('');

  const proxy = {
    setAuthor,
    setBody,
    author,
    body,
  };

  const sendDataInput = e => {
    setCurrentChange(e.target.placeholder);
    proxy[e.target.name](e.target.value);
  };

  React.useEffect(() => {
    handlerInput({ [currentChange]: proxy[currentChange] });
  });

  return (
    <div className={styles.boxFilter}>
      <h3>Фильтр</h3>
      <Input
        onChange={sendDataInput}
        name="setAuthor"
        value={author}
        className={styles.inputAuthor}
        placeholder="author"
      />
      <Input onChange={sendDataInput} name="setBody" value={body} placeholder="body" />
    </div>
  );
};

export default React.memo(AphorismsFilter, () => true);
