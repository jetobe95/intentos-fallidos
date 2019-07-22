import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkReact, Redirect } from 'react-router-dom'
import Auth from '../services/auth'
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
async function Login({ email, password }) {
  const auth = new Auth()
  const response = await auth.login({ email, password })
  return response;
}

export default function SignIn(props) {
  const [response, setResponse] = useState({})
  const classes = useStyles();
  async function onSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.target)
    const email = form.get('email')
    const password = form.get('password')

    const response = await Login({ email, password });
    if(response){
      setResponse(response)
    }

  }
  if (response.success) {
    return <Redirect to="/home" />
  }
  return (
    <Slide in direction="up">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
        </Typography>
          <Box>
            {response.success ? null : (response.message)}
          </Box>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              type="email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contaseña"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Iniciar sesión
          </Button>
            <Grid container>
              <Grid item>
                <LinkReact to="/register">
                  {"No tienes una cuenta? Registrate"}
                </LinkReact>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>

        </Box>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={response.lock}
          onClose={() => setResponse({ ...response, lock: false })}

          autoHideDuration={3000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{response.message}</span>}
        />
      </Container>
    </Slide>
  );
}