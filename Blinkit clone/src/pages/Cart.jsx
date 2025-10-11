import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Trash } from "lucide-react";
import { deleteCartData } from '../store/slices/SliceWish';
import { toast } from 'react-toastify';

const Cart = () => {
    const dispatch = useDispatch()
    const cartData = useSelector((state) => state.cart);
    
    
    const handleDeleteCart = (id) => {
        dispatch(deleteCartData(id))
        toast.success("Deleted 😔")
    }


    return (
        <Fragment>

        <div className="min-h-screen bg-gray-50 mt-20 px-6 py-10">
        <div className="sm:max-w-6xl  sm:mx-auto  grid lg:grid-cols-3 gap-10">
            {/* Left: Cart Items */}
            <div className="lg:col-span-2 w-full bg-white rounded-2xl shadow p-6">
                <h1 className="text-2xl font-bold mb-6">
                    Shopping Cart{" "}
                    <span className="text-pink-500 text-lg">
                        {cartData.length} items
                    </span>
                </h1>

                <div className="space-y-6">
                    {cartData.map((item) => (
                        <div
                            key={item.id}
                            className="flex sm:flex-row flex-col items-center justify-between  pb-4"
                        >
                            {/* Product Info */}
                            <div className="flex sm:flex-row flex-col items-center gap-4">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="sm:w-20 sm:h-20 object-cover rounded-lg"
                                />
                                <div>
                                    <h2 className="font-semibold text-gray-800">
                                        {item.title}
                                    </h2>
                                    <p>{item.desc}</p>
                                    <p className="text-sm text-gray-500">
                                        Qty: <span className="text-gray-700">1</span>
                                    </p>
                                </div>
                            </div>

                            {/* Price + Delete */}
                            <div className="flex justify-center items-center gap-6">
                                <span className="font-semibold text-gray-800">
                                    ₹{item.price}
                                </span>
                                <button onClick={() => handleDeleteCart(item.id)}  className="text-gray-400 cursor-pointer hover:text-red-500 transition">
                                    <Trash className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Summary */}
            <div className="w-full rounded-2xl shadow p-6">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                {/* Address */}
                <div className="mb-6">
                    <p className="font-semibold text-gray-700">Jessica Taylor</p>
                    <p className="text-sm text-gray-500">
                        Neubaugasse 30, 1070 Vienna, Austria
                    </p>
                    <button className="text-pink-500 text-sm mt-1">Edit</button>
                </div>

                {/* Payment */}
                <div className="mb-6">
                    <p className="font-semibold text-gray-700">Payment Method</p>
                    <p className="text-sm text-gray-500 flex items-center justify-between">
                        Credit Card <span>•••• 5057</span>
                    </p>
                    <button className="text-pink-500 text-sm mt-1">Edit</button>
                </div>

                {/* Discount Code */}
                <div className="mb-6">
                    <p className="font-semibold text-gray-700 mb-1">
                        Do you have a discount code?
                    </p>
                    <div className="flex sm:flex-row flex-col gap-2">
                        <input
                            type="text"
                            placeholder="Your code here"
                            className="flex-1 border rounded-lg px-3 py-2 text-sm"
                        />
                        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
                            Apply
                        </button>
                    </div>
                </div>

                {/* Totals */}
                <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal ({cartData.length} items)</span>
                        <span className="font-medium">₹94,35</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span className="text-green-500 font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Discount</span>
                        <span>-</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2">
                        <span>Total (incl. VAT)</span>
                        <span>₹94,35</span>
                    </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full mt-6 font-semibold py-3" style={{ border: "1px solid gray" }}>
                    Checkout
                </button>
            </div>
        </div>
    </div>

        </Fragment>
    )
}

export default Cart