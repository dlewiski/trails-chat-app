import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  messageDisplay: {
    margin: '5px 0',
    whiteSpace: 'nowrap',
    fontSize: '18px',
    color: 'white',
    backgroundColor: 'blue',
    borderRadius: '25px',
    padding: '10px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  reactionDisplayList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'baseline',
    margin: '0 0 10px 10px',
  },
  currentReactionButton: {
    margin: '0 0 15px 10px',
    padding: '2px 0',
    backgroundColor: 'pink',
    textAlign: 'center',
    width: '25px',
    fontSize: '18px',
    fontWeight: 500,
  },
  reactionDisplay: {
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'yellow',
    },
  },
}));

export default useStyles;
