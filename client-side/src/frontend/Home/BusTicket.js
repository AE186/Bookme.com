import "./Home.css";

export default function BusTicket({ info, setTicket, setShow }) {
  function handleBook() {
    setShow(true);
    setTicket((prevState) => ({
      ...prevState,
      ...info,
    }));
  }

  return (
    <div className="bus-ticket">
      <div className="bus-ticket-img bus-component">
        <img
          src="https://bookmepk.s3.eu-central-1.amazonaws.com/static/custom/upload/transport/daewoo-express.jpg"
          alt=""
        />
      </div>

      <div className="bus-ticket-info bus-component">
        <div className="bus-ticket-destinations">
          {info.pickup} To {info.arrival}
        </div>

        <div className="bus-ticket-time">
          {info.pickup_time} - {info.arrival_time}
        </div>
      </div>

      <div className="bus-ticket-last bus-component">
        <div className="bus-ticket-price">RS {info.price}</div>

        <button
          className="bus-ticket-book"
          onClick={handleBook}
        >
          bookme
        </button>
      </div>
    </div>
  );
}
