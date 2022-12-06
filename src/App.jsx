import React, { useState } from "react"
import logo from "./logo.svg"

function App() {

    const [tipData, setTipData] = useState({
        bill: 0,
        tipPercentage: 0.01,
        noOfPeople: 0,
        tipAmount: 0.0,
        total: 0.0,
    })

    function handleInput(event, percentage = 0.01) {
        if(event) event.preventDefault()

        if (event) {
            const { name, value } = event.target
            setTipData((prevTipData) => {
                if (value) {
                    return {
                        ...prevTipData,
                        [name]: name === "bill" ? parseFloat(value) : parseInt(value)
                    }
                }
                return prevTipData
            })
        }

        if (percentage !== 0.01) {
            setTipData((prevTipData) => {
                return {
                    ...prevTipData,
                    tipPercentage: percentage,
                }
            })

            setTipData((prevTipData) => {
                return {
                    ...prevTipData,
                    tipAmount: prevTipData.bill * percentage,
                }
            })
        }

        if (event && event.target.name === "noOfPeople") {
            setTipData((prevTipData) => {
                return {
                    ...prevTipData,
                    total: prevTipData.noOfPeople * prevTipData.tipAmount,
                }
            })
        }
    }

    function handleReset(event) {
        event.preventDefault()
        setTipData({
            bill: 0,
            tipPercentage: 0.01,
            noOfPeople: 0,
            tipAmount: 0.0,
            total: 0.0,
        })
    }

    return (
        <div className="container">
            <img src={logo} alt="Logo" className="logo" />
            <div className="box">
                <div className="form">
                    <div className="form-item">
                        <label htmlFor="bill">Bill</label>
                        <input 
                            type="number" 
                            id="bill" 
                            name="bill" 
                            value={tipData.bill} 
                            onChange={(event) => handleInput(event)}
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="tip">Select Tip %</label>
                        <div className="tip--percentage">
                            <button 
                                className={`tip--perc ${tipData.tipPercentage === 0.05 ? "tip--active" : ""}`}
                                onClick={() => handleInput(undefined, 0.05)}
                            >
                                5%
                            </button>
                            <button 
                                className={`tip--perc ${tipData.tipPercentage === 0.1 ? "tip--active" : ""}`}
                                onClick={() => handleInput(undefined, 0.1)}
                            >
                                10%
                            </button>
                            <button 
                                className={`tip--perc ${tipData.tipPercentage === 0.15 ? "tip--active" : ""}`}
                                onClick={() => handleInput(undefined, 0.15)}
                            >
                                15%
                            </button>
                            <button 
                                className={`tip--perc ${tipData.tipPercentage === 0.25 ? "tip--active" : ""}`}
                                onClick={() => handleInput(undefined, 0.25)}
                            >
                                25%
                            </button>
                            <button 
                                className={`tip--perc ${tipData.tipPercentage === 0.5 ? "tip--active" : ""}`}
                                onClick={() => handleInput(undefined, 0.5)}
                            >
                                50%
                            </button>
                            <button 
                                className="tip--custom"
                            >
                                Custom
                            </button>
                        </div>
                    </div>

                    <div className="form-item">
                        <label htmlFor="noOfPeople">Number of People</label>
                        <input 
                            type="number" 
                            id="people" 
                            name="noOfPeople" 
                            value={tipData.noOfPeople} 
                            onChange={(event) => handleInput(event)}
                        />
                    </div>
                </div>
                <div className="result">
                    <div className="amount">
                        <div className="sub">
                            Tip Amount <br /> <p>/ person</p>
                        </div>
                        <div className="currency">
                            ${tipData.tipAmount.toFixed(2)}
                        </div>
                    </div>
                    <div className="amount">
                        <div className="sub">
                            Total <br /> <p>/ person</p>
                        </div>
                        <div className="currency">
                            ${tipData.total.toFixed(2)}
                        </div>
                    </div>
                    <button 
                        className="tip--reset" 
                        disabled={tipData.noOfPeople === 0}
                        onClick={(event) => handleReset(event)}
                    >
                        RESET
                    </button>
                </div>
            </div>
        </div>
    )
}

export default App
