import React, { useRef, useEffect } from 'react'

const Paypal = ({amount, setPaymentResult}) => {
    console.log('amount', amount)
    const paypal = useRef()
    useEffect(() => {
        window.paypal?.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            description: "CB-Markt",
                            amount: {
                                currency_code: "EUR",
                                value: amount
                            }
                        }
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                setPaymentResult(order)
                console.log(`Successful order: ${order}`)
            },
            onError: (err) => console.log(err)
        }).render(paypal.current)
    }, [])
    return (
        <div ref={paypal}></div>
    )
}

export default Paypal
