import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { deleteCart, getUserCarts, postCart } from '../../API/cartAPI';
// import UrlApi from '../../Supports/Constants/URLAPI';

const initialState = {
  carts: [],
  total: 0,
  totalPrice: 0,
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onGetData: (initialState, action) => {
      initialState.carts = action.payload.data;
      initialState.total = action.payload.total;
      initialState.totalPrice = action.payload.totalPrice;
    },
  },
});

export const getCartUserAsync = () => async (dispatch) => {
  try {
    console.log('cartAsync');
    let token = localStorage.getItem('token');
    if (!token) {
      dispatch(onGetData([]));
      throw { message: 'No User' };
    }

    let { data } = await getUserCarts(token);

    // action.payload.map((value) => {
    //   initialState.total += value.quantity;
    //   initialState.totalPrice +=
    //     value.quantity *
    //     (value.product.price -
    //       (value.product.price * value.type.discount) / 100);
    // });

    let total = 0,
      totalPrice = 0;
    data.data.map((value) => {
      total += value.qty;
      totalPrice += value.qty * value.product.price;
    });

    dispatch(onGetData({ data: data.data, total, totalPrice }));
  } catch (error) {
    console.log(error);
  }
};

export const addToCartAsync = (values) => async (dispatch) => {
  try {
    const { productId, qty } = values;
    const token = localStorage.getItem('token');
    if (!token) throw { message: 'Please Login First' };
    if (!productId) throw { message: "Product doesn't exist" };
    // if(!userId) throw{}

    postCart(token, { productId, qty });

    await dispatch(getCartUserAsync());
    toast.success('Add to cart Success');
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteCartAsync = (values) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    let { data } = await deleteCart(token, values.id);
    if (data.data) {
      await dispatch(getCartUserAsync());
      return toast.success('Product removed from cart');
    }
    return toast.error('Failed to remove product');
  } catch (error) {
    toast.error(error.message);
  }
};

// export const checkoutAsync = () => async (dispatch) => {
//   try {
//     console.log('checkout');
//     let userId = localStorage.getItem('userId');
//     let { data } = await axios.get(
//       `${UrlApi}/carts?userId=${userId}&_expand=type`,
//     );

//     console.log(data, 'cart');
//     data.map(async (value) => {
//       try {
//         console.log(value.type.stock, value.quantity);
//         await axios.patch(`${UrlApi}/types/${value.typeId}`, {
//           stock: value.type.stock - value.quantity,
//         });
//         await axios.delete(`${UrlApi}/carts/${value.id}`);
//       } catch (error) {
//         toast.error(error);
//       } finally {
//         dispatch(getCartUserAsync());
//       }
//     });
//   } catch (error) {}
// };

// export const updateQuantityAsync = (calc, id, now) => async (dispatch) => {
//   try {
//     let neww = 0;
//     if (calc == '+') neww = now + 1;
//     else neww = now - 1;
//     console.log(neww);
//     if (neww <= 0) await axios.delete(`${UrlApi}/carts/${id}`);
//     else
//       await axios.patch(`${UrlApi}/carts/${id}`, {
//         quantity: neww,
//       });
//   } catch (error) {
//   } finally {
//     dispatch(getCartUserAsync());
//   }
// };

export const { onGetData } = CartSlice.actions;

export default CartSlice.reducer;