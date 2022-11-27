import React from "react"

class MustConnect extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="RedirectHome">
                <h1>You must connect your wallet in order to see this page.</h1>
                <a href="/">
                    <input type="button" value="Home" />
                </a>

            </div>
        );
    }
}

export default MustConnect;