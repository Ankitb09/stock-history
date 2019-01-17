import React, { Component } from 'react';
import Weekly from './Weekly';
import Monthly from './Monthly';
import PastMonths from './PastMonths';

const KEY = 'RegLxT9U70TAqsGMkfzKMPiofDYkgzKX9CgvXvzUsE4pEn9UT6AVvLGVOtm1';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: 'AAPL',
            activeTab: 1
        }
    }

    handleTabs = (e) => {
        let tab = e.target.dataset.toggle
        switch (tab) {
            case "1":
                this.setState({
                    activeTab: 1
                });
                break;
            case "2":
                this.setState({
                    activeTab: 2
                });
                break;
            case "3":
                this.setState({
                    activeTab: 3
                });
                break;
            default:
                return ''
        }
    }

    showTabs = () => {
        let { activeTab, searchTerm } = this.state;

        switch (activeTab) {
            case 1:
                return <Weekly term={searchTerm} apikey={KEY} toDate={this.getDate()} fromDate={this.getDate(0, true)} />
            case 2:
                return <Monthly term={searchTerm} apikey={KEY} toDate={this.getDate()} fromDate={this.getDate(1)} />
            case 3:
                return <PastMonths term={searchTerm} apikey={KEY} toDate={this.getDate()} fromDate={this.getDate(6)} />
            default:
                return ''
        }
    }

    getDate = (previousMonth, previousWeek) => {
        var d = new Date();
        if (previousMonth) {
            d.setMonth(d.getMonth() - previousMonth);
        }
        var dd = d.getDate();
        if (previousWeek) {
            dd = d.getDate() - 7;
        }

        var mm = d.getMonth() + 1;
        var yyyy = d.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        return `${yyyy}-${mm}-${dd}`
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            searchTerm: this.input.value
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h2 className="mt-4">Stock History</h2>
                        <h4 className="mb-5">You can search for stock history using stock symbol</h4>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group row">
                                <div className="col-sm-11">
                                    <input className="form-control" type="text" defaultValue="AAPL" ref={e => this.input = e} />
                                </div>
                                <div className="col-sm-1">
                                    <button type="submit" className="btn btn-success">GO</button>
                                </div>
                            </div>
                        </form>
                        <div className="tab-content-wrap mt-4">
                            <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                    <button onClick={this.handleTabs} className={`btn nav-link ${this.state.activeTab === 1 ? 'active' : ''}`} data-toggle={1}>Last Week</button>
                                </li>
                                <li className="nav-item">
                                    <button onClick={this.handleTabs} className={`btn nav-link ${this.state.activeTab === 2 ? 'active' : ''}`} data-toggle={2}>Last Month</button>
                                </li>
                                <li className="nav-item">
                                    <button onClick={this.handleTabs} className={`btn nav-link ${this.state.activeTab === 3 ? 'active' : ''}`} data-toggle={3}>Last 6 Months</button>
                                </li>
                            </ul>
                            <div className="tab-content">
                                {this.showTabs()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}