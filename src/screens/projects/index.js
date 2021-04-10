import React, { useState, useEffect } from 'react';
import { getProjects } from '../../Store/Middlewares/middlewares';
import { connect } from 'react-redux';
// project card
import ProjectCard from '../../components/project-card/index'
function ProjectsScreen(props) {
    useEffect(() => {
        props.getProjectsAction()
    }, []);
    return (
        <div className="projects-container">
            {
                props.projectList.map((item, index) => {
                    return (
                        <ProjectCard project={item} key={index} />
                    )
                })
            }
        </div>
    );
}

function mapStateToProps(state) {
    return {
        projectList: Object.values(state.root.project_list?.projects || {})
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        getProjectsAction: () => { dispatch(getProjects()) },

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsScreen);

