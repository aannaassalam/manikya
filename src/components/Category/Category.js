import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../../styles/Category.module.css';

function Category({image = null, title = '', link = ''}) {
  
  const history = useHistory();

  return (
    <div className={styles.categoryTile} style={{
      backgroundImage: `url(${image})`
    }}>
      <div className={styles.categoryTileInner}>
        <center>
          <div className={styles.onHoverShow} style={{ padding: "10px"}}>
            <h4 className={styles.categoryTitle}>{title}</h4>
            <a className={`btn btn-primary-outline ${styles.categoryBtn}`} 
              onClick={() => {
                history.push(link);
              }}
            >EXPLORE</a>
          </div>
        </center>
      </div>
    </div>
  )
}

export default Category