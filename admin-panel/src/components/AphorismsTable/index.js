import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Create, DeleteForever } from '@material-ui/icons';

import styles from './AphorismsTable.module.sass';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

const AphorismsTable = ({ aphorisms }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Автор</TableCell>
            <TableCell>Тело</TableCell>
            <TableCell>Теги</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {aphorisms.data &&
            aphorisms.data.map(item => (
              <TableRow key={item._id}>
                <TableCell component="th" scope="row">
                  {item.author}
                </TableCell>
                <TableCell>{item.body}</TableCell>
                <TableCell>
                  {item.tags.map(tag => (
                    <div>{tag.name}</div>
                  ))}
                </TableCell>
                <TableCell>
                  <Create className={styles.icon} htmlColor="green" />
                  <DeleteForever className={styles.icon} htmlColor="red" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AphorismsTable;
