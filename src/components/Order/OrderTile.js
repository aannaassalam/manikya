import React, {useState} from 'react'
import { Sidebar } from 'primereact/sidebar';
import styles from './OrderTile.module.css';
import config from '../../core/config';
import { Timeline } from 'primereact/timeline';
import DummyImage from '../../assets/images/dummy-image.jpg';
import helpers from '../../core/helpers';

function OrderTile({item = {}}) {
  const [visibleRight, setVisibleRight] = useState(false);
  const [finalImageUrl, setFinalImageUrl] = useState(DummyImage);

  const viewDetails = () => {
    setVisibleRight(true)
  } 
  const data  = JSON.parse(item.item_detail);
  // console.log(data);

  const events1 = [
      { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
      { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
      { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
      { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
  ];

  // const imageUrl = data.product_images.length > 0 && data.product_images[0].image.trim().split(" ").join("%20");
  // const finalImageUrl = imageUrl && `${config.publicImageUrl}/${imageUrl}`;

  const getProductImageUrl = () => {
    if('product_images' in data && data.product_images.length > 0) {
      let imageUrl = data.product_images[0].image?.trim().split(" ").join("%20");
      // return imageUrl;
      if(imageUrl == undefined) {
        return DummyImage;
      } else {
        return `${config.publicImageUrl}/${imageUrl}`;
      }
    } else {
      return DummyImage;
    }
  }
  // console.log(getProductImageUrl());
  return (
    <>
      <div className={styles.orderTile}>
          <div className={styles.orderImage} style={{
            backgroundImage: `url(${getProductImageUrl(data)})`
          }}></div>
          <div className={styles.orderContent}>
            <h3 className={styles.orderId}>Delivery Date : 30-01-2023</h3>
            <h4 className={styles.productName}>{data.name}</h4>
            <div className={styles.orderAttributes}>
              <p>Quantity : {data.quantity}</p>
              <p>Total Amount :  <b>₹{data.sp}</b></p>
              <p>Shiping Address :  <a href="#">{item.shiping_data.name}</a></p>
            </div>
          </div>
          <div className={styles.orderAction}>
            <button className='btn btn-primary btn-block' onClick={viewDetails}>Order Details</button>
            <button className='btn btn-primary btn-block' onClick={viewDetails}>Track Order</button>
            <button className='btn btn-danger-lite btn-block'>Cancle Order</button>
          </div>
      </div>
      <Sidebar 
        showCloseIcon={false}
        visible={visibleRight} 
        baseZIndex={'1201'} 
        className={styles.detailsPanel} 
        position="right" 
        onHide={() => setVisibleRight(false)}
      >
          <div className={styles.orderDetails}>
            <h6>Order Details</h6>
            <div className={styles.orderDetailsInner}>
              <div className={styles.item}><h4>{data.name}</h4></div>
              <div className={styles.item}><p>Total Amount</p><p><b>₹{data.sp}</b></p></div>
              <div className={styles.item}><p>Quantity</p><p><b>{data.quantity}</b></p></div>
              <div className={styles.item}><p>Order Placed</p><p><b>{ item.created_at}</b></p></div>
              {/* <div className={styles.item}><p>Order Placed</p><p><b>{ helpers.getDateString(new Date(item.created_at), 'd-M-y')}</b></p></div> */}
              {/* <div className={styles.item}><p>Delivery Date</p><p><b>18-01-2023</b></p></div> */}
            </div>
            {
              item.shiping_data &&
              <>
                <h6>Shiping Details</h6>
                <div className={styles.orderDetailsInner}>
                  <div className={styles.item}><p>Name</p><p><b>{item.shiping_data.name}</b></p></div>
                  <div className={styles.item}><p>Phone</p><p><b>{item.shiping_data.phone}</b></p></div>
                  <div className={styles.item}><p>Email</p><p><b>{item.shiping_data.email}</b></p></div>
                  <div className={styles.item}><p>Address</p><p><b style={{
                        width: "260px",
                        display: "block",
                  }}>{` ${item.shiping_data.address},
                        ${item.shiping_data.landmark}, 
                        ${item.shiping_data.city}, 
                        ${item.shiping_data.state},
                        ${item.shiping_data.pincode}
                  `}</b></p></div>
                </div>
              </> 
            }
            <h6>Order Track</h6>
            <div style={{width: "100%"}} id="orderTrack">
              <Timeline value={events1} opposite={(item) => item.status} content={(item) => <small className="p-text-secondary">{item.date}</small>} />
            </div>
          </div>
      </Sidebar>
    </>
  )
}

export default OrderTile