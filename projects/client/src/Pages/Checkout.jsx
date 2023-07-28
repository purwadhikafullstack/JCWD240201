import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProvinceAsync,
  getUserAddressAsync,
} from '../Features/Address/AddressSlice';
import CheckoutAddress from '../Components/Checkout/CheckoutAddress';
import { Navigate } from 'react-router-dom';

export default function Checkout() {
  const dispatch = useDispatch();
  let token = localStorage.getItem('token');
  const { carts, totalCart, totalPrice, activeCart, discount } = useSelector(
    (state) => state?.cart,
  );
  const { address, editAddressData } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(getUserAddressAsync());
    dispatch(getProvinceAsync());
  }, []);

  if (!token) return <Navigate to="/" />;
  if (!carts.length) return <Navigate to="/cart" />;

  return (
    <div className="flex justify-between">
      <div className="w-full p-4">
        <CheckoutAddress />
        <div className="flex flex-col gap-4 mt-4">
          {carts?.map((value) => {
            if (value?.is_check) {
              return (
                <div key={value?.id} className="flex gap-2">
                  <div>
                    <div className="w-[100px] h-[100px] bg-primary"></div>
                  </div>
                  <div>
                    <p>{value?.product?.name}</p>
                    <p>{value?.qty} Item</p>
                    <p>Rp.{value?.product?.price.toLocaleString(['id'])}</p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div
        className={`card card-compact w-full bottom-0 fixed md:sticky md:top-0 md:bottom-[15vh] lg:top-[11em] md:w-[30%] bg-base-100 shadow-xl h-fit  md:right-12  ${
          totalCart === 0 ? 'hidden' : ''
        }`}
      >
        <div className="card-body">
          <div className="promo">promo</div>
          <div className="summary hidden md:block">
            <div className="ringkasan ">
              <p className="md:my-3 text-[1em] md:text-[2em] font-bold leading-7">
                Ringkasan Belanja
              </p>
            </div>
            <div className="details py-3 border-b border-[#D5D7DD]">
              <div className="detailPrice flex justify-between text-[16px]">
                <p>
                  Total Harga <br /> ({activeCart} barang)
                </p>
                <span>Rp{totalPrice.toLocaleString(['id'])}</span>
              </div>
              <div className="detailDiscount flex justify-between text-[16px]">
                <p>Total Diskon Barang</p>
                <span>-Rp{discount.toLocaleString(['id'])}</span>
              </div>
            </div>
          </div>
          <div className="total flex md:block items-center">
            <div className="lastPrice md:flex flex-grow justify-between  my-2 ">
              <p className="md:font-bold text-[0.8em] md:text-[1.5em] lg:text-[2em]">
                Total Harga
              </p>
              <span className="font-bold text-[1em] md:text-[1.5em] lg:text-[2em]">
                Rp{(totalPrice - discount).toLocaleString(['id'])}
              </span>
            </div>
            <div className="orderNow  md:pt-5">
              <button
                className="btn btn-sm md:btn-md  btn-primary w-full text-white"
                onClick={() => {
                  // checkoutAsync();
                }}
              >
                Bayar ({activeCart})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}