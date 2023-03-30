import moment from 'moment';
import 'moment/locale/fr';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/LoadingError/Error';
import Loading from '../../components/LoadingError/Loading';
import { listOrder } from '../../Redux/Actions/OrderActions';

import './profile.css'

const OrderList = (props) => {
  const dispatch = useDispatch();


  const orderList = useSelector((state)=>state.orderList);
  const { loading,errors,orders } = orderList;

  useEffect(()=>{
    dispatch(listOrder())
    console.log(listOrder);
  },[dispatch]);

  return (
    <div className='tablediv2'>

          {
            loading ? (
              <Loading/>
            ) : errors ? (
              <Message variant="alert-danger">{errors}</Message>
            ) : (
                  <>
                    { orders.length === 0 ? (
                        <p>Vous n'avez pas de commande</p>
                      )
                      :
                      (
                        <div class="table100">
                          <table>
                            <thead>
                              <tr class="table100-head">
                                <th class="column1">Date</th>
                                <th class="column2">Identifiant commande</th>
                                <th class="column7">Status</th>
                                <th class="column8">Livraison</th>
                                <th class="column6">Totale</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                orders.map((order)=>(
                                  <tr className={`${order.isPaid ? "text-success" : "text-danger"}`} key={order._id}>
                                    <td class="column1">{order.isPaid ? moment(order.paidAt).calendar(): moment(order.createdAt).calendar()}</td>
                                    <td class="column2"><a href={`/order/${order._id}`}>{order._id}</a></td>
                                    <td class="column7">{order.isPaid ? <>Payé</> : <>Non Payé</>}</td>
                                    <td class="column8">{order.isDelivered ? <>Livré</> : <>Non Livré</>}</td>
                                    <td class="column6">{order.totalPrice}</td>
                                  </tr>
                                ))
                              }
                            </tbody>
                          </table>
                        </div>
                      )
                    }
                  </>
                )
          }
    </div>
  )
}

export default OrderList
