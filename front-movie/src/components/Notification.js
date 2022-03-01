import React from 'react'
import { useSelector } from 'react-redux'

//import { Alert } from '@material-ui/lab'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    <div >
      {notification === null && null}
      {notification !== null && <div>
        <Snackbar open={true}>
          <Alert
            // sx={{ zIndex: 'tooltip', position: 'absolute', bottom: '5ch' }}
            severity={notification ? notification.theme : null}
          >
            {notification ? notification.text : null}
          </Alert>
        </Snackbar>
      </div>}

    </div>
  )

}


export default Notification