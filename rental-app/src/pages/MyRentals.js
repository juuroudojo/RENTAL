import React from "react"

class MyRentals extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div className="RedirectOffers">
                <h1>It seems like you didn't apply for rents. Would you like to rent a car? We have some fast ones!</h1>
                <a href="/offers">
                    <input type="button" value="Offers" />
                </a>

            </div>
        )
    }
}

export default MyRentals;