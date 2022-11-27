import React from "react"

export default function MustConnect() {
    return (
        <div className="RedirectHome">
            <h1>You must connect your wallet in order to see this page.</h1>
            <a href="/">
                <input type="button" value="Home" />
            </a>

        </div>
    );

}