import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  deleteCart,
  getAllPrescriptionsCartsAPI,
  getPrescriptionCartAPI,
  getUserCarts,
  postCart,
  updateCart,
  updateConfirmationPrescriptionCartAPI,
} from '../../API/cartAPI';
import { processData } from '../../Helper/cartHelper';
// import UrlApi from '../../Supports/Constants/URLAPI';

const initialState = {
  carts: [],
  totalCart: 0,
  activeCart: 0,
  totalPrice: 0,
  discount: 0,
  weight: 0,
  prescriptionCarts: [],
  detailprescriptionCart: {},
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    onGetData: (initialState, action) => {
      initialState.carts = action.payload.carts;
      initialState.totalCart = action.payload.totalCart;
      initialState.activeCart = action.payload.activeCart;
      initialState.totalPrice = action.payload.totalPrice;
      initialState.discount = action.payload.discount;
      initialState.weight = action.payload.weight;
      console.log('masuk');
    },
    setPrescriptionCarts: (initialState, action) => {
      initialState.prescriptionCarts = action.payload;
    },
    setDetailprescriptionCart: (initialState, action) => {
      initialState.detailprescriptionCart = action.payload;
    },
  },
});

export const updateQtyAsync = (values) => async (dispatch) => {
  const { newQty, calc, idx, carts } = values;
  let newCarts = [...carts];
  let cart = { ...carts[idx] };
  newCarts[idx] = cart;
  let stock = cart.product.closed_stocks[0]?.total_stock;

  if (calc) {
    if (calc === '+')
      if (cart.qty + 1 > stock) return toast.error('Out Of Stock');
      else cart.qty = cart.qty + 1;
    else {
      if (cart.qty <= 0) return toast.error('cart deleted');
      else cart.qty--;
    }
  } else {
    if (newQty > stock) return toast.error('Out Of Stock');
    else cart.qty = newQty;
  }
  newCarts[idx] = cart;
  dispatch(onGetData(await processData(newCarts)));
};

export const getCartUserAsync = () => async (dispatch) => {
  try {
    let token = localStorage.getItem('token');
    if (!token) {
      throw { message: 'No User' };
    }

    let { data } = await getUserCarts(token);

    let totalPrice = 0,
      totalCart = 0,
      activeCart = 0,
      weight = 0,
      discount = 0;
    data.data.map((value) => {
      totalCart += value.qty;
      if (value.is_check) {
        activeCart += value.qty;
        totalPrice += value.qty * value.product.price;
        weight += value.product.weight;
        value.product.promotions?.map((promo) => {
          if (promo?.discount)
            discount +=
              value.qty * value.product.price * (promo.discount / 100);
        });
      }
    });

    dispatch(
      onGetData({
        carts: data.data,
        totalCart,
        totalPrice,
        activeCart,
        discount,
        weight,
      }),
    );
  } catch (error) {
    console.log(error);
  }
};

export const addToCartAsync = (values) => async (dispatch) => {
  try {
    console.log('>>>>>>>', values);
    const { productId, qty, prescriptionImage } = values;
    const token = localStorage.getItem('token');
    if (!token) throw { message: 'Please Login First' };
    if (!productId) throw { message: "Product doesn't exist" };
    if ((productId === 1) & !prescriptionImage) {
      throw { message: 'Please upload image' };
    }
    const response = await postCart(token, {
      productId,
      qty,
      prescription_images: prescriptionImage,
    });
    console.log(response);

    await dispatch(getCartUserAsync());
    toast.success('Add to cart Success');
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || error?.message);
  }
};

export const updateCartAsync = (values) => async (dispatch) => {
  try {
    const { cartId, qty, isCheck, stock } = values;

    const token = localStorage.getItem('token');
    if (stock < qty) throw { message: 'stock kurang' };
    if (qty <= 0) await deleteCart(token, cartId);
    else await updateCart(token, cartId, { qty, isCheck });
  } catch (error) {
    toast.error(error.message);
  } finally {
    dispatch(getCartUserAsync());
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
  } catch (error) {
    return toast.error('Failed to remove product');
    // toast.error(error.message);
  }
};

// export const checkoutAsync = () => async (dispatch) => {
//   try {
//     console.log('checkout');
//     let token = localStorage.getItem('token');

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

export const getAllPrescriptionsCartsSlice = (params) => async (dispatch) => {
  try {
    // const { search } = params;
    const token = localStorage.getItem('token');
    const response = await getAllPrescriptionsCartsAPI(token, params);

    if (response.data.success) {
      dispatch(setPrescriptionCarts(response.data.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPrescriptionCartSlice = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await getPrescriptionCartAPI(token, id);

    if (response.data.success) {
      dispatch(setDetailprescriptionCart(response.data.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateConfirmationPrescriptionCartSlice =
  (id, confirmation, navigate, notes) => async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const response = await updateConfirmationPrescriptionCartAPI(
        token,
        id,
        confirmation,
        notes,
      );

      if (response.data.success) {
        dispatch(getAllPrescriptionsCartsSlice());
        navigate('/prescription');
      }
    } catch (error) {
      console.log(error);
    }
  };

export const {
  onGetData,
  getCurrentCart,
  setPrescriptionCarts,
  setDetailprescriptionCart,
} = CartSlice.actions;

export default CartSlice.reducer;
