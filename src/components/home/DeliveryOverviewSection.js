import React from 'react'
import styles from '../../styles/DeliveryOverviewSection.module.css';
import { FiPhoneCall, FiTruck, FiMail, FiClock } from "react-icons/fi";
import { useSelector } from 'react-redux';

function DeliveryOverviewSection() {
    const appConfig = useSelector(state => state.app_config);
  return (
    <section className={styles.deliveryOverviewSection}>
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-md-3'>
                    <OverviewItem icon={<FiPhoneCall size="40px"/>} title="Expert Support" subtitle="sales@manikyajewellery.com" />
                </div>
                <div className='col-md-3'>
                    <OverviewItem icon={<FiTruck size="40px"/>} title="Delivery at Your Place" subtitle={`+91-${appConfig.data.contact_data.phone}`} />
                </div>
                <div className='col-md-3'>
                    <OverviewItem icon={<FiMail size="40px"/>} title="Buyer discount" subtitle="Special Offer Every Month" />
                </div>
                <div className='col-md-3'>
                    <OverviewItem icon={<FiClock size="40px"/>} title="Excellent quality" subtitle="Over 4K happy clients" />
                </div>
            </div>
        </div>
    </section>
  )
}

const OverviewItem = ({icon = null, title = "", subtitle ="", ...rest}) => {
    return (<div className={styles.item}>
        <div className={styles.icons}>
            {icon}
        </div>
        <div className={styles.content}>
            <h4>{title}</h4>
            <p>{subtitle}</p>
        </div>
    </div>)
}

export default DeliveryOverviewSection;