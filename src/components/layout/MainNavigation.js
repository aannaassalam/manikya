import React, { useEffect, useRef, useState } from "react";
import { MegaMenu } from "primereact/megamenu";
import { Menubar } from "primereact/menubar";
import { Menu } from "primereact/menu";
import { Link, NavLink, useHistory } from "react-router-dom";
import config from "../../core/config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { make_logout as makeLogout } from "../../store/actions/AuthAction";
import { Button } from "primereact/button";

function MainNavigation({
  categories = [],
  onClickCart = () => {},
  openMobileMenu = () => {},
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const footerRef = useRef(null);
  const menu = useRef(null);
  const cartData = useSelector((state) => state.cart);
  const authData = useSelector((state) => state.auth);
  const appConfig = useSelector((state) => state.app_config);

  const handleLogout = () => {
    var text = "Are you sure, want to logout?";
    if (window.confirm(text) == true) {
      dispatch(makeLogout());
    }
  };

  const topNavItems = [
    {
      label: "Profile & Account",
      items: [
        {
          label: "Profile",
          icon: "pi pi-user",
          command: () => {
            history.push("/profile");
          },
        },
        {
          label: "Logout",
          icon: "pi pi-times",
          command: () => handleLogout(),
        },
      ],
    },
    // {
    //     label: 'Navigate',
    //     items: [
    //         {
    //             label: 'React Website',
    //             icon: 'pi pi-external-link',
    //             url: 'https://reactjs.org/'
    //         },
    //         {
    //             label: 'Router',
    //             icon: 'pi pi-upload',
    //             command:(e) => {
    //                 window.location.hash = "/fileupload"
    //             }
    //         }
    //     ]
    // }
  ];

  const mainNavItemsGuest = [
    {
      label: "HOME",
      icon: null,
      items: null,
      command: (event) => {
        history.push(`/`);
      },
    },
    {
      label: "COLLECTIONS",
      icon: null,
      items: categories,
    },
    {
      label: "ABOUT US",
      icon: null,
      items: null,
      command: (event) => {
        history.push(`/about-us`);
      },
    },
    {
      label: "CONTACT",
      icon: null,
      items: null,
      command: (event) => {
        history.push(`/contact`);
      },
    },
  ];

  const mainNavItemsAuth = [
    {
      label: "ACCOUNT",
      icon: null,
      items: [
        {
          label: "My Orders",
          icon: null,
          items: null,
          command: (event) => {
            history.push(`/orders`);
          },
        },
        {
          label: "Return Orders",
          icon: null,
          items: null,
          command: (event) => {
            history.push(`/return-orders`);
          },
        },
        //    {
        //       label:'My Wishlist',
        //       icon: null,
        //       items: null
        //    },
      ],
    },
  ];

  return (
    <div id="navigationDesktop">
      <a ref={footerRef} style={{ display: "none" }} href="#contact">
        Scroll to contact
      </a>
      {/* <div className='top-bar'>
                <ul className='top-bar-nav'>
                    <li><a href="#">info@manikyajewellery.com</a></li>
                    <li>|</li>
                    <li><a href="#">+91 000000000</a></li>
                </ul>
                <ul className='top-bar-nav'>
                    <li><Link to='/login'>Login</Link></li>
                    <li>|</li>
                    <li><a href="#">Register</a></li>
            </ul>
        </div> */}
      <nav>
        {window.screen.width > 648 && (
          <div className="social-links">
            <ul>
              <li>
                <a
                  href={appConfig.data.contact_data.facebook_link}
                  target="_blank"
                >
                  <i className="pi pi-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href={appConfig.data.contact_data.instagram_link}
                  target="_blank"
                >
                  <i className="pi pi-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        )}

        {window.screen.width > 648 ? (
          <div>
            <img
              src={appConfig.data.app_logo}
              width="185px"
              height="52px"
              alt="manikya"
              style={{ filter: "brightness(0.3)" }}
            />
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div onClick={openMobileMenu}>
              <i
                className="pi pi-bars"
                style={{
                  fontSize: "20px",
                  color: "#3f311b",
                  margin: "10px 15px 10px 5px",
                }}
              ></i>
            </div>
            <img
              src={appConfig.data.app_logo}
              width="150px"
              height="45px"
              alt="manikya"
              style={{ filter: "brightness(0.3)" }}
            />
          </div>
        )}
        {window.screen.width > 648 && (
          <div
            style={{
              display: "flex",
            }}
          >
            {authData.isAuth ? (
              <div
                style={{
                  padding: "2px 10px",
                  cursor: "pointer",
                }}
                onClick={(event) => menu.current.toggle(event)}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    marginBottom: "2px",
                    color: "#000000",
                  }}
                >
                  Welcome
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "#000000",
                  }}
                >
                  {authData.user.name ?? ""}
                </div>
                <Menu
                  model={topNavItems}
                  popup
                  ref={menu}
                  id="nav_popup_menu"
                />
              </div>
            ) : (
              <div>
                <ul className="nav">
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                </ul>
              </div>
            )}

            <div>
              <div onClick={() => onClickCart()}>
                <i
                  className="pi pi-shopping-bag"
                  style={{
                    color: "#000000",
                    fontSize: "20px",
                    padding: "10px 15px",
                    cursor: "pointer",
                  }}
                >
                  {cartData.length !== 0 && (
                    <span className="navCartCount">
                      {cartData.length.toString()}
                    </span>
                  )}
                </i>
              </div>
            </div>
          </div>
        )}
        {window.screen.width < 648 && (
          // <div
          //   style={{
          //     display: "flex",
          //   }}
          // >
          <div onClick={() => onClickCart()}>
            <i
              className="pi pi-shopping-bag"
              style={{
                color: "#000000",
                fontSize: "20px",
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              {cartData.length != 0 && (
                <span
                  className="navCartCount"
                  style={{
                    padding: "6px 4px",
                    borderRadius: "50px",
                    width: "22px",
                    height: "22px",
                  }}
                >
                  {cartData.length.toString()}
                </span>
              )}
            </i>
          </div>
          // </div>
        )}
      </nav>

      {window.screen.width > 648 && (
        <Menubar
          model={
            authData.isAuth
              ? [].concat(mainNavItemsGuest, mainNavItemsAuth)
              : mainNavItemsGuest
          }
        />
      )}
    </div>
  );
}

export default MainNavigation;
