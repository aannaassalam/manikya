import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../../styles/Category.module.css';
import Category from '../Category/Category';

function CategorySection({data = {}}) {

  const [categories, setCategories] = useState(data);
  const history = useHistory();
  
  useEffect(()=>{
    setCategories(data)
    // setCategories(data.section_content)
  }, []);

  return (
    <section className={styles.categoryListSection}>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-5 pr-2'>
            <div className='content-vCenter'>
              <p className='text-prefix'>{categories.section_title}</p>
              <h2 className='text-primary'>{categories.description}</h2>
              <br/>
              <button className='btn btn-primary-outline' onClick={() => { history.push('/category/1') }}>ALL CATEGORY</button>
              <br/>
            </div>
          </div>
          <div className='col-lg-7 pl-2 pr-2'>
            <div className='row no-gutters'>
              {
                categories.section_content != null && categories.section_content.length > 0 && 
                categories.section_content.map((item, i)=>{
                  return  <div key={i} className='col-lg-4 col-md-4 col-sm-6 col-6'>
                            <Category link={item.link} image={item.image} title={item.title_text} />
                          </div>
                })
              }
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategorySection;