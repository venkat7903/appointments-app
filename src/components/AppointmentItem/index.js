import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStarBtn} = props
  const {title, date, isStarred, id} = appointmentDetails
  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  const imgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarBtn = () => {
    toggleStarBtn(id)
  }
  return (
    <li className="appointment-item">
      <div className="title-star-container">
        <p className="appointment-title">{title}</p>
        <button
          className="star-btn"
          type="button"
          onClick={onClickStarBtn}
          data-testid="star"
        >
          <img src={imgUrl} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date">Date: {formattedDate}</p>
    </li>
  )
}

export default AppointmentItem
