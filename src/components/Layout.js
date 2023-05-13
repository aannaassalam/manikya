import React, { useState, useEffect, Fragment } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import MainNavigation from './layout/MainNavigation';
import Footer from './Footer';
import { Sidebar } from 'primereact/sidebar';
import MobileNavigation from './layout/MobileNavigation';
import axios from 'axios';
import config from '../core/config';
import CartItem from './Cart/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/actions/CartAction';

// import $ from 'jquery'; 
// import './layout/MainNavigation.module.css';

const Layout = ({ title = 'Document', visible = true, ...rest }) => {

    const location = useLocation();
    const history = useHistory();
    const cartData = useSelector(state=>state.cart)
    const [isLoading, setIsLoading] = useState(true);
    const [visibleRight, setVisibleRight] = useState(false);
    const [visibleMobileNav, setVisibleMobileNav] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const dispatch =useDispatch()
    


    const fetchCategories = () => {
        setIsLoading(true);
        axios.get(`${config.apiUrl_v1}/category/navigation`)
        .then(({data}) => {
            
            setCategories(data.data)
            // console.log("CATEGORIES:", categories);
            var items = [];
            data.data.length != 0 && data.data.map((item) => {
                
                items.push({
                    id: item.id,
                    label: item.name,
                    icon: null,
                    items: item.children.length > 0 ? childCategories(item.children) : null,
                    command: (event) => { 
                        if(item.children.length == 0) {
                            closeMobileMenu();
                            item.children.length == 0 && history.push(`/category/${item.id}`);
                        }
                    }
                });
            })
            // console.log("DATA:", items);
            setCategoriesList(items)
            setIsLoading(false);
        })
        .catch(err => {
            console.log('====================================');
            console.log(err);
            console.log('====================================');
            setIsLoading(false);
        })
    }

    const childCategories = (childrens) => {
        let items = [];
        childrens.map(sub => {
            items.push({
                label: sub.name,
                icon: null,
                command: (event) => { 
                    closeMobileMenu();
                    history.push(`/category/${sub.id}`);
                }
            })
        });
        return items;
    }

    useEffect(() => {
        fetchCategories();

    }, []);


    const onClickCart = () => setVisibleRight(true);
    const openMobileMenu = () => setVisibleMobileNav(true);
    const closeMobileMenu = () => setVisibleMobileNav(false);
    
    if(visible) {
        return (
            <Fragment>
                <MainNavigation 
                    categories={categoriesList} 
                    openMobileMenu={openMobileMenu} 
                    onClickCart={onClickCart} 
                />
                <main>
                    {rest.children}
                </main>
                <Footer />
                <Sidebar 
                    showCloseIcon={false} 
                    visible={visibleRight} 
                    position="right" 
                    onHide={() => setVisibleRight(false)} 
                    baseZIndex={'1201'}
                    className="cartSlider"
                    
                >
                    <div className="cartSliderInner">
    
                        <div style={{
                            // background: "#ddb06c52",
                            marginBottom: "10px",
                            display: "flex",
                            placeContent: "center flex-start",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            alignContent: "center",
                            cursor: "pointer",
                        }}
                        >
                            <div onClick={() => setVisibleRight(false)} style={{
                                padding: "10px 10px",
                                borderRadius: "12px",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                flexDirection: "row",
                                flexWrap: "nowrap",
                                alignContent: "center",
                                cursor: "pointer",
                            }}> 
    
                                <i className="pi pi-arrow-left" style={{
                                    color: "#5f4110",
                                    marginRight: "12px",
                                }}></i>
                                <h4 style={{
                                    fontSize: "15px",
                                    color: "#5f4110",
                                    margin: "0px",
                                    flex:1
                                }}>Your Cart</h4>
                            </div>
                            <button onClick={()=> dispatch(clearCart())} className='btn btn-danger-lite' > Clear cart</button>
                        </div>
                        {
                            cartData.map((item, i) =>(
                                <CartItem key={i} qty={item.quantity} size='small' item={item} />
                            ))
                        }
                        
                        <NavLink to="/cart" onClick={() => setVisibleRight(false)} className='btn btn-accent btn-block mt-5'>View All</NavLink>
                    </div>
                </Sidebar>
                <Sidebar  
                    showCloseIcon={false} 
                    visible={visibleMobileNav} 
                    onHide={() => setVisibleMobileNav(false)} 
                    baseZIndex={'1201'}
                    className="mobileMenu"
                >
                    <MobileNavigation 
                        onClickCart={onClickCart}
                        categories={categoriesList} 
                        closeMobileMenu={closeMobileMenu}
                    />
                </Sidebar>
            </Fragment>
        )
    } else {
        return ( <main>
            {rest.children}
        </main>)
    }
}

export default Layout;