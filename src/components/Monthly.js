import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';

export default class Monthly extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prevMonthData: '',
            error: false,
            noResult: ''
        }
    }

    componentDidMount() {
        if (this.props.term) {
            this.fetchData();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.term !== this.props.term) {
            this.fetchData();
        }
    }


    fetchData = () => {
        const url = `https://www.worldtradingdata.com/api/v1/history?symbol=${this.props.term}&date_from=${this.props.fromDate}&date_to=${this.props.toDate}&api_token=${this.props.apikey}&sort=newest`;

        fetch(url).then((resp) => {
            return resp.json()
        }).then((res) => {
            if (res.history) {
                console.log(res)
                this.setState({
                    prevMonthData: res,
                    noResult: ''
                })
            } else {
                this.setState({
                    noResult: res.Message,
                    prevMonthData: ''
                })
            }
        }).catch((err) => {
            console.log(err)
            this.setState({
                error: true
            })
        })
    }

    calcMonthlyData = () => {
        let dates = Object.keys(this.state.prevMonthData.history);
        let series = dates.map((date) => {
            return Number(this.state.prevMonthData.history[date].close);
        })
        return {
            title: {
                text: 'Monthly Data'
            },
            xAxis: {
                categories: dates
            },
            series: [{
                data: series,
            }]
        }
    }

    render() {
        if (!this.props.term) {
            return <div className="text-danger">Enter Some Keyword</div>;
        }
        return (
            <div>
                <div className="tab-pane" role="tabpanel" aria-labelledby="pills-contact-tab">
                    {this.state.prevMonthData ?
                        <ReactHighcharts config={this.calcMonthlyData()}></ReactHighcharts> :
                        <div className="text-danger">{this.state.noResult}</div>
                    }
                </div>
            </div>
        )
    }
} 