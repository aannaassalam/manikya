import React, { useState, useEffect } from 'react'
import styles from '../../styles/NewArrivalSection.module.css';
// import ProductTile from '../product/ProductTile';
import axios from 'axios';
// import { Base64 } from 'js-base64';
import Loader from '../Loader';
import config from '../../core/config';
import ProductSlider from '../product/ProductSlider';

function NewArrivalsSection() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const fetchProducts = () => {
    setIsLoading(true);
    axios.get(`${config.apiUrl_v1}/product/new-arrival`)
      .then(({ data }) => {
        setIsLoading(false);
        setProducts(data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })
  }

  
  useEffect(() => {
    fetchProducts();
  }, [])

  if (isLoading) {
    return <Loader style={{display: "none"}} />
  }

  return (
      products.length > 0 && <div className={styles.newArrivalSection} id="newArrival">
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <div className='col-lg-11'>
            <h2 className={`${styles.sectionTitle}`}>New <span>Arrival</span></h2>
            {/* <p className={styles.sectionSubtitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto suscipit eligendi aliquam adipisci ea, a nostrum ducimus similique repellat.</p> */}
          </div>
          {/* 
          {
            products.length > 0 && products.map((item, i) => {
              return <div key={i} className='col-lg-3 pl-2 pr-2'>
                  <ProductTile item={item} to={`category/product/${item.id}`} />
                </div>
            })
          } */}
        </div>
        <div className='row no-gutters'>
          <div className="col-lg-12">
            {
              products.length != 0 && <ProductSlider items={products} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewArrivalsSection;