import React, { useState, useEffect, Fragment } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import OrderTile from '../../components/Order/OrderTile';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import config from '../../core/config';
import Loader from '../../components/Loader';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserOrders = async () => {
        setIsLoading(true);
        var token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        await axios.get(`${config.apiUrl_v1}/${config.GET_AUTH_USER_ORDERS}`)
            .then(({ data }) => {
                // console.log("DATA", data.data);
                if (data.status) {
                    setOrders(data.data)
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    console.error("ERROR", data);
                }
            })
            .catch(err => {
                console.log("ERR:", err);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetchUserOrders();
    }, [])

    if(isLoading) {
        return <Loader />
    }

    return (
        <div style={{ paddingTop: "30px" }}>
            <Helmet bodyAttributes={{ style: 'background-color : #f2f3f8' }} />
            <div className='container'>
                <div className="col-lg-12">
                    <div className='orderList'>
                        <TabView>
                            <TabPanel header="My Orders">
                                <div>
                                    {
                                        orders.length > 0 &&
                                        orders.map((order, o) => (
                                            <div key={o} className='card'>
                                                <div className='card-header' style={{background: "#fff4e0f0"}}>
                                                    <h5 style={{
                                                        margin: "0px",
                                                        color: "#9e0000",
                                                        fontSize: "16px",
                                                    }}>Order ID : #{order.order_number} &nbsp;&nbsp;|&nbsp;&nbsp; Order Date: {order.created_at}</h5>
                                                </div>
                                                <div className="card-body p-0">
                                                    {
                                                        order.order_item.length > 0 &&
                                                        order.order_item.map((item, i) => (<OrderTile key={i} item={item} />))
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                    {/* <div className='card'>
                                        <div className='card-header'>
                                            <h5 style={{
                                                margin: "0px",
                                                color: "#9e0000",
                                                fontSize: "16px",
                                            }}>Order ID : # 407-3539216-5156353 &nbsp;&nbsp;<span>|</span>&nbsp;&nbsp; Order Date: 12-01-2023</h5>
                                        </div>
                                        <div className="card-body">
                                            <OrderTile />
                                            <hr />
                                            <OrderTile />
                                        </div>
                                    </div> */}
                                </div>
                            </TabPanel>
                            <TabPanel header="Cancelled Orders">
                                {/* <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                    architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                                    voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p> */}
                            </TabPanel>
                            {/* <TabPanel header="Header III">
                            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                            cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
                        </TabPanel> */}
                        </TabView>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Orders