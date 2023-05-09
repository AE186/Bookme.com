import "./Home.css";

export default function BusTicket({ ticket }) {
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
          {ticket.pickup} To {ticket.arrival}
        </div>
        <div className="bus-ticket-time">
          {ticket.pickup_time} - {ticket.arrival_time}
        </div>
      </div>
      <div className="bus-ticket-last bus-component">
        <div className="bus-ticket-price">RS {ticket.price}</div>
        <button className="bus-ticket-book">bookme</button>
      </div>
    </div>
  );
}
