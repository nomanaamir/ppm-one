import React from 'react';
function ProjectUpdates(props) {
    const { updates } = props

    return (
        <div className="project-updates scrollable">
            {
                updates.map((item, index) => {
                    return (

                        <div className="project-updates_info" key={index}>
                            <p className="project-updates_info--date">
                                {item.date}
                            </p>
                            <p className="project-updates_info--text">
                                {item.update}
                            </p>
                        </div>

                    )
                })
            }
        </div>
    );
}


export default ProjectUpdates;

