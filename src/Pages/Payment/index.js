import React, { useState, useEffect, useRef } from 'react';

function App() {
    const [paid, setPaid] = useState(false);
    const [loaded, setLoaded] = useState(false);

    let paypalRef = useRef();

    const product = {
        price: 15.70,
        description: "Curso React",
    }

    useEffect(() => {
        const script = document.createElement("script");
        const id = "AVdtTwFxq1BzMjehMn3aDRXrkFYO710fT-fyP3WBG0RRF0ZXJXCg92XVgtOvU4GUab0q06E-_STr0hKH"
        script.src = `https://www.paypal.com/sdk/js?currency=BRL&client-id=${id}`

        script.addEventListener("load", () => setLoaded(true));

        document.body.appendChield(script);

        if(loaded) {
            function loadButtonsAndLogicAboutPayment() {
                setTimeout(() => {
                    window.paypal
                    .Buttons({
                        createOrder: (data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        description: product.description,
                                        amlunt: {
                                            currency_code: "BRL",
                                            value: product.price
                                        }
                                    }
                                ]
                            }),
                        },
                        onApprove: async (_,actions) => {
                            const order = await actions.order.capture();

                            setPaid(true);

                            console.log(order);
                        }
                    })
                })
            }
        }
    })

    return (
        <div className='App'>
            <h1>Hello World</h1>
        </div>
    )
}