import React, {useState} from 'react';
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const QuantityManager = ({getValue = () => {}, sendValue = 0, qty = 1, style= {}, size = "large", ...rest}) => {
// const QuantityManager = ({count = 1, increaseVal = () => {}, decreaseVal = () => {}, ...rest}) => {
    const [count, setCount] = useState(1);
    const [billingData, setBillingData] = useState({
        item_quantity : qty,
        value: parseFloat(sendValue),
    });

    const quantityChanger = (type) => {
        var temp = {};

        if (type == "plus") {

            temp = {
                ...billingData,
                item_quantity: billingData.item_quantity + 1,
            }
        } else {
            temp = {
                ...billingData,
                item_quantity: (billingData.item_quantity < 3) ? 1 : billingData.item_quantity - 1
            }
        }
        setBillingData({
            ...temp,
            value: temp.item_quantity * parseFloat( parseFloat(sendValue))
        });
        getValue({
            ...temp,
            value: temp.item_quantity * parseFloat( parseFloat(sendValue))
        });
    }

    return (
        <div className='quantityManager' style={style}>
            <button disabled={billingData.item_quantity < 2} onClick={() => quantityChanger('minus')} className={`${size == 'large' ? `btn` : `btn-sm`} btn-primary`}><AiOutlineMinus style={{fontSize: "20px"}}/></button>
            <input type="text" className="form-control quantityControl" value={billingData.item_quantity} onChange={(e) => setCount(e.target.value)} />
            <button onClick={() => quantityChanger('plus')} className={`${size == 'large' ? `btn` : `btn-sm`} btn-primary`}><AiOutlinePlus style={{fontSize: "20px"}}/></button>
        </div>
    )
}

export default QuantityManager