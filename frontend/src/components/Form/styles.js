
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: '#FFD7D7',
    borderRadius: 15,
    width: '90%',
  },
  paperAuth: {
    position: 'absolute',
    top: '30%',
    left: '4.5%',
    padding: '5px',
    backgroundColor: '#ffd7d7',
    borderRadius: 15,
    width: '90%',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonSubmit: {
    marginBottom: 10,
    width: '70%',
    borderRadius: 25,
    backgroundColor: '#FD2D01',
  },
  buttonClear: {
    width: '70%',
    borderRadius: 25,
  },
}));
