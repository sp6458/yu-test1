import React, { Component } from 'react'

import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import history from '../utils/history';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from 'axios';



const localizer = momentLocalizer(moment)

const bus_open_time = new Date('07/17/2018 9:00 am')
const bus_close_time = new Date('07/17/2018 5:00 pm')


let allViews = Object.keys(Views).map(k => Views[k])





class Profile extends Component {
  constructor(props) {
  super(props)
    this.state = {
      events: [],
      format_events: [],
      open: false,
      start_display: null,
      start_slot: null,
      end_slot: null
     }
  }

  componentDidMount() {
    axios.get('api/get/allappointments')
    .then((res) => this.setState({events: res.data}))
    .catch(err => console.log(err))
    .then(() => this.dateStringtoObject())
   }

   handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };


 dateStringtoObject = () => {
    this.state.events.map(appointment => {
      this.setState({
        format_events: [...this.state.format_events,
          { id: appointment.aid,
            title: appointment.title,
            start: new Date(appointment.start_time),
            end: new Date(appointment.end_time)
       }]})
     })
   }


   handleAppointmentConfirm = () => {
     const time_start = this.state.start_slot
     const time_end = this.state.end_slot
     const data = {title: 'booked', start_time: time_start, end_time: time_end }
     axios.post('api/post/appointment', data)
       .then(response => console.log(response))
       .catch(function (error) {
         console.log(error);
       })
       .then(setTimeout( function() { history.replace('/') }, 700))
       .then(alert('Booking Confirmed'))
    }

    showTodos = (props) => (
      <div className="FlexRow">
        <p> { props.appointment.start.toLocaleString() }</p>
      </div>
    )


   BigCalendar = () => (
     <div style={{height: '500px'}} >
       <Calendar
         selectable
         localizer={localizer}
         events={this.state.format_events}
         min={bus_open_time}
         max={bus_close_time}
         views={allViews}
         defaultDate={new Date('07/12/2018')}
         onSelectEvent={event => alert(event.start)}
         onSelectSlot={slotInfo =>
           {
             this.setState({start_slot: slotInfo.start,
                            end_slot: slotInfo.end,
                            start_display: slotInfo.start.toLocaleString()
              });
             this.handleClickOpen();
          }}
       />
     </div>
   )

 render() {
    return (
    <div className="FlexRow">
      <div className="FlexColumn">
        <div className="FlexRow">
         <h1> Admin Dashboard </h1>
        </div>


        <h4>Appointments: </h4>
          <div className="FlexRow">
           <Paper>
            <div className="FlexDashAppointCol">
            { this.state.format_events ?
              this.state.format_events.map(appointment =>
                <this.showTodos key={appointment.id} appointment={appointment} />)
             : null
            }
            </div>
         </Paper>
        </div>
        <br />
        <br />
        <div className="FlexRow">
        { this.state.format_events ?
          <this.BigCalendar />
         : null
        }
        </div>
        <hr />
      </div>

      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"> Confirm Delete? </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Confirm Appointment:  {this.state.start_display}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => this.handleAppointmentConfirm() }>
            Confirm
            </Button>
            <Button color="primary" onClick={() => this.handleClose() }>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    </div>
    )}
}

export default (Profile);
