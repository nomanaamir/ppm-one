import React, { useState, useEffect } from 'react';

function AddProjectWidget(props) {
    const [startDateDisplay, setStartDateDisplay] = useState('');
    const [endDateDisplay, setEndDateDisplay] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [dateRange, setDateRange] = useState([]);
    const [forecastBreakdown, setForecastBreakdown] = useState([])

    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    function selectStartData(e) {

        const { value } = e.target


        const filteredDate = new Date(value)
        setStartDate(filteredDate)
        const getDate = filteredDate.getDate();
        const getMonth = months[filteredDate.getMonth()];
        const getYear = filteredDate.getFullYear();
        const selectedDate = getDate + '-' + getMonth + '-' + getYear
        setStartDateDisplay(selectedDate)
    }

    function selectEndData(e) {

        // setForecastBreakdown([])

        const { value } = e.target

        const filteredDate = new Date(value)
        setEndDate(filteredDate)

        const getDate = filteredDate.getDate();
        const getMonth = months[filteredDate.getMonth()];
        const getYear = filteredDate.getFullYear();
        const selectedDate = getDate + '-' + getMonth + '-' + getYear
        setEndDateDisplay(selectedDate)

        // forecast burndown set dates ranges
        let sample = getRangeDates(startDate, new Date(value));
        let duplicateSample = sample; // duplicate array to prevent changes to original array
        let populateFirstMonth = {};
        if (forecastBreakdown.length === 0) {
            populateFirstMonth = duplicateSample.shift(); // populate first month from range dates array
        }

        setDateRange(sample)
        console.log(dateRange);
        console.log('populateFirstMonth', populateFirstMonth)

        // by default populate first month
        if (forecastBreakdown.length === 0) {
            setForecastBreakdown(forecastBreakdown => [...forecastBreakdown, populateFirstMonth]);
        }
    }
    const getRangeDates = (fromDate, toDate) => {

        const fromYear = fromDate.getFullYear();
        const fromMonth = fromDate.getMonth();
        const toYear = toDate.getFullYear();
        const toMonth = toDate.getMonth();
        const getMonths = [];
        for (let year = fromYear; year <= toYear; year++) {
            let month = year === fromYear ? fromMonth : 0;
            const monthLimit = year === toYear ? toMonth : 11;
            for (; month <= monthLimit; month++) {
                const manth = months[month]
                console.log('getMonths', getMonths)
                console.log('dateRange', forecastBreakdown)
                // console.log(!dateRange.includes({ year, manth }))
                // console.log(forecastBreakdown.indexOf({ year, manth }))
                if (!forecastBreakdown.some(e => ((e.year === year) && (e.manth === manth)))) {
                    getMonths.push({ year: year, manth })
                }
            }
        }
        return getMonths;


    }

    const addForecast = () => {
        let sample = dateRange
        let duplicateSample = sample;
        const populateFirstMonth = duplicateSample.shift();
        setDateRange(sample)
        console.log(dateRange);
        console.log('populateFirstMonth', populateFirstMonth)
        setForecastBreakdown(forecastBreakdown => [...forecastBreakdown, populateFirstMonth]);


    }
    return (
        <div className="add-project-widget-container">
            <div className="add-project-widget-container_row">
                <div className="project-widget_col width-60">

                    {/* project info start */}

                    <div className="project-info">

                        <div className="field-row">
                            <div className="field-row--label"> <span>project number</span></div>
                            <div className="field-row--input small">  <input type="text" readOnly /></div>
                        </div>

                        <div className="field-row">
                            <div className="field-row--label">  <span>project name</span></div>
                            <div className="field-row--input"> <input type="text" /></div>
                        </div>

                        <div className="field-row description">
                            <div className="field-row--label">  <span>description</span></div>
                            <div className="field-row--input"> <textarea type="text" /></div>
                        </div>

                        <div className="field-row">
                            <div className="field-row--label"><span>forecast hours</span></div>
                            <div className="field-row--input small"> <input type="text" /></div>
                        </div>
                    </div>

                    {/* project info end */}

                    {/* project budget start */}

                    <div className="project-budget">

                        <div className="project-budget_col">
                            <p className="project-budget_col--heading">project budget</p>
                            <div className="field-row">
                                <div className="field-row--label"> <span>project services</span></div>
                                <div className="field-row--input small">  <input type="text" readOnly /></div>
                            </div>

                            <div className="field-row">
                                <div className="field-row--label"> <span>contingency</span></div>
                                <div className="field-row--input small">  <input type="text" readOnly /></div>
                            </div>
                        </div>

                        <div className="project-budget_col">
                            <p className="project-budget_col--heading">project type</p>

                            <div className="field-row">
                                <div className="field-row--label"> <span>time & materials</span></div>
                                <div className="field-row--input small">  <input type="radio" /> </div>
                            </div>

                            <div className="field-row">
                                <div className="field-row--label"> <span>fixed price</span></div>
                                <div className="field-row--input small">  <input type="radio" /></div>
                            </div>
                        </div>


                    </div>

                    {/* project budget end */}

                </div>

                <div className="project-widget_col width-40">

                    {/* project schedule starts */}
                    <div className="project-schedule">
                        <p className="project-schedule_heading">project type</p>

                        <div className="field-row">
                            <div className="field-row--label"> <span>start date</span></div>
                            <div className="field-row--input small date-picker-row" > <div className="display-date">{startDateDisplay}</div> <input className="date-picker" type="date" onChange={selectStartData} /> </div>
                        </div>

                        <div className="field-row">
                            <div className="field-row--label"> <span>end date</span></div>
                            <div className="field-row--input small date-picker-row"> <div className="display-date">{endDateDisplay}</div> <input className="date-picker" type="date" onChange={selectEndData} /> </div>
                        </div>
                    </div>

                    {/* project schedule end */}


                    {/* forecast breakdown start */}
                    {
                        forecastBreakdown.length > 0 ?
                            <div className="forecast-burndown">
                                <p className="forecast-burndown_heading">project type</p>

                                <div className="forecast-burndown_row">
                                    <div className="forecast-burndown_row--col-1" >
                                        {
                                            forecastBreakdown.length > 0 ?
                                                forecastBreakdown.map((item, index) => {
                                                    return (
                                                        <div key={index} style={{ display: 'flex', margin: '10px 0' }}>
                                                            <div className="forecast-burndown_date">
                                                                <span>{item.manth} {item.year}</span>
                                                            </div>

                                                            <div className="forecast-burndown_field">
                                                                <input type="text" />
                                                            </div>

                                                            <div className="forecast-burndown_field">
                                                                <input type="text" />
                                                            </div>

                                                        </div>

                                                    )
                                                })
                                                : null
                                        }
                                    </div>

                                    <div className="forecast-burndown_row--col-2">
                                        <button onClick={addForecast} disabled={dateRange.length === 0}>Add</button>
                                    </div>

                                </div>
                            </div>
                            :
                            null
                    }
                    {/* forecast breakdown end */}
                </div>

            </div>
            <div className="widget-footer">
                <div className="widget-footer_actions">
                    <button className="widget-footer_actions--btn">Cancel</button>

                    <button className="widget-footer_actions--btn" onClick={() => props.getProps.history.push({
                        pathname: '/home/add-new-project/add-bucket',
                        state: 'add new bucket'
                    })}> Next</button>

                </div>
            </div>

        </div>
    );
}


export default AddProjectWidget;

