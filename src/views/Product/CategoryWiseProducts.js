import React, { useState, useEffect } from 'react';
import { AiOutlineRight } from "react-icons/ai";
import {  NavLink, useParams, useHistory } from 'react-router-dom';
import config from '../../core/config';
import styles from '../../styles/Category.module.css';

import Loader from '../../components/Loader';
import ProductTile from '../../components/product/ProductTile';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Fragment } from 'react';
import NoDataFountImage from '../../assets/images/ndf.png';
import { useDispatch, useSelector } from 'react-redux';
import { add_or_update_cart as addOrUpdateCart } from '../../store/actions/CartAction';

function CategoryWiseProducts() {

    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filterVal, setFilterVal] = useState('DESC');
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const cartData = useSelector(state => state.cart);

    const fetchProducts = () => {
        setIsLoading(true);
        axios.get(`${config.apiUrl_v1}/product?cat=${id}`)
        .then(({data}) => {
            // console.log("PRODUCTS:", data.data);
            setProducts(data.data)
            
            setIsLoading(false);
        })
        .catch(err => {
            console.log('====================================');
            console.log(err);
            console.log('====================================');
            setIsLoading(false);
        })
    }

    const fetchCategories = () => {
        setIsLoading(true);
        axios.get(`${config.apiUrl_v1}/category/navigation`)
        .then(({data}) => {
            // console.log("CATEGORIES:", data.data);
            setCategories(data.data)
            
            setIsLoading(false);
        })
        .catch(err => {
            console.log('====================================');
            console.log(err);
            console.log('====================================');
            setIsLoading(false);
        })
    }

    const handleAddToCart = async (product) => {
        var temp = cartData.filter((item) => item.id == product.id);
        let item = {};
        if(temp.length > 0) {
            item = {
                ...product,
                item_id: product.id,
                quantity: temp[0].quantity+1,
            }
            console.log(item);
        } else {
            item ={
                ...product,
                item_id: product.id,
                quantity: 1
            }
        }
        dispatch(addOrUpdateCart(item))
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts();

    // }, [props.products.data, props.categories.data])
    }, [id])


    const handelFilter = (e) => {
        setFilterVal(e.target.value);
        if (e.target.value != '') {
            // router.replace(`/category/${category}/?filter=${e.target.value}`);
            var data = products.sort((a, b) => {
                return a.price > b.price
            }).reverse();

            setIsLoading(true);
            setTimeout(() => {
                setProducts(data);
                setIsLoading(false);
            }, 500)
        }
    }

    if (isLoading) {
        return <Loader />
    }


    const filterOptions = [
        {label: 'High to Low', value: 'DESC'},
        {label: 'Low to High', value: 'ASC'},
    ] 

  return (
    <div><Helmet bodyAttributes={{style: 'background-color : #f2f3f8'}}/>
        <section className={styles.categoryWiseProduct}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div>
                            <select onChange={handelFilter} className="form-control form-control-sm ml-auto" style={{ width: "150px" }}>
                                <option value="">Select Option</option>
                                {
                                    filterOptions.map((item, i) => {
                                        return <option key={i} value={item.value} defaultValue={filterVal == item.value ? item.value : ""}>
                                            {item.label}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                        <br />
                    </div>
                    <div className="col-lg-3">
                        <div id='productListingAside'>
                            <Accordion activeIndex={0}>
                                <AccordionTab header="Categories">
                                        {/* <div className='innerListing'>
                                            <Accordion activeIndex={0}>
                                            {
                                                categories.map((cat, i) => {
                                                    return (
                                                        <Fragment key={i}>
                                                            {
                                                                // cat.children && cat.children.length != 0
                                                                // ?
                                                                //     <AccordionTab header={cat.name}>
                                                                //         {
                                                                //             cat.children.map((sub, s) => {
                                                                //                 return (
                                                                //                     <Fragment key={s}><NavLink to={`/category/${cat.id}`} className='app-link'>{sub.name}</NavLink><br/></Fragment>
                                                                //                 )
                                                                //             })
                                                                //         }
                                                                //     </AccordionTab>
                                                                // :   
                                                                <Fragment>
                                                                    <h4>dwadwa</h4>
                                                                    <NavLink to={`/category/${cat.id}`} className='app-link'>{cat.name}</NavLink><br/>
                                                                </Fragment>
                                                            }
                                                        </Fragment>
                                                    )
                                                })
                                            }
                                            </Accordion>
                                        </div> */}
                                    <ul style={{
                                        listStyleType: "none",
                                        paddingLeft: "15px",
                                    }}>
                                        {
                                            categories.map((cat, c) => {
                                                return (
                                                    <li key={c} style={{ marginBottom: "5px" }}>
                                                        
                                                        {
                                                            cat.children && cat.children.length != 0
                                                            ?   
                                                                <>
                                                                    <a className='app-link' style={{
                                                                        color: "#000",
                                                                        fontSize: "15px",
                                                                        fontWeight: "500",
                                                                    }} rel="noreferrer"><AiOutlineRight size={10} /> {cat.name}</a>
                                                                    <ul style={{
                                                                        listStyleType: "none",
                                                                        paddingLeft: "15px",
                                                                    }}>
                                                                        {
                                                                            cat.children.map((sub, s) => {
                                                                                return (
                                                                                    <li key={s}><NavLink to={`/category/${sub.id}`} className='app-link' style={{
                                                                                        paddingLeft: "12px",
                                                                                        fontSize: "15px",
                                                                                    }}>{sub.name}</NavLink></li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                </>
                                                            : <NavLink to={`/category/${cat.id}`} className='app-link' style={{
                                                                color: "#000",
                                                                fontSize: "15px",
                                                                fontWeight: "500",
                                                            }}><AiOutlineRight size={10} /> {cat.name}</NavLink>
                                                        }
                                                        
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </AccordionTab>
                                {/* <AccordionTab header="Header II">
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                                        voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
                                </AccordionTab>
                                <AccordionTab header="Header III">
                                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                                        cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
                                </AccordionTab> */}
                            </Accordion>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className='row g-2'>
                                    { 
                                        products.length != 0
                                        ? products.map((item, j) => {
                                            return (
                                                <div key={j} className="col-lg-4 pl-2  pr-2">
                                                    <ProductTile 
                                                        onViewDetails={() => history.push(`/product/${item.id}`)} 
                                                        onAddToCart={() => handleAddToCart(item)}
                                                        item={item} 
                                                    />
                                                </div>
                                            )
                                        })
                                        : <Fragment>
                                            
                                            <div className='col-lg-12'>
                                                <center>
                                                    <img src={NoDataFountImage} width="60%" />
                                                    <h6 className='text-muted' style={{
                                                        marginTop: "20px",
                                                    }}>Opps, no item found</h6>
                                                </center>
                                            </div>
                                        </Fragment>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default CategoryWiseProducts