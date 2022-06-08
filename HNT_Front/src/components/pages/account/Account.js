import { useState } from "react";


export default function Account(){
    const [advertise, setAdvertise] = useState(false);
    const [advertiseFocus, setAdvertiseFocus] = useState(false);

    const [ payChoice, setPayChoice ] = useState("manual");
    console.log(payChoice);
    return(
        <>
            <div className="main">
                <h1 className="marketing">My Account</h1>
                <h2>Support Hear N Tell and get rid of ads for: $8.95 for three months.</h2>
                <div className="radioGroup">
                    <input 
                        type="radio" 
                        name="payChoice" 
                        value="manual" 
                        id="manualPayChoice" 
                        checked={ payChoice === "manual"}
                        onChange={ (e)=> setPayChoice(e.target.value) }
                    />
                    <label htmlFor="manualPayChoice">Pay for three months, but don’t put me on automatic payments.</label>
                </div>

                <div className="radioGroup">
                    <input 
                        type="radio" 
                        name="payChoice" 
                        value="auto" 
                        id="autoPayChoice"
                        checked={ payChoice === "auto"}
                        onChange={ (e)=> setPayChoice(e.target.value) }
                    />
                    <label htmlFor="autoPayChoice">Pay for three months and put me on automatic payments.</label>
                </div>

                <div className="radioGroup">
                    <input 
                        id="advertise"
                        type="checkbox" 
                        value={ advertise }
                        // aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="advertise"
                        onFocus= { ()=> setAdvertiseFocus(true) }
                        onBlur={ () => setAdvertiseFocus(false) }
                        onClick={ (e)=> setAdvertise(!advertise) }
                    />
                    <label htmlFor="advertise">
                        I would like to advertise on Hear N Tell
                    </label><br />
                </div>

                <h3>Stripe info goes here</h3>
            </div>


        </>
    )
}