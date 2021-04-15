import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// components
import ProjectInfoBar from '../../components/project-info-bar/index';
import StatusWidget from '../../components/status-widget/index';
import TaskChecklist from '../../components/task-checklist/index'
import ProjectUpdates from '../../components/project-updates/index'
function ProjectDetailScreen(props) {
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
    let summary = [
        // {
        //     name: 'overall',
        //     value: 'at risk',
        //     color: 'warning'
        // },
        // {
        //     name: 'schedule',
        //     value: 'at risk',
        //     color: 'warning'
        // },
        // {
        //     name: 'scope',
        //     value: 'on track',
        //     color: 'success'
        // },
        // {
        //     name: 'budget',
        //     value: 'at risk',
        //     color: 'warning'

        // },
    ]

    const { key, project } = props.selectedProject
    const { name, startDateDisplay, endDateDisplay, forecastHours, effortSpent, buckets, projectState, scheduleStatus, scopeStatus, budgetStatus, description } = project
    summary = [
        {
            name: 'overall',
            value: ''
        },
        {
            name: 'schedule',
            value: scheduleStatus
        },
        {
            name: 'scope',
            value: scopeStatus
        },
        {
            name: 'budget',
            value: budgetStatus
        }
    ]
    const onTrack = summary.filter(item => {
        return item.value === 'on track'
    })
    const atRisk = summary.filter(item => {
        return item.value === 'at risk'
    })
    const offTrack = summary.filter(item => {
        return item.value === 'off track'
    })
    if (onTrack.length >= 2) {
        summary.forEach(item => {
            if (item.name === 'overall') {
                item.value = 'on track'
            }
        })
        // summary = Object.assign({}, summary, { name: 'overall', value: 'on track' })
    } else if (atRisk.length >= 2) {
        summary.forEach(item => {
            if (item.name === 'overall') {
                item.value = 'at risk'
            }
        })
        // summary = Object.assign({}, summary, { name: 'overall', value: 'at risk' })
    } else if (offTrack.length >= 2) {
        summary.forEach(item => {
            if (item.name === 'overall') {
                item.value = 'off track'
            }
        })

        // summary = Object.assign({}, summary, { name: 'overall', value: 'off track' })

    } else {
        summary.forEach(item => {
            if (item.name === 'overall') {
                item.value = 'on track'
            }
        })

        // summary = Object.assign({}, summary, { name: 'overall', value: 'at risk' })

    }
    console.log('summary', summary)
    useEffect(() => {


        // }, 3000);
    }, []);

    const selectStatus = (selectedStatus) => {


    }
    const selectCheckList = (bucket) => {


    }
    return (
        <div className="project-detail">
            {/* <h1>{totalTaskChecklist} </h1> */}
            <ProjectInfoBar projectInfo={{
                name,
                startDateDisplay,
                endDateDisplay,
                forecastHours,
                buckets,
                effortSpent
            }} />
            <div className="project-detail-row">
                <div className="project-detail-row_col-30">
                    <div>
                        <p className="project-detail-row--heading">project state</p>
                        <StatusWidget data={projectStates} activeValue={projectState} readOnlyFlag={true} statusSummary={false} onSelectStatus={selectStatus} />
                    </div>

                    <div>
                        <p className="project-detail-row--heading">status summary</p>
                        <StatusWidget data={summary} activeValue={''} readOnlyFlag={true} statusSummary={true} />

                        {/* <StatusWidget statusSummary={true}/> */}
                    </div>
                </div>

                <div className="project-detail-row_col-30">
                    <p className="project-detail-row--heading">task checklist</p>
                    <TaskChecklist buckets={buckets} readOnlyFlag={true} onSelectCheckList={selectCheckList} />
                </div>

                <div className="project-detail-row_col-40">
                    <p className="project-detail-row--heading">project updates</p>
                    <ProjectUpdates updates={description} />
                </div>
            </div>

            <div className="widget-footer">
                <div className="widget-footer_actions">

                    <button className="widget-footer_actions--btn"> Cancel</button>

                    <button className="widget-footer_actions--btn">Edit Finance</button>

                    <button className="widget-footer_actions--btn" onClick={() => props.history.push({
                        pathname: '/home/projects/edit-activity',
                        state: 'edit project'
                    })}>Edit Activity</button>

                </div>
            </div>

        </div>
    );
}

function mapStateToProps(state) {
    console.log('state.root.selected_project', state.root.selected_project)
    return {
        selectedProject: state.root.selected_project,
    }
}

export default connect(mapStateToProps, null)(ProjectDetailScreen);

