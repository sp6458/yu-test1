import React, { useState, useEffect } from 'react'

import axios from 'axios';
import history from '../utils/history';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const Users = () => {
  const [state, setState] = useState({ users: [],
                                       open: false,
                                       uid: null
                                     })

  useEffect(() => {
    axios.get('api/get/allusers')
      .then(res => setState({users: res.data}))
      .catch(err => console.log(err))
  }, [])


  const handleClickOpen = (user_id) => {
      setState({ open: true, uid: user_id });
    };

  const handleClose = () => {
      setState({ open: false });
    };

  const handleDeleteUser = () => {
      const user_id = state.uid
      axios.delete('api/delete/usercomments', { data: { uid: user_id }})
        .then(() => axios.get('api/get/user_postids', { params: { uid: user_id }})
          .then(res => res.data.map(post => axios.delete('/api/delete/userpostcomments', { data: { post_id: post.pid }})) )
        )
        .then(() => axios.delete('api/delete/userposts', { data: { uid: user_id }})
          .then(() => axios.delete('api/delete/user', { data: { uid: user_id }} )
      ))
        .catch(err => console.log(err) )
        .then(setTimeout(history.replace('/'), 700))
    }

  const RenderUsers = (user) => (
    <TableRow>
      <TableCell>
      <br/>
      <p> { user.user.username } </p>
      <p> { user.user.email } </p>
      <br />
      <button onClick={() => handleClickOpen(user.user.uid)}>
        Delete User
      </button>
      </TableCell>
    </TableRow>
  );


    return (
    <div>
      <h1>Users</h1>
      <div className="FlexRow">
      <Paper>
      <div className="FlexUsersTable">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
             {state.users ?
                state.users.map(user =>
                  <RenderUsers key={ user.uid } user={user} />)
             : null
             }
          </TableBody>
        </Table>
      </div>
    </Paper>
    </div>

    <Dialog
        open={state.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> Delete User </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Deleteing User will delete all posts and comments made by user
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleDeleteUser(); handleClose()} } color="primary">
            Delete
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
     </div>
    )
}

export default (Users);
