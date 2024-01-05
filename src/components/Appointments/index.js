// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: [],
    isStarBtnActive: false,
  }

  toggleStarBtn = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  toggleStarredBtn = () => {
    this.setState(prevState => ({isStarBtnActive: !prevState.isStarBtnActive}))
  }

  getStarredAppointmentsList = () => {
    const {appointmentList} = this.state
    const starredList = appointmentList.filter(each => each.isStarred === true)
    return starredList
  }

  render() {
    const {title, date, appointmentList, isStarBtnActive} = this.state
    const activeBtnClassName = isStarBtnActive ? 'active-btn' : ''
    const finalList = isStarBtnActive
      ? this.getStarredAppointmentsList()
      : appointmentList
    return (
      <div className="appointment-app-container">
        <div className="sub-appointment-app-container">
          <h1 className="app-title">Add Appointment</h1>
          <div className="form-img-container">
            <form className="form-container" onSubmit={this.onAddAppointment}>
              <label htmlFor="nameInput">TITLE</label>
              <input
                type="text"
                id="nameInput"
                placeholder="Title"
                value={title}
                onChange={this.onChangeTitle}
              />
              <br />
              <label htmlFor="dateInput">DATE</label>
              <input
                type="date"
                id="dateInput"
                value={date}
                onChange={this.onChangeDate}
              />
              <br />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              className="appointment-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <div className="bottom-container">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              className={`starred-btn ${activeBtnClassName}`}
              onClick={this.toggleStarredBtn}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {finalList.map(each => (
              <AppointmentItem
                appointmentDetails={each}
                key={each.id}
                toggleStarBtn={this.toggleStarBtn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
