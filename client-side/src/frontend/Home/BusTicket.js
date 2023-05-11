import "./Home.css";

export default function BusTicket({
  info,
  setTicket,
  setShow,
  isticket,
  isupdate,
  setModal,
}) {
  function handleBook() {
    if (!isticket) {
      setShow(true);
      setTicket((prevState) => ({
        ...prevState,
        ...info,
      }));
    } else {
      // console.log(modal.key);
      setModal({
        key: info.key,
        show: true,
      });
    }
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
          {isticket ? "QR Code" : isupdate ? "Update" : "bookme"}
        </button>
      </div>
    </div>
  );
}
