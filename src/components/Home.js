import React from "react";
import "./Style.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Cardsdata from "./Cardsdata";
import { addToCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import toast  from 'react-hot-toast';

const Home = () => {
  // const [cardData, setCardData] = useState(Cardsdata);
  const cardData = Cardsdata
  const dispatch = useDispatch();

  //add to cart
  const send = (e) => {
    dispatch(addToCart(e))
    toast.success("Item added to your cart")
  }
  return (
    <section className="iteam_selection mt-4 container">
      <h2 className="px-4" style={{ fontWeight: 400 }}>
        Restaurant is now open in Kanpur
      </h2>
      <div className="row mt-2 d-flex justify-content-around align-items-center">
        {cardData.map((element) => {
          return (
            
              <Card key={element.id}
                style={{ width: "22rem", border: "none" }}
                className="hove mb-4"
              >
                <Card.Img varient="top" className="cd" src={element.imgdata} />
                <div className="card_body">
                  <div className="upper_data d-flex justify-content-between align-items-center">
                    <h4 className="mt_2">{element.dish}</h4>
                    <span>{element.rating}&nbsp;★</span>
                  </div>
                  <div className="lower_data d-flex justify-content-between ">
                    <h5 className="mt_2">{element.address}</h5>
                    <span>₹&nbsp;{element.price}</span>
                  </div>
                  <div className="extra"></div>
                  <div className="last_data d-flex justify-content-between align-items-center">
                    <img src={element.arrimg} className="limg" alt="" />
                    <Button
                      style={{
                        width: "150px",
                        background: "#ff3054db",
                        border: "none",
                      }}
                      variant="outline-light"
                      className="mt-2 mb-2"
                      onClick={()=>send(element)}
                    >
                      Add to Cart{" "}
                    </Button>
                    <img src={element.delimg}  className="laimg" alt="" />
                  </div>
                </div>
              </Card>
            
          );
        })}
      </div>
    </section>
  );
};

export default Home;
