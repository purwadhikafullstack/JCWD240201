import React, { useState, useEffect } from 'react';

import Logo from '../../utils/images/logoHealthyMed.svg';

import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import {
  deleteCartAsync,
  updateCartAsync,
} from '../../Features/Cart/CartSlice';
import { toast } from 'react-hot-toast';
import useDebounce from '../../Hooks/useDebounce';
import DeleteModal from '../DeleteModal/DeleteModal';

const CartCard = (props) => {
  const dispatch = useDispatch();
  const [isCheckCart, setIsCheckCart] = useState(props.cart.is_check);
  const stock = props.cart.product?.closed_stocks[0]?.total_stock;

  const debouncedQtyValue = useDebounce(props.cart.qty, 500);

  const [openDeleteModal, setOpenDeletemodal] = useState(false);

  const discount = () => {
    let tempDisc = 0;
    props.cart.product.promotions?.map((promo) => {
      if (promo?.discount)
        tempDisc += props.cart.product.price * (promo.discount / 100);
    });
    return tempDisc;
  };
  const [disc, setDisc] = useState(discount());

  useEffect(() => {
    if (props.check) {
      if (!isCheckCart) handleCheck();
    }
  }, [props.check]);

  useEffect(() => {
    dispatch(
      updateCartAsync({
        cartId: props.cart.id,
        qty: debouncedQtyValue,
        isCheck: isCheckCart,
        stock,
      }),
    );
    // };
  }, [debouncedQtyValue, isCheckCart]);

  // useEffect(() => {
  //   console.log('test', props.cart.qty);
  //   return () => {
  //     console.log('test', props.cart.qty);
  //     dispatch(
  //       updateCartAsync({
  //         cartId: props.cart.id,
  //         qty: 100,
  //         isCheck: isCheckCart,
  //         stock,
  //       }),
  //     );
  //   };
  //   // };
  // }, []);

  const handleCheck = () => {
    setIsCheckCart(!isCheckCart);
  };

  return (
    <div className="div border-t border-[#D5D7DD] text-[16px] p-2">
      <DeleteModal
        open={openDeleteModal}
        closeModal={() => setOpenDeletemodal(false)}
        id={props?.data?.id}
        model={'Cart'}
      />
      <div className="product flex justify-between ">
        <div className="check">
          <div className="select flex gap-5 items-center h-full">
            <input
              type="checkbox"
              className="h-3 w-3"
              checked={isCheckCart}
              onClick={handleCheck}
              readOnly
            />
          </div>
        </div>

        <div className="img">
          <img className="h-20 w-20" src={props.cart.img || Logo} alt={Logo} />
        </div>
        <div className="cartDetail lg:flex flex-grow pl-3">
          <div className="detail flex-grow pb-2">
            <p>{props?.cart?.product?.name}</p>
            <p>
              {props.cart.qty}{' '}
              {props?.cart?.product?.packaging_type?.type_name || 'buah'}
            </p>
          </div>
          <div className="summary flex gap-2 leading-6 h-fit items-center">
            <p
              className={`text-[#737A8D] text-[14px] line-through ${
                disc === 0 ? 'hidden' : ''
              }`}
            >
              Rp {props.cart.product.price.toLocaleString(['id'])}
            </p>
            <p className={``}>
              Rp {(props.cart.product.price - disc).toLocaleString(['id'])}
            </p>
          </div>
        </div>
      </div>
      <div className="action flex justify-end text-[#009B90] gap-3 items-center py-1">
        <span>Pindahkan Ke Wishlist</span>|
        <div className="delete flex items-center">
          <RiDeleteBin6Line
            size={'18px'}
            color="#009B90"
            onClick={() => {
              setOpenDeletemodal(true);
              // dispatch(deleteCartAsync({ id: props.cart.id }));
            }}
          />
        </div>
        <div className="join join-horizontal">
          <button
            className=" join-item bg-[#daf8ff] btn btn-sm text-[#009B90]"
            onClick={(e) => props.setQty(e, '-', props.idx)}
          >
            -
          </button>
          <input
            className="join-item bg-[#daf8ff]  min-w-[50px] w-[10px] text-[#009B90] text-center"
            type="number"
            onChange={(e) => {
              props.setQty(e, null, props.idx);
            }}
            value={props.cart.qty}
          />
          <button
            className=" join-item bg-[#daf8ff] btn btn-sm text-[#009B90]"
            onClick={(e) => props.setQty(e, '+', props.idx)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
