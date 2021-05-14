import React, {useState, useEffect} from 'react';
// import {Link, Redirect} from 'react-router-dom';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const Budget = props => {
    const [needs, setNeeds] = useState({totalNeeds:0});
    const [wants, setWants] = useState({totalWants:0});
    const [savings, setSavings] = useState({totalSavings:0});
    const [budgets, setBudgets] = useState([]);
    const [budgetForm, setBudgetForm] = useState({
        name:"",
        wages:0,
        rent:0,
        property_tax:0,
        rent_insurance:0,
        water:0,
        electric:0,
        natural_gas:0,
        trash:0,
        groceries:0,
        car_payment:0,
        gas:0,
        phone:0,
        internet:0,
        other_needs:0,
        clothing:0,
        fast_food:0,
        alcohol:0,
        entertainment:0,
        travel:0,
        decor:0,
        other_wants:0,
        savings_amount:0,
        investments:0,
        emergency:0,
        credit_card:0,
        other_savings:0,
        username:"",
    });

    const [errors, setErrors] = useState({
        name:"",
        wages:"",
    });
    
    useEffect(() => {
        setNeeds({
            totalNeeds: Number(budgetForm.rent) + Number(budgetForm.property_tax) + Number(budgetForm.rent_insurance) + Number(budgetForm.water) + Number(budgetForm.electric) + Number(budgetForm.natural_gas) + Number(budgetForm.trash) + Number(budgetForm.groceries) + Number(budgetForm.car_payment) + Number(budgetForm.gas) + Number(budgetForm.phone) + Number(budgetForm.internet) + Number(budgetForm.other_needs)
        })
        setWants({
            totalWants: Number(budgetForm.clothing) + Number(budgetForm.fast_food) + Number(budgetForm.alcohol) + Number(budgetForm.entertainment) + Number(budgetForm.travel) + Number(budgetForm.decor) + Number(budgetForm.other_wants)
        })
        setSavings({
            totalSavings: Number(budgetForm.savings_amount) + Number(budgetForm.investments) + Number(budgetForm.emergency) + Number(budgetForm.credit_card) + Number(budgetForm.other_savings)
        })
    }, [budgetForm])

    useEffect(() => {
        const token = localStorage.getItem('token');
        Axios({
            method: 'get',
            url: 'http://localhost:8000/api/budget/list/',
            withCredentials: false,
            crossdomain: true,
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            if(res.data){
                setBudgets(res.data);
                // console.log(budgets);
            }
        })
        .catch(err => console.log(err))
    }, [])

    const handleInput = e => {
        setBudgetForm({
            ...budgetForm,
            [e.target.name]:e.target.value
        })
    }

    const handleLogout = () => {
        const token = localStorage.getItem('token');
        console.log(token);
        Axios({
            method: 'get',
            url: 'http://localhost:8000/api/logout/',
            withCredentials: false,
            crossdomain: true,
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            if (res) {
                console.log(res);
                localStorage.clear();
                window.location = "/";
            }
        })
    }

    const handleBudget = e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        Axios({
            method: 'post',
            url: 'http://localhost:8000/api/budget/',
            withCredentials: false,
            crossdomain: true,
            data: budgetForm,
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            if (res.data) {
                window.location = "/home";
            } else {
                setErrors(res.data);
            }
        })
    }

    const delBudget = (id) => {
        const token = localStorage.getItem('token');
        Axios({
            method: 'delete',
            url: `http://localhost:8000/api/budget/delete/${id}`,
            withCredentials: false,
            crossdomain: true,
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            if (res) {
                console.log(res)
                console.log("Successful Delete!")
                window.location = "/home";
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="row mx-auto">
            <div className="col">
                <div className="row">
                    {/* <div className="col">
                        <h1>Welcome, {}</h1>
                    </div> */}
                    <div className="col">
                        <button className="btn btn-secondary mt-2" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 mx-auto" style={{border: "1px solid black"}}>
                        <form onSubmit={handleBudget}>
                            <div className="row">
                                <div className="col">
                                    <h4>Budget App</h4>
                                    <p>Needs should be 50% of income.</p>
                                    <p>Wants should be 30% of income.</p>
                                    <p>Savings should be 20% of income.</p>
                                    <span className="text-danger">{errors.name}</span>
                                    <span className="text-danger">{errors.wages}</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="name" className="form-label">Name:</label>
                                    <input type="text" name="name" onChange={handleInput} className="form-control"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h4>Needs: ${needs.totalNeeds}</h4>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="wages" className="form-label">Wages:</label>
                                    <input type="number" name="wages" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="rent" className="form-label">Rent:</label>
                                    <input type="number" name="rent" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="property_tax" className="form-label">Property Tax:</label>
                                    <input type="number" name="property_tax" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="rent_insurance" className="form-label">Rent Insurance:</label>
                                    <input type="number" name="rent_insurance" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="water" className="form-label">Water:</label>
                                    <input type="number" name="water" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="electric" className="form-label">Electric:</label>
                                    <input type="number" name="electric" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="natural_gas" className="form-label">Natural Gas:</label>
                                    <input type="number" name="natural_gas" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="trash" className="form-label">Trash:</label>
                                    <input type="number" name="trash" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="groceries" className="form-label">Groceries:</label>
                                    <input type="number" name="groceries" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="car_payment" className="form-label">Car Payment:</label>
                                    <input type="number" name="car_payment" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="gas" className="form-label">Gas:</label>
                                    <input type="number" name="gas" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="phone" className="form-label">Phone:</label>
                                    <input type="number" name="phone" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="internet" className="form-label">Internet:</label>
                                    <input type="number" name="internet" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="other_needs" className="form-label">Other Needs:</label>
                                    <input type="number" name="other_needs" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h4>Wants: ${wants.totalWants}</h4>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="clothing" className="form-label">Clothing:</label>
                                    <input type="number" name="clothing" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="fast_food" className="form-label">Fast Food:</label>
                                    <input type="number" name="fast_food" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="alcohol" className="form-label">Alcohol:</label>
                                    <input type="number" name="alcohol" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="entertainment" className="form-label">Entertainment:</label>
                                    <input type="number" name="entertainment" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="travel" className="form-label">Travel:</label>
                                    <input type="number" name="travel" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="decor" className="form-label">Decor:</label>
                                    <input type="number" name="decor" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="other_wants" className="form-label">Other Wants:</label>
                                    <input type="number" name="other_wants" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h4>Savings: ${savings.totalSavings}</h4>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="savings_amount" className="form-label">Savings:</label>
                                    <input type="number" name="savings_amount" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="investments" className="form-label">Investments:</label>
                                    <input type="number" name="investments" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="emergency" className="form-label">Emergency:</label>
                                    <input type="number" name="emergency" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                                <div className="col">
                                    <label htmlFor="credit_card" className="form-label">Credit Cards:</label>
                                    <input type="number" name="credit_card" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col">
                                    <label htmlFor="other_savings" className="form-label">Other Savings:</label>
                                    <input type="number" name="other_savings" onChange={handleInput} min="0" step="0.01" placeholder="$"  className="form-control"/>
                                </div>
                            </div>
                            <div className="row">
                                <button className="btn btn-primary mx-auto m-3" type="submit">Save</button>
                            </div>
                        </form>
                        <div className="row" style={{borderTop: "1px solid black"}}>
                            <div className="col">
                                <h4>Your Totals:</h4>
                                <h5>Needs: ${needs.totalNeeds}</h5>
                                <h5>Wants: ${wants.totalWants}</h5>
                                <h5>Savings: ${savings.totalSavings}</h5>
                            </div>
                            <div className="col">
                                <h4>50/30/20 Comparison:</h4>
                                <h5>Needs: ${Number(budgetForm.wages) * .5}</h5>
                                <h5>Wants: ${Number(budgetForm.wages) * .3}</h5>
                                <h5>Savings: ${Number(budgetForm.wages) * .2}</h5>
                            </div>
                        </div>
                        {
                            budgets ?
                            budgets.map((budget,i) =>   <div key={i} className="row mt-1 mb-1" style={{borderTop: "1px solid black"}}>
                                                            <div className="col">
                                                                <div className="row">
                                                                    <h5 className="col">{budget.name}</h5>
                                                                    <h6 className="col">Author: {budget.username}</h6>
                                                                    <h6 className="col">Wages: ${budget.wages}</h6>
                                                                </div>
                                                                <div className="row">
                                                                    <h5 className="col">Needs: </h5>
                                                                    <p className="col">Rent: ${budget.rent}</p>
                                                                    <p className="col">Property Tax: ${budget.property_tax}</p>
                                                                </div>
                                                                <div className="row">
                                                                    <p className="col">Rent Insurance: ${budget.rent_insurance}</p>
                                                                    <p className="col">Water: ${budget.water}</p>
                                                                    <p className="col">Electric: ${budget.electric}</p>
                                                                </div>
                                                                <div className="row">
                                                                    <p className="col">Natural Gas: ${budget.natural_gas}</p>
                                                                    <p className="col">Trash: ${budget.trash}</p>
                                                                    <p className="col">Groceries: ${budget.groceries}</p>
                                                                </div>
                                                                <div className="row">
                                                                    <p className="col">Car Payment: ${budget.car_payment}</p>
                                                                    <p className="col">Gas: ${budget.gas}</p>
                                                                    <p className="col">Phone: ${budget.phone}</p>
                                                                </div>
                                                                <div className="row">
                                                                    <p className="col-4">Internet: ${budget.internet}</p>
                                                                    <p className="col-4">Other Needs: ${budget.other_needs}</p>
                                                                </div>
                                                                <div className="row">
                                                                    <h5 className="col">Wants: </h5>
                                                                    <p className="col">Clothing: ${budget.clothing}</p>
                                                                    <p className="col">Fast Food: ${budget.fast_food}</p>
                                                                </div>
                                                                <div className="row">
                                                                    <p className="col">Alcohol: ${budget.alcohol}</p>
                                                                    <p className="col">Entertainment: ${budget.entertainment}</p>
                                                                    <p className="col">Travel: ${budget.travel}</p>
                                                                </div>
                                                                <div className="row">
                                                                    <p className="col-4">Decor: ${budget.decor}</p>
                                                                    <p className="col-4">Other Wants: ${budget.other_wants}</p>
                                                                </div>
                                                                <div className="row">
                                                                    <h5 className="col">Savings: </h5>
                                                                    <p className="col">Savings: ${budget.savings_amount}</p>
                                                                    <p className="col">Investments: ${budget.investments}</p>
                                                                </div>
                                                                <div className="row">
                                                                    <p className="col">Emergency: ${budget.emergency}</p>
                                                                    <p className="col">Credit Cards: ${budget.credit_card}</p>
                                                                    <p className="col">Other Savings: ${budget.other_savings}</p>
                                                                </div>
                                                                <div className="row">
                                                                    <button 
                                                                    className="btn btn-primary mx-auto"
                                                                    onClick={() => delBudget(budget.id)}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                            )
                            :   <div className="row mt-1 mb-1" style={{borderTop: "1px solid black"}}>
                                    <h1>No Saved Budgets.</h1>
                                </div>
                        } 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Budget;