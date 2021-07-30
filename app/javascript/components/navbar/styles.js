import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: '16px',
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    fontSize: '26px',
    fontWeight: 700,
    color: '#ffffff',
  },
  accountSection: {
    display: 'flex',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: '20px',
    fontWeight: 500,
  },
}));

export default useStyles;
