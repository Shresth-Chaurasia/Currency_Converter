import React from 'react'
import { useState } from 'react'
import CurrencySelect from './CurrencySelect'


const CurrencyForm = () => {
    const [Amount, setAmount] = useState(100)
    const [fromCurrency, setfromCurrency] = useState("USD")
    const [toCurrency, settoCurrency] = useState("INR")
    const [result, setResult] = useState("")
    const [isloading, setisloading] = useState(false)
    const handleswapcurrencies = () => {
        setfromCurrency(toCurrency)
        settoCurrency(fromCurrency)
    }

    const getExchangeRates = async() => {
        const API_KEY = '61c5e805b0f13c2597c4225d';
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;
        if (isloading) return;
        setisloading(true);
        try {
            const response = await fetch(API_URL)
            if(!response.ok) throw Error("Something went wrong");
            const data = await response.json()
            const rate = (data.conversion_rate * Amount).toFixed(2)
            setResult(`${Amount} ${fromCurrency} = ${rate} ${toCurrency}`);
        } catch (error) {
            setResult("Something went wrong!");
        } finally{
            setisloading(false)
        }
    }
    

    const handleFormSubmit = (e) => {
      e.preventDefault()
      getExchangeRates()
    }
    

    return (
        <form className='converter-form' onSubmit={handleFormSubmit}>
            <div className="form-group">
                <label htmlFor="form-label">Enter Amount</label>
                <input
                    type="number"
                    className='form-input'
                    value={Amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <div className='form-group form-currency-group'>
                <div className="form-section">
                    <label htmlFor="form-currency">From</label>
                    <CurrencySelect
                        selectedCurrency={fromCurrency}
                        handleCurrency={e => setfromCurrency(e.target.value)}
                    />
                </div>
                <div className='swap-icon' onClick={handleswapcurrencies}>
                    <svg width="35" viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                            fill="#fff" />
                    </svg>
                </div>
                <div className="form-section">
                    <label htmlFor="form-currency">To</label>
                    <CurrencySelect
                        selectedCurrency={toCurrency}
                        handleCurrency={e => settoCurrency(e.target.value)}
                    />
                </div>
            </div>
            <button type="submit" className={`${isloading ? "loading" : ""} submit-button`}>Get Exchange Rate</button>
            <p className='exchange-rate-result'>
                {/*Dispaly the conversion result*/}
                {isloading? "Getting Exchange Rates...": result}
            </p>
        </form>
    )
}

export default CurrencyForm
