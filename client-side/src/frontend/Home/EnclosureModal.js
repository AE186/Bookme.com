import "./Home.css";

export default function EnclosureModal({ show, setShow }) {
  var enclosures = [
    {
      key: 100,
      name: "Wasim Akram",
      type: "First-Class",
      price: "600",
      seats: 100,
      left: 49,
    },
    {
      key: 2,
      name: "Imran Khan",
      type: "Premium",
      price: "1000",
      seats: 120,
      left: 60,
    },
    {
      key: 3,
      name: "Hanif Muhammad",
      type: "VIP",
      price: "1700",
      seats: 90,
      left: 47,
    },
  ];

  function handleClose(e) {
    setShow(show ? false : true);
  }

  return (
    <div
      className="enclosure-modal"
      style={{ display: show ? "Block" : "None" }}
      // onClick={handleClose}
    >
      <div className="enclosure-modal-content">
        <div className="enclosure-modal-title">Choose Your Enclosure</div>

        <div className="enclosure-modal-body">
          {enclosures.map((item) => {
            return (
              <div className="enclosure-info">
                <div className="enclosure-info-name">{item.name}</div>
                <div className="enclosure-info-type">Type: {item.type}</div>
                <div className="enclosure-info-seats">
                  Seats left: {item.left}
                </div>
                <div className="enclosure-info-price">
                  Price: Rs {item.price}
                </div>
                <button className="enclosure-info-book">bookme</button>
              </div>
            );
          })}
        </div>

        <div className="enclosure-modal-footer">
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
