import React from "react"

class AddOffer extends React.Component {
    constructor(props) {
        super(props);

        this.state = { price: 0, model: "", until: 0, format: "" };
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleUntilChange = this.handleUntilChange.bind(this);
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlePriceChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleModelChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleUntilChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleFormatChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        /* maybe we can add here this offer to the offers from App.js */
        alert('The following offer was added:\nPrice: ' + this.state.price + '\nModel: ' + this.state.model +
            '\nUntil: ' + this.state.until + '\nFormat: ' + this.state.format);
        event.preventDefault();
    }

    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <label>
                            <p>Enter your price:</p>
                            <input type="text" name="price" value={this.state.price} onChange={this.handlePriceChange} />
                        </label>
                    </fieldset>
                    <fieldset>
                        <label>
                            <p>Choose a car:</p>
                            <select name="model" value={this.state.model} onChange={this.handleModelChange}>
                                <option value="">--Please choose an option--</option>
                                <option value="lambo">Lambo</option>
                                <option value="ferrari">Ferrari</option>
                                <option value="bugatti">Bugatti</option>
                            </select>
                        </label>
                    </fieldset>

                    <div class="container">
                        <div class="form-row">
                            <p>How much time?</p>
                            <div class="col">
                                <input type="text" name="until" class="form-control" placeholder="1"
                                    value={this.state.until} onChange={this.handleUntilChange} />
                            </div>
                            <div class="col">
                                <select name="format" value={this.state.format} onChange={this.handleFormatChange}>
                                    <option value="">--Please choose an option--</option>
                                    <option value="hours">Hours</option>
                                    <option value="days">Days</option>
                                    <option value="weeks">Weeks</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>

        );
    }
}

export default AddOffer;