import React from 'react'
import styles from '../../styles/SectionOne.module.css';

const SectionOne = () => {
  return (
    <section className={styles.sectionOne}>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-6 pr-2'><div className={styles.box}></div></div>
          <div className='col-lg-6 pl-2'><div className={styles.box}></div></div>
          <div className='col-lg-4 pr-2'><div className={styles.box}></div></div>
          <div className='col-lg-4 pl-2 pr-2'><div className={styles.box}></div></div>
          <div className='col-lg-4 pl-2'><div className={styles.box}></div></div>
        </div>
      </div>
    </section>
  )
}

export default SectionOne;