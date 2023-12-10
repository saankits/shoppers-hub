import React, {useState, useEffect} from "react";
import "./CartStyle.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeToCart,
  reduceQuantity,
  emptyCart,
} from "../redux/features/cartSlice";
import toast  from 'react-hot-toast';

const Cartdetails = () => {
  const { carts } = useSelector((state) => state.allCart);

  const [totalPrice, setPrice] = useState(0)
  const [totalItems, setItems] = useState(0)

  const dispatch = useDispatch();
  //handle Increment
  const handleIncrement = (e) => {
    dispatch(addToCart(e));
  };

  // remove to cart
  const handleRemove = (e) => {
    dispatch(removeToCart(e));
    toast.success("Item is removed from cart")
  };

  // handle decrement
  const handleDecrement = (e) => {
    dispatch(reduceQuantity(e));
  };

  // clear cart
  const clearCart = (e) => {
    dispatch(emptyCart(e));
    toast.success("Your cart is now Empty")
  };

  // Set total price
  const Total = () => {
    let Price = 0
    let Items = 0
      carts.map((val,ind)=>{
        Price = Price + val.qnty*val.price
        Items = Items + val.qnty
      })
      setPrice(Price)
      setItems(Items)
  }

  // set total items
  

  useEffect(()=>{
    Total()
  },[Total])

  return (
    <>
      <div className="row justify-content-center m-0">
        <div className="col-md-8 mt-5 mb-5 cardsdetails">
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className="card-header-flex">
                <h5 className="text-white m-0">
                  Cart Calculation{carts.length > 0 ? `(${carts.length})` : ""}
                </h5>
                {carts.length > 0 ? (
                  <button
                    className="btn btn-danger mt-0 btn-sm"
                    onClick={() => clearCart()}
                  >
                    <i className="fa-solid fa-trash"></i>{" "}
                    <span> Empty Cart </span>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="card-body p-0">
              {carts.length === 0 ? (
                <table className="table cart-table mb-0">
                  <tbody>
                    <tr>
                      <td color={6}>
                        <div className="cart-empty">
                          <i className="fa fa-shopping-cart"></i>
                          <p>Your Cart is Empty</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table cart-table mb-0 table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th className="text-right">
                        <span id="amount" className="amount">
                          Total Amount
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <button
                              className="prdct-delete"
                              onClick={() => handleRemove(data.id)}
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </td>
                          <td>
                            <div className="product-img">
                              <img src={data.imgdata} alt=""></img>
                            </div>
                          </td>
                          <td>
                            <div className="product-name">
                              <p>{data.dish}</p>
                            </div>
                          </td>
                          <td>₹&nbsp;{data.price}</td>
                          <td>
                            <div className="prdct-qty-container">
                              <button
                                className="prdct-qty-btn"
                                onClick={
                                  data.qnty <= 1
                                    ? () => handleRemove(data.id)
                                    : () => handleDecrement(data)
                                }
                              >
                                <i className="fa fa-minus"></i>
                              </button>
                              <input
                                type="text"
                                className="qty-input-box"
                                value={data.qnty}
                                disabled
                                name=""
                                id=""
                              />
                              <button
                                className="prdct-qty-btn"
                                onClick={() => {
                                  handleIncrement(data);
                                }}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </td>
                          <td className="text-right">
                            ₹&nbsp;{data.price * data.qnty}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={3}>&nbsp;</th>
                      <th>
                        Items in Cart <span className="ml-2 mr-2"> : </span>
                        <span className="text-danger">{totalItems}</span>
                      </th>
                      <th className="text-right">
                        Total Price <span className="ml-2 mr-2"> : </span>
                        <span className="text-danger">{totalPrice}</span>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cartdetails;
