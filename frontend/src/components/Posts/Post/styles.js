import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '62%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    backgroundColor: ' #FFD7D7',
  },
  overlay: {
    position: 'absolute',
    left: '20px',
    color: '#FFD7D7',
  },
  overlay2: {
    position: 'absolute',
    top: '10px',
    right: '0px',
    color: '#FFD7D7',
  },
  grid: {
    display: 'flex',
  },
  title: {
    padding: '0 10px',
    margin: '10px 0',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  message: {
    padding: '10px',
    margin: 0,
  }
});
