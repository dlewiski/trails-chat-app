import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    margin: '15px',
  },
  messageDisplayRoot: {
    padding: '20px 0',
    border: '2px solid black',
    borderRadius: '25px',
    marginBottom: '30px',
  },
  messageDisplayContent: {
    padding: '0 30px',
    maxHeight: '500px',
    maxWidth: '350px',
    minWidth: '250px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
  },
}));

export default useStyles;
