import React from "react"

class MyOffers extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="RedirectAddOffer">
                <h1>It seems like you don't have any offers placed at the moment. Would you like to place one?</h1>
                <a href="/addoffer">
                    <input type="button" value="AddOffer" />
                </a>

            </div>
        )
    }
}

export default MyOffers; 