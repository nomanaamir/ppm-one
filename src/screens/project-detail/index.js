import React, { useState, useEffect } from 'react';
// components
import ProjectInfoBar from '../../components/project-info-bar/index';
import StatusWidget from '../../components/status-widget/index';
import TaskChecklist from '../../components/task-checklist/index'
function ProjectDetailScreen(props) {
    const projectState = [
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
    const summary = [
        {
            name: 'overall',
            value: 'at risk',
            color: 'warning'
        },
        {
            name: 'schedule',
            value: 'at risk',
            color: 'warning'
        },
        {
            name: 'scope',
            value: 'on track',
            color: 'success'
        },
        {
            name: 'budget',
            value: 'at risk',
            color: 'warning'

        },
    ]
    useEffect(() => {

    }, []);


    return (
        <div className="project-detail">
            <ProjectInfoBar />
            <div className="project-detail-row">
                <div className="project-detail-row_col-30">
                    <div>
                        <p className="project-detail-row--heading">project state</p>
                        <StatusWidget data={projectState} activeValue={'new'} readOnlyFlag={true} statusSummary={false} />
                    </div>

                    <div>
                        <p className="project-detail-row--heading">status summary</p>
                        <StatusWidget data={summary} activeValue={''} readOnlyFlag={true} statusSummary={true} />

                        {/* <StatusWidget statusSummary={true}/> */}
                    </div>
                </div>

                <div className="project-detail-row_col-30">
                    <p className="project-detail-row--heading">task checklist</p>
                    <TaskChecklist />
                </div>

                <div className="project-detail-row_col-40">

                </div>
            </div>
        </div>
    );
}


export default ProjectDetailScreen;

