import React from "react";
import { SlideMenu } from "primereact/slidemenu";
import styles from "./MobileNavigation.module.css";
import config from "../../core/config";
import { Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { make_logout as makeLogout } from "../../store/actions/AuthAction";

function MobileNavigation({
  onClickCart = () => {},
  categories = [],
  closeMobileMenu = () => {},
}) {
  const history = useHistory();
  const dispatch = useDispatch();

  const authData = useSelector((state) => state.auth);
  const appConfig = useSelector((state) => state.app_config);

  const handleLogout = () => {
    var text = "Are you sure, want to logout?";
    if (window.confirm(text) == true) {
      dispatch(makeLogout());
    }
  };
  const mainNavItemsAuth = [
    {
      label: "ACCOUNT",
      icon: "pi pi-fw pi-user",
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
  const mainNavItemsGuest = [
    {
      label: "Home",
      icon: "pi pi-fw pi-home",
      command: (e) => {
        closeMobileMenu();
        history.push("/");
      },
    },
    {
      label: "Collections",
      icon: "pi pi-fw pi-shopping-cart",
      items: categories,
    },
    {
      label: "About Us",
      icon: "pi pi-fw pi-globe",
      items: null,
      command: (event) => {
        closeMobileMenu();
        history.push(`/about-us`);
      },
    },
    {
      label: "Contact",
      icon: "pi pi-fw pi-phone",
      items: null,
      command: (event) => {
        closeMobileMenu();
        history.push(`/contact`);
      },
    },
    {
      label: "Cart",
      icon: "pi pi-fw pi-shopping-bag",
      items: null,
      command: (event) => {
        closeMobileMenu();
        onClickCart();
      },
    },
    // {
    //     label: 'Shop',
    //     icon: 'pi pi-fw pi-shopping-cart',
    //     items: [
    //         {
    //             label: 'New',
    //             icon: 'pi pi-fw pi-plus',
    //             items: [
    //                 {
    //                     label: 'Bookmark',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [
    //                         {
    //                             label: 'Bookmark',
    //                             icon: 'pi pi-fw pi-bookmark'
    //                         },
    //                         {
    //                             label: 'Video',
    //                             icon: 'pi pi-fw pi-video'
    //                         },

    //                     ]
    //                 },
    //                 {
    //                     label: 'Video',
    //                     icon: 'pi pi-fw pi-video'
    //                 },

    //             ]
    //         },
    //         {
    //             label: 'Delete',
    //             icon: 'pi pi-fw pi-trash'
    //         },
    //         {
    //             separator: true
    //         },
    //         {
    //             label: 'Export',
    //             icon: 'pi pi-fw pi-external-link'
    //         }
    //     ]
    // },
    // {
    //     label: 'Users',
    //     icon: 'pi pi-fw pi-user',
    //     items: [
    //         {
    //             label: 'New',
    //             icon: 'pi pi-fw pi-user-plus',

    //         },
    //         {
    //             label: 'Delete',
    //             icon: 'pi pi-fw pi-user-minus',

    //         },
    //         {
    //             label: 'Search',
    //             icon: 'pi pi-fw pi-users',
    //             items: [
    //                 {
    //                     label: 'Filter',
    //                     icon: 'pi pi-fw pi-filter',
    //                     items: [
    //                         {
    //                             label: 'Print',
    //                             icon: 'pi pi-fw pi-print'
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     icon: 'pi pi-fw pi-bars',
    //                     label: 'List'
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     separator: true
    // },
    authData.isAuth && {
      label: "Logout",
      icon: "pi pi-fw pi-power-off",
      command: (e) => {
        handleLogout();
        closeMobileMenu();
      },
    },
  ];

  return (
    <div id="mobileMenuContainer">
      <div className={styles.mobileMenuHeader}>
        <div>
          <p className={styles.welcomeText}>Welcome to</p>
        </div>
        <div>
          <img
            className={styles.logo}
            src={appConfig.data.app_logo}
            alt="manikya"
          />
        </div>
        {!authData.isAuth && (
          <div>
            <NavLink
              to="/login"
              onClick={() => closeMobileMenu()}
              className={styles.link}
            >
              <i className="pi pi-user"></i>&nbsp;Sign-in
            </NavLink>
          </div>
        )}
      </div>
      <SlideMenu
        model={
          authData.isAuth
            ? [].concat(mainNavItemsAuth, mainNavItemsGuest)
            : mainNavItemsGuest
        }
        viewportHeight={500}
        menuWidth={320}
      ></SlideMenu>
    </div>
  );
}

export default MobileNavigation;
