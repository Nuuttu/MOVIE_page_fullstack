import React from 'react'
import { useSelector } from 'react-redux'

import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return (
    <div >
      {notification === null && null}
      {notification !== null && <div>

        <Alert severity={notification ? notification.theme : null}>
          {notification ? notification.text : null}
        </Alert>

      </div>}

    </div>
  )

}


export default Notification