import React, { useState, useEffect } from 'react';
function ProjectCard(props) {
    const { project } = props
    const { contingency, projectServices, forecastBreakdown, forecastHours, effortSpent, endDateDisplay, name } = project
    // const getValues = []
    const [financialSum, setFinancialSum] = useState([])
    useEffect(() => {
        setFinancialSum([])
        console.log('project card', project)
        console.log('forecastBreakdown', forecastBreakdown)
        const currentMonth = new Date().getMonth();
        forecastBreakdown.filter(item => {
            if (currentMonth > item.month) {
                setFinancialSum(financialSum => [...financialSum, parseInt(item.financial)]);

                // getValues.push(parseInt(item.financial))
            }
        })
        console.log('financialSum', financialSum.reduce((a, b) => a + b, 0))
    }, []);

    const sumFinancialForecast = (...value) => {
        return value.reduce((total, value) => total + value, 0);
    }
    const revenue = parseInt(contingency) + parseInt(projectServices);
    const invoiced = financialSum.reduce((a, b) => a + b, 0);
    return (
        <div className="project-card">
            <div className="project-card--name">
                <span>{name}</span>
                <div className="project-card--name-border"></div>
            </div>

            <div className="project-card_row">
                <div className="project-card_row-col">
                    <div className="project-card--info">
                        <span className="project-card--info_label">Status:</span>

                        <div className="project-state"> </div>
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

                        <span className="project-card--info_value"> ${invoiced === 0 ? 0 : revenue - invoiced} </span>
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

                        <span className="project-card--info_value"> {effortSpent === 0 ? 0 : parseInt(forecastHours) - effortSpent} </span>
                    </div>

                </div>
            </div>
        </div>
    );
}


export default ProjectCard;

