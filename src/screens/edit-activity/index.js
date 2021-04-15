import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateProjectActivity } from '../../Store/Middlewares/middlewares'

// components
// import ProjectInfoBar from '../../components/project-info-bar/index';
import StatusWidget from '../../components/status-widget/index';
import TaskChecklist from '../../components/task-checklist/index'
// import ProjectUpdates from '../../components/project-updates/index'
function EditActivityScreen(props) {
    const [projectNumber, setProjectNumber] = useState('');
    const [projectName, setProjectName] = useState('');
    const [forecastHrs, setForecastHrs] = useState('');
    const [dateWorked, setDateWorked] = useState('');
    const [projectDesc, setProjectDesc] = useState('');
    const [schedule, setSchedule] = useState('');
    const [scope, setScope] = useState('');
    const [projectSt, setProjectSt] = useState('');

    const [budget, setBudget] = useState('');
    const [bucket, setBucket] = useState('');
    const [effort, setEffort] = useState(0);
    const [isUpdateEdit, setIsUpdateEdit] = useState(false)

    const status = [
        {
            name: 'on track'
        },
        {
            name: 'at risk'
        },
        {
            name: 'off track'
        },
    ]
    const projectStates = [
        {
            name: 'new'
        },
        {
            name: 'in progress'
        },
        {
            name: 'on hold'
        },
        {
            name: 'complete'
        }
    ]
    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    const { key, project } = props.selectedProject
    const { name, number, startDateDisplay, endDateDisplay, forecastHours, effortSpent, buckets, projectState, scheduleStatus, scopeStatus, budgetStatus, description } = project


    const selectStatus = (selectedStatus) => {
        if (selectedStatus.name === 'schedule status') {
            setSchedule(selectedStatus.value)
        } else if (selectedStatus.name === 'scope status') {
            setScope(selectedStatus.value)
        } else if (selectedStatus.name === 'budget status') {
            setBudget(selectedStatus.value)
        } else {
            setProjectSt(selectedStatus.value)
        }

        console.log('selectedStatus', selectedStatus)

    }
    const selectCheckList = (bucket) => {

        console.log('bucket', bucket)

    }
    const editProjectActivity = () => {
        let newUpdate = [{ date: dateWorked, update: projectDesc }]
        let updatedDescription = isUpdateEdit === true ? description.concat(newUpdate) : description
    
        // console.log('projectNumber', projectNumber);
        // console.log('projectName', projectName);
        // console.log('forecastHrs', forecastHrs);
        // console.log('projectDesc', isUpdateEdit === true ? description.concat(newUpdate) : description);
        // console.log('schedule', schedule);
        // console.log('scope', scope);
        // console.log('projectSt', projectSt);

        // console.log('budget', budget);
        // console.log('bucket', bucket);
        // console.log('effort', parseFloat(effort));

        const updatedActivity = {
            name: projectName,
            number: projectNumber,
            forecastHours: forecastHrs,
            description: updatedDescription,
            scheduleStatus: schedule,
            scopeStatus: scope,
            projectState: projectSt,
            budgetStatus: budget,
            buckets: bucket,
            effortSpent:  parseFloat(effort)
        }
        props.updateProjectActivityAction(key, updatedActivity)
        setIsUpdateEdit(false)
    }

    function selectDateWorked(e) {

        const { value } = e.target


        const filteredDate = new Date(value)
        const getDate = filteredDate.getDate();
        const getMonth = months[filteredDate.getMonth()];
        const getYear = filteredDate.getFullYear();
        const selectedDate = getDate + '-' + getMonth + '-' + getYear
        setDateWorked(selectedDate)
    }
    useEffect(() => {

        let lastIndex = description.length - 1;
        let desc = description[lastIndex];
        setProjectDesc(desc?.update)
        setDateWorked(desc?.date)
        setProjectNumber(number)
        setProjectName(name)
        setForecastHrs(forecastHours)
        setSchedule(scheduleStatus)
        setScope(scopeStatus)
        setBudget(budgetStatus)
        setBucket(buckets)
        setEffort(effortSpent)
        setProjectSt(projectState)
    }, []);


    return (
        <div className="edit-activity">
            <div className="edit-activity_row">
                <div className="edit-activity_row--col edit-activity_row--col-15">
                    <div className="field-row">
                        <div className="field-row--label"> <span>project number</span></div>
                        <div className="field-row--input">  <input type="text" readOnly value={projectNumber} /></div>
                    </div>

                    <div className="field-row">
                        <div className="field-row--label"> <span>forecast hours</span></div>
                        <div className="field-row--input">  <input type="text" value={forecastHrs} onChange={e => setForecastHrs(e.target.value)} /></div>
                    </div>

                    <div className="field-row">
                        <div className="field-row--label"> <span>remaining hours</span></div>
                        <div className="field-row--input">  <input type="text" readOnly value={effortSpent === 0 ? 0 : parseInt(forecastHours) - effortSpent} /></div>
                    </div>

                    <div className="field-row">
                        <div className="field-row--label"> <span>hours worked</span></div>
                        <div className="field-row--input">  <input type="text" value={effort} onChange={e => setEffort(e.target.value)} /></div>
                    </div>

                </div>

                <div className="edit-activity_row--col edit-activity_row--col-35">
                    <div className="field-row">
                        <div className="field-row--label"> <span>project name</span></div>
                        <div className="field-row--input">  <input type="text" value={projectName} onChange={e => setProjectName(e.target.value)} /></div>
                    </div>

                    <div className="field-row">
                        <div className="field-row--label"> <span>description</span></div>
                        <div className="field-row--input">  <textarea type="text" value={projectDesc} onChange={e => { setProjectDesc(e.target.value); setIsUpdateEdit(true) }} /></div>
                    </div>
                </div>

                <div className="edit-activity_row--col edit-activity_row--col-15">
                    <div className="field-row">
                        <div className="field-row--label"> <span>date worked</span></div>
                        <div className="field-row--input date-picker-row" > <div className="display-date">{dateWorked}</div> <input className="date-picker" type="date" onChange={selectDateWorked} /> </div>
                    </div>
                </div>

                <div className="edit-activity_row--col edit-activity_row--col-35">
                    <p className="project-detail-row--heading" style={{ margin: '10px 0' }}>tasks</p>
                    <TaskChecklist buckets={buckets} onSelectCheckList={selectCheckList} readOnlyFlag={false} />
                </div>
            </div>

            <div className="edit-activity_row">
                <div className="edit-activity_row--col edit-activity_row--col-60">
                    <div className="edit-activity_row--col-60_contain">
                        <p className="project-detail-row--heading">schedule status</p>
                        <StatusWidget name={'schedule status'} data={status} activeValue={scheduleStatus} readOnlyFlag={false} statusSummary={false} onSelectStatus={selectStatus} />
                    </div>
                    <div className="edit-activity_row--col-60_contain">
                        <p className="project-detail-row--heading">scope status</p>
                        <StatusWidget name={'scope status'} data={status} activeValue={scopeStatus} readOnlyFlag={false} statusSummary={false} onSelectStatus={selectStatus} />
                    </div>
                    <div className="edit-activity_row--col-60_contain">
                        <p className="project-detail-row--heading">budget status</p>
                        <StatusWidget name={'budget status'} data={status} activeValue={budgetStatus} readOnlyFlag={false} statusSummary={false} onSelectStatus={selectStatus} />
                    </div>
                </div>

                <div className="edit-activity_row--col edit-activity_row--col-40">
                    <div className="edit-activity_row--col-40_contain">
                        <p className="project-detail-row--heading">project state</p>
                        <StatusWidget name={'project state'} data={projectStates} activeValue={projectState} readOnlyFlag={false} statusSummary={false} onSelectStatus={selectStatus} />
                    </div>
                </div>
            </div>

            <div className="widget-footer">
                <div className="widget-footer_actions">

                    <button className="widget-footer_actions--btn"> Cancel</button>

                    <button className="widget-footer_actions--btn" onClick={() => editProjectActivity()}>Submit</button>

                </div>
            </div>

        </div>
    );
}

function mapStateToProps(state) {
    // console.log('state.root.selected_project', state.root.selected_project)
    return {
        selectedProject: state.root.selected_project,
    }
}
function mapDispatchToProps(dispatch) {
    return ({

        updateProjectActivityAction: (key, updatedActivity) => { dispatch(updateProjectActivity(key, updatedActivity)) }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(EditActivityScreen);

