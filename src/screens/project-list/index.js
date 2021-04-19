import React, { useEffect } from 'react';
import { getProjects, setSelectedProject } from '../../Store/Middlewares/middlewares';
import { connect } from 'react-redux';
// project card
import ProjectCard from '../../components/project-card/index'
function ProjectListScreen(props) {
    useEffect(() => {
        props.getProjectsAction()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const selectProject = (selectedProject) => {
        props.setSelectedProjectAction(selectedProject)
        props.history.push({
            pathname: '/home/projects/project-detail',
            state: 'project detail'
        })
    }
    return (
        <div className="projects-container">
            {
                props.projectList.map((item, index) => {
                    return (
                        <ProjectCard project={item} key={index} getProps={props} projectKey={props.projectKeys[index]} onSelectProject={selectProject} />
                    )
                })
            }
        </div>
    );
}

function mapStateToProps(state) {
    return {
        projectList: Object.values(state.root.project_list?.projects || {}),
        projectKeys: Object.keys(state.root.project_list?.projects || {})
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        getProjectsAction: () => { dispatch(getProjects()) },
        setSelectedProjectAction: (selectedProject) => { dispatch(setSelectedProject(selectedProject)) },


    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ProjectListScreen);

