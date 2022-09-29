import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Paper, Grid, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

import { login, signup } from '../../actions/auth';
import useStyles from './styles';
import Input from './Input';

// eslint-disable-next-line no-unused-vars
const initialState = { pseudo: '',  password: ''};

const SignUp = () => {
  const [form, setForm] = useState({ pseudo: '', password: ''});
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const classes = useStyles();
  const navigate = useNavigate() ;

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const switchMode = async () =>  {
    setIsSignup( ! isSignup );
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form , navigate));
    } else {
      dispatch(login(form , navigate));
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <h2>{ isSignup ? "S'inscrire" : 'Se connecter' }</h2>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="email" label="Addresse Mail" handleChange={handleChange} type="email" />
            </>
            )}
            <Input name="pseudo" label="Pseudo" handleChange={handleChange} />
            <Input name="password" label="Mot de passe" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Confirmez mot de passe" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? "S'inscrire" : 'Se Connecter' }
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button  onClick={switchMode}>
                { isSignup ? "Déjà un compte ? Connectez vous" : "Pas de compte ? Inscrivez-vous" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
