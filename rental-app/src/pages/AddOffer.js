import React from "react"

export default function AddOffer() {
    return (
        <div className="form-container">
            <form>
                <fieldset>
                    <label>
                        <p>Enter your price:</p>
                        <input type="text" name="price" />
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        <p>Choose a car:</p>
                        <select name="car">
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
                            <input type="text" class="form-control" placeholder="1" />
                        </div>
                        <div class="col">
                            <select name="time">
                                <option value="">--Please choose an option--</option>
                                <option value="hours">Hours</option>
                                <option value="days">Days</option>
                                <option value="weeks">Weeks</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>

    )
}