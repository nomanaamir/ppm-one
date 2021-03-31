import React, { useState, useEffect } from 'react';

function AddProjectWidget() {
    const [startDate, setStartDate] = useState('');
    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    function selectStartData(e) {
        const { value } = e.target

        const filteredDate = new Date(value)
        const getDate = filteredDate.getDate();
        const getMonth = months[filteredDate.getMonth()];
        const getYear = filteredDate.getFullYear();
        const selectedDate = getDate + '-' + getMonth + '-' + getYear
        console.log('startDATE', selectedDate)
        setStartDate(selectedDate)
    }

    return (
        <div className="add-project-widget-container">
            <div className="add-project-widget-container_row">
                <div className="project-widget_col">
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
                </div>

                <div className="project-schedule">
                    <p className="project-schedule_heading">project type</p>

                    <div className="field-row">
                        <div className="field-row--label"> <span>start date</span></div>
                        <div className="field-row--input small">  <input className="date-picker" type="date" value={startDate} onChange={selectStartData} /> </div>
                    </div>

                    <div className="field-row">
                        <div className="field-row--label"> <span>end date</span></div>
                        <div className="field-row--input small">  <input className="date-picker" type="date" /> </div>
                    </div>
                </div>

            </div>
            <div className="widget-footer">
                <div className="widget-footer_actions">
                    <button className="widget-footer_actions--btn">Cancel</button>

                    <button className="widget-footer_actions--btn" > Next</button>

                </div>
            </div>

        </div>
    );
}


export default AddProjectWidget;

