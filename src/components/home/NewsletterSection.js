import React from 'react'
import styles from '../../styles/NewsletterSection.module.css';

function NewsletterSection() {
  return (
    <section className={styles.newsletterSection}>
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-lg-6'>
                    <center>
                        <h2 className={`text-center ${styles.title}`}>Latest From Manikya!</h2>
                        <p>signup for newsletter to get latest update</p>
                        <input className={`form-control ${styles.input}`} placeholder='Enter Email Address ....' />
                        <br />
                        <button className='btn btn-primary'>Subscribe</button>
                    </center>
                </div>
            </div>
        </div>
    </section>
  )
}

export default NewsletterSection