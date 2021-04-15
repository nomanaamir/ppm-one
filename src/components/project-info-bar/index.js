import React, { useState, useEffect } from 'react';
function ProjectInfoBar(props) {
    const [totalChecklist, setTotalCheckList] = useState([])
    const [remainingTasks, setRemainingTasks] = useState([])


    console.log('props.projectInfo', props.projectInfo)
    const { name, startDateDisplay, endDateDisplay, forecastHours, effortSpent, buckets } = props.projectInfo;
    // let remainingTasks = []
    useEffect(() => {
        let totalTaskChecklist = []
        buckets.filter((bucket) => {
            if (bucket.tasks[0] === 'empty') {
                bucket.tasks = []
            }
            if (bucket.tasks.length !== 0) {
                bucket.tasks.filter((task) => {

                    totalTaskChecklist = totalTaskChecklist.concat(...task.checklist)
                   
                })
            }
        })

        const abc = totalTaskChecklist.filter(item => {
            return item.active === false
        })
        setRemainingTasks(abc)
        setTotalCheckList(totalTaskChecklist)
    }, []);


    return (
        <div className="project-info-bar">
            <div className="project-info-bar_row" id="bar-header">
                <div className="project-info-bar_row-col">
                    <div className="project-info-bar--info">
                        <span className="project-info-bar--info-text">project name</span>
                    </div>
                </div>
                <div className="project-info-bar_row-col">
                    <div className="project-info-bar--info project-info-bar_row-col--15">
                        <span className="project-info-bar--info-text">start</span>
                    </div>
                    <div className="project-info-bar--info project-info-bar_row-col--15">
                        <span className="project-info-bar--info-text">finish</span>
                    </div>
                    <div className="project-info-bar--info project-info-bar_row-col--15">
                        <span className="project-info-bar--info-text">total hours</span>
                    </div>
                    <div className="project-info-bar--info project-info-bar_row-col--20">
                        <span className="project-info-bar--info-text">hours remaining</span>
                    </div>
                    <div className="project-info-bar--info project-info-bar_row-col--15">
                        <span className="project-info-bar--info-text">total tasks</span>
                    </div>
                    <div className="project-info-bar--info project-info-bar_row-col--20">
                        <span className="project-info-bar--info-text">tasks remaining</span>
                    </div>
                </div>
            </div>

            <div className="project-info-bar_row" id="bar-body">
                <div className="project-info-bar_row-col">
                    <div className="project-info-bar--info">
                        <span className="project-info-bar--info-text">{name}</span>
                    </div>
                </div>
                <div className="project-info-bar_row-col">
                    <div className="project-info-bar--info project-info-bar_row-col--15">
                        <span className="project-info-bar--info-text">{startDateDisplay}</span>
                    </div>
                    <div className="project-info-bar--info project-info-bar_row-col--15">
                        <span className="project-info-bar--info-text">{endDateDisplay}</span>
                    </div>
                    <div className="project-info-bar--info project-info-bar_row-col--15">
                        <span className="project-info-bar--info-text">{forecastHours}</span>
                    </div>
                    <div className="project-info-bar--info project-info-bar_row-col--20">
                        <span className="project-info-bar--info-text">{effortSpent === 0 ? 0 : parseInt(forecastHours) - effortSpent}</span>
                    </div>
                    <div className="project-info-bar--info project-info-bar_row-col--15">
                        <span className="project-info-bar--info-text">{totalChecklist.length}</span>
                    </div>
                    <div className="project-info-bar--info project-info-bar_row-col--20">
                        <span className="project-info-bar--info-text">{remainingTasks.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ProjectInfoBar;

