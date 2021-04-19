import React, { useState, useEffect } from 'react';
function ProjectCard(props) {
    const { project, projectKey } = props
    const { scheduleStatus, scopeStatus, budgetStatus, contingency, projectServices, forecastBreakdown, forecastHours, effortSpent, endDateDisplay, name } = project

    const [financialSum, setFinancialSum] = useState([])

    let summary = []
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
    } else if (atRisk.length >= 2) {
        summary.forEach(item => {
            if (item.name === 'overall') {
                item.value = 'at risk'
            }
        })
    } else if (offTrack.length >= 2) {
        summary.forEach(item => {
            if (item.name === 'overall') {
                item.value = 'off track'
            }
        })


    } else {
        summary.forEach(item => {
            if (item.name === 'overall') {
                item.value = 'at risk'
            }
        })


    }
    useEffect(() => {
        setFinancialSum([])
        const currentMonth = new Date().getMonth();
        forecastBreakdown.filter(item => {
            if (currentMonth > item.month) {
                setFinancialSum(financialSum => [...financialSum, parseInt(item.financial)]);

            }
            return null

        })

   
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const selectProject = () => {
        const selectedProject = {
            key: projectKey,
            project
        }
        props.onSelectProject(selectedProject);
    }
    const revenue = parseInt(contingency) + parseInt(projectServices);
    const invoiced = financialSum.reduce((a, b) => a + b, 0);
    return (
        <div className="project-card" onClick={() => selectProject()}>
            <div className="project-card--name">
                <span>{name}</span>
                <div className="project-card--name-border"></div>
            </div>

            <div className="project-card_row">
                <div className="project-card_row-col">
                    <div className="project-card--info">
                        <span className="project-card--info_label">Status:</span>

                        <div className={"project-state " + summary[0].value.replace(/\s/g, '')}> </div>
                    </div>

                    <div className="project-card--info">
                        <span className="project-card--info_label">Revenue:</span>

                        <span className="project-card--info_value"> ${revenue} </span>
                    </div>

                    <div className="project-card--info">
                        <span className="project-card--info_label">Invoiced:</span>

                        <span className="project-card--info_value"> ${invoiced} </span>
                    </div>

                    <div className="project-card--info">
                        <span className="project-card--info_label">Remaining:</span>

                        <span className="project-card--info_value"> ${revenue - invoiced} </span>
                    </div>
                </div>

                <div className="project-card_row-col">
                    <div className="project-card--info">
                        <span className="project-card--info_label">Due Date:</span>

                        <span className="project-card--info_value"> {endDateDisplay} </span>
                    </div>
                    <div className="project-card--info">
                        <span className="project-card--info_label">Effort Forecast:</span>

                        <span className="project-card--info_value"> {parseInt(forecastHours)} </span>
                    </div>
                    <div className="project-card--info">
                        <span className="project-card--info_label">Effort spent:</span>

                        <span className="project-card--info_value">{effortSpent} </span>
                    </div>

                    <div className="project-card--info">
                        <span className="project-card--info_label">Effort Remaining:</span>

                        <span className="project-card--info_value"> {parseInt(forecastHours) - effortSpent} </span>
                    </div>

                </div>
            </div>
        </div>
    );
}


export default ProjectCard;

