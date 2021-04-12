import React, { useState, useEffect } from 'react';
function ProjectInfoBar() {

    useEffect(() => {

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
                        <span className="project-info-bar--info-text">Acme - Intune implementation</span>
                    </div>
                </div>
                <div className="project-info-bar_row-col">
                    <div className="project-info-bar--info project-info-bar_row-col--15">
                        <span className="project-info-bar--info-text">10-Oct-20</span>
                    </div>
                    <div className="project-info-bar--info project-info-bar_row-col--15">
                        <span className="project-info-bar--info-text">15-Jan-21</span>
                    </div>
                    <div className="project-info-bar--info project-info-bar_row-col--15">
                        <span className="project-info-bar--info-text">125</span>
                    </div>
                    <div className="project-info-bar--info project-info-bar_row-col--20">
                        <span className="project-info-bar--info-text">84</span>
                    </div>
                    <div className="project-info-bar--info project-info-bar_row-col--15">
                        <span className="project-info-bar--info-text">30</span>
                    </div>
                    <div className="project-info-bar--info project-info-bar_row-col--20">
                        <span className="project-info-bar--info-text">12</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ProjectInfoBar;

