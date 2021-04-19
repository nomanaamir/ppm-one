import React from 'react';

import { Route } from 'react-router-dom';
// screens
import ProjectListScreen from '../project-list/index';
import ProjectDetailScreen from '../project-detail/index';
import EditActivityScreen from '../edit-activity/index';
function ProjectsScreen() {
  
    return (
        <div style={{ height: '100%' }}>

            <Route path="/home/projects/project-list" component={ProjectListScreen} />
            <Route path="/home/projects/project-detail" component={ProjectDetailScreen} />
            <Route path="/home/projects/edit-activity" component={EditActivityScreen} />


        </div>
    );
}


export default ProjectsScreen;
