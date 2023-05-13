// export const dropinComponent = [
//   {
//     name: 'Order Details',
//     id: 'order-details'
//   },
//   {
//     name: 'Card',
//     id: 'card'
//   },
//   {
//     name: 'UPI',
//     id: 'upi'
//   },
//   {
//     name: 'Wallets',
//     id: 'app'
//   },
//   {
//     name: 'Netbanking',
//     id: 'netbanking'
//   },
//   {
//     name: 'Paylater',
//     id: 'paylater'
//   },
//   {
//     name: 'Credit Card EMI',
//     id: 'creditcardemi'
//   },
//   {
//     name: 'Cardless EMI',
//     id: 'cardlessemi'
//   }
// ];

const dropinComponent = {
    components: [
        "order-details",
        "card",
        "app",
        "upi",
        "netbanking",
        "paylater",
        "creditcardemi",
        "debitcardemi",
        "cardlessemi",                                      
    ],
    onSuccess: (data) => {
        //on success
        alert("OnSuccess")
    },
    onFailure: (data) => {
        //on success
        alert("onFailure")
    },
    style: {
        //to be replaced by the desired values
        backgroundColor: "#ffffff",
        color: "#3f311b", 
        fontFamily: "Lato",
        fontSize: "14px",
        errorColor: "#ff0000",
        theme: "light",
    }
}
export default dropinComponent;