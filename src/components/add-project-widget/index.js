import React, { useState, useEffect } from 'react';
import { setProjectTemplate, projectTemplate, getProjectNumber, clearTemplates, updateProjectFinance } from '../../Store/Middlewares/middlewares'
import { connect } from 'react-redux';
function AddProjectWidget(props) {
    const [startDateDisplay, setStartDateDisplay] = useState('');
    const [endDateDisplay, setEndDateDisplay] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [dateRange, setDateRange] = useState([]);
    const [forecastBreakdown, setForecastBreakdown] = useState([])

    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    const [projectNumber, setProjectNumber] = useState('');
    const [projectName, setProjectName] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [forecastHours, setForecastHours] = useState('');
    const [projectServices, setProjectServices] = useState('');
    const [contingency, setContingency] = useState('');
    const [timeMaterials, setTimeMaterials] = useState(false);
    const [fixedPrice, setFixedPrice] = useState(false);


    function selectStartData(e) {

        const { value } = e.target


        setStartDate(value)
        const filteredDate = new Date(value)
        const getDate = filteredDate.getDate();
        const getMonth = months[filteredDate.getMonth()];
        const getYear = filteredDate.getFullYear();
        const selectedDate = getDate + '-' + getMonth + '-' + getYear
        setStartDateDisplay(selectedDate)
    }

    function selectEndData(e) {

        // setForecastBreakdown([])

        const { value } = e.target

        setEndDate(value)
        const filteredDate = new Date(value)

        const getDate = filteredDate.getDate();
        const getMonth = months[filteredDate.getMonth()];
        const getYear = filteredDate.getFullYear();
        const selectedDate = getDate + '-' + getMonth + '-' + getYear
        setEndDateDisplay(selectedDate)

        // forecast burndown set dates ranges
        let sample = getRangeDates(new Date(startDate), new Date(value));
        console.log('sample', sample)
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
                const displayMonth = months[month]
                console.log('getMonths', getMonths)
                console.log('dateRange', forecastBreakdown)
                // console.log(!dateRange.includes({ year, displayMonth }))
                // console.log(forecastBreakdown.indexOf({ year, displayMonth }))
                if (!forecastBreakdown.some(e => ((e.year === year) && (e.displayMonth === displayMonth)))) {
                    getMonths.push({ year: year, displayMonth, financial: undefined, effort: undefined, month })
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
    const saveProjectDetails = () => {

        const project = {
            number: projectNumber,
            name: projectName,
            description: [{ update: projectDesc, date: startDateDisplay }],
            forecastHours,
            projectServices,
            contingency,
            timeMaterials,
            fixedPrice,
            startDateDisplay,
            endDateDisplay,
            forecastBreakdown,
            forecastBurndownRange: dateRange,
            startDate,
            endDate,
            projectState: 'new',
            scheduleStatus: 'on track',
            scopeStatus: 'on track',
            budgetStatus: 'on track',
            effortSpent: 0
        }

        if ((
            projectNumber === '' ||
            projectName === '' ||
            projectDesc === '' ||
            forecastHours === '' ||
            projectServices === '' ||
            contingency === '' ||
            startDateDisplay === '' ||
            endDateDisplay === '' ||
            forecastBreakdown.length === 0 ||
            startDate === '' ||
            endDate === ''
        )
            ||
            (
                timeMaterials === false &&
                fixedPrice === false
            )

        ) {
            alert('You must fill all requirements!')
        } else {
            props.setProjectTemplateAction(project)
            props.getProps.history.push({
                pathname: '/home/add-new-project/add-bucket',
                state: 'add new bucket'
            })
        }

    }
    const editFinance = () => {
        const project = {
            name: projectName,
            forecastHours,
            projectServices,
            contingency,
            timeMaterials,
            fixedPrice,
            startDateDisplay,
            endDateDisplay,
            forecastBreakdown,
            forecastBurndownRange: dateRange,
            startDate,
            endDate,
        }
        props.updateProjectFinanceAction(props.selectedProjectKey, project)
    }
    const cancel = () => {
        props.clearTemplatesAction();
        props.getProps.history.push({
            pathname: '/home/projects/project-list',
            state: 'project list'
        })
    }
    useEffect(() => {
        props.getProjectNumberAction()
        let {
            name,
            number,
            description,
            forecastHours,
            projectServices,
            contingency,
            timeMaterials,
            fixedPrice,
            startDateDisplay,
            endDateDisplay,
            forecastBreakdown,
            forecastBurndownRange,
            startDate,
            endDate
        } = projectTemplate
        let num = 1;
        let code = 'PRO';
        let singleZero = '0';
        let doubleZero = '00';
        let proNum = code + doubleZero + num;
        if (props.editFinance === false) {
            setProjectNumber(props.PROnumber || 'loading...')
        } else {
            setProjectNumber(number)

        }

        // set template values back to field while routing change
        console.log('description', description)
        if (description !== undefined && description?.length !== 0) {
            let lastIndex = description.length - 1;
            let desc = description[lastIndex];
            setProjectDesc(desc?.update)
        } else {
            setProjectDesc('')

        }
        setProjectName(name || '')
        setForecastHours(forecastHours || '')
        setProjectServices(projectServices || '')
        setContingency(contingency || '')
        setTimeMaterials(timeMaterials || false)
        setFixedPrice(fixedPrice || false)
        setStartDateDisplay(startDateDisplay || '')
        setEndDateDisplay(endDateDisplay || '')
        setForecastBreakdown(forecastBreakdown?.length > 0 ? forecastBreakdown : [])
        if (forecastBurndownRange !== undefined && forecastBurndownRange[0] === 'empty') {
            forecastBurndownRange = []
        }
        setDateRange(forecastBurndownRange?.length > 0 ? forecastBurndownRange : [])
        setStartDate(startDate || '')
        setEndDate(endDate || '')
        console.log('forecastBreakdown', startDate)

    }, [props]);
    return (
        <div className="add-project-widget-container">
            <div className="add-project-widget-container_row">
                <div className="project-widget_col width-60">

                    {/* project info start */}

                    <div className="project-info">

                        <div className="field-row">
                            <div className="field-row--label"> <span>project number</span></div>
                            <div className="field-row--input small">  <input type="text" value={projectNumber} readOnly /></div>
                        </div>

                        <div className="field-row">
                            <div className="field-row--label">  <span>project name</span></div>
                            <div className="field-row--input"> <input type="text" value={projectName} onChange={e => setProjectName(e.target.value)} /></div>
                        </div>
                        {
                            props.editFinance === false ?
                                <div className="field-row description">
                                    <div className="field-row--label">  <span>description</span></div>
                                    <div className="field-row--input"> <textarea type="text" value={projectDesc} onChange={e => setProjectDesc(e.target.value)} /></div>
                                </div>
                                : null
                        }

                        <div className="field-row">
                            <div className="field-row--label"><span>forecast hours</span></div>
                            <div className="field-row--input small"> <input type="number" value={forecastHours} onChange={e => setForecastHours(e.target.value)} /></div>
                        </div>
                    </div>

                    {/* project info end */}

                    {/* project budget start */}

                    <div className="project-budget">

                        <div className="project-budget_col">
                            <p className="project-budget_col--heading">project budget</p>
                            <div className="field-row">
                                <div className="field-row--label"> <span>project services</span></div>
                                <div className="field-row--input small"> <span className="field-row--input_currency">$</span> <input type="number" style={{ padding: '0 14px' }} value={projectServices} onChange={e => setProjectServices(e.target.value)} /></div>
                            </div>

                            <div className="field-row">
                                <div className="field-row--label"> <span>contingency</span></div>
                                <div className="field-row--input small"> <span className="field-row--input_currency">$</span> <input type="number" style={{ padding: '0 14px' }} value={contingency} onChange={e => setContingency(e.target.value)} /></div>
                            </div>
                        </div>

                        <div className="project-budget_col">
                            <p className="project-budget_col--heading">project type</p>

                            <div className="field-row">
                                <div className="field-row--label"> <span>time & materials</span></div>
                                <div className="field-row--input small">  <input type="radio" value={timeMaterials} checked={timeMaterials === true} onChange={e => { setTimeMaterials(true); setFixedPrice(false) }} /> </div>
                            </div>

                            <div className="field-row">
                                <div className="field-row--label"> <span>fixed price</span></div>
                                <div className="field-row--input small">  <input type="radio" value={fixedPrice} checked={fixedPrice === true} onChange={e => { setFixedPrice(true); setTimeMaterials(false) }} /></div>
                            </div>
                        </div>


                    </div>

                    {/* project budget end */}

                </div>

                <div className="project-widget_col width-40">

                    {/* project schedule starts */}
                    <div className="project-schedule">
                        <p className="project-schedule_heading">project schedule</p>

                        <div className="field-row">
                            <div className="field-row--label"> <span>start date</span></div>
                            <div className="field-row--input small date-picker-row" > <div className="display-date">{startDateDisplay}</div> <input className="date-picker" value={startDate} type="date" onChange={selectStartData} /> </div>
                        </div>

                        <div className="field-row">
                            <div className="field-row--label"> <span>end date</span></div>
                            <div className="field-row--input small date-picker-row"> <div className="display-date">{endDateDisplay}</div> <input className="date-picker" value={endDate} type="date" onChange={selectEndData} /> </div>
                        </div>
                    </div>

                    {/* project schedule end */}


                    {/* forecast breakdown start */}
                    {
                        forecastBreakdown.length > 0 ?
                            <div className="forecast-burndown">
                                <p className="forecast-burndown_heading">forecast burndown</p>
                                <div className="forecast-burndown_row">
                                    <div className="forecast-burndown_row--col-1" >
                                        <div style={{ display: 'flex', margin: '10px 0' }}>
                                            <div className="forecast-burndown_date">
                                                <span></span>
                                            </div>

                                            <div className="forecast-burndown_date" style={{ justifyContent: 'center' }}>
                                                <span>Financial</span>
                                            </div>

                                            <div className="forecast-burndown_date" style={{ justifyContent: 'center' }}>
                                                <span>Effort</span>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="forecast-burndown_row--col-2">

                                    </div>

                                </div>

                                <div className="forecast-burndown_row">
                                    <div className="forecast-burndown_row--col-1" >
                                        {
                                            forecastBreakdown.length > 0 ?
                                                forecastBreakdown.map((item, index) => {
                                                    return (
                                                        <div key={index} style={{ display: 'flex', margin: '10px 0' }}>
                                                            <div className="forecast-burndown_date">
                                                                <span>{item.displayMonth} {item.year}</span>
                                                            </div>

                                                            <div className="forecast-burndown_field">
                                                                <input type="number" defaultValue={item.financial} onChange={e => item.financial = e.target.value} />
                                                            </div>

                                                            <div className="forecast-burndown_field">
                                                                <input type="number" defaultValue={item.effort} onChange={e => item.effort = e.target.value} />
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
                    <button className="widget-footer_actions--btn" onClick={() => cancel()}>Cancel</button>
                    {
                        props.editFinance === false ?
                            <button className="widget-footer_actions--btn" onClick={() => saveProjectDetails()}> Next</button>
                            :
                            <button className="widget-footer_actions--btn" onClick={() => editFinance()}> Submit</button>

                    }

                </div>
            </div>

        </div >
    );
}

function mapStateToProps(state) {
    console.log('Redux State - add project widget', state.root.project_number)
    return {
        PROnumber: state.root.project_number?.projectNumber,
        selectedProjectKey: state.root.selected_project?.key,
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        setProjectTemplateAction: (project) => { dispatch(setProjectTemplate(project)) },

        getProjectNumberAction: () => { dispatch(getProjectNumber()) },
        clearTemplatesAction: () => { dispatch(clearTemplates()) },
        updateProjectFinanceAction: (selectedProjectKey, project) => { dispatch(updateProjectFinance(selectedProjectKey, project)) }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(AddProjectWidget);

