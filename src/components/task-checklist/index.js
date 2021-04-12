import React, { useState, useEffect } from 'react';
import check from '../../assets/checked.png'
function TaskChecklist(props) {
    const checklist = [
        {
            name: 'determine project scope',
            active: true
        },
        {
            name: 'determine project scope',
            active: true
        },
        {
            name: 'determine project scope',
            active: true
        },
        {
            name: 'determine project scope',
            active: true
        },
        {
            name: 'determine project scope',
            active: true
        },
        {
            name: 'determine project scope',
            active: true
        },
        {
            name: 'determine project scope',
            active: false
        },
        {
            name: 'determine project scope',
            active: false
        },
        {
            name: 'determine project scope',
            active: false
        },
        {
            name: 'determine project scope',
            active: false
        },
        {
            name: 'determine project scope',
            active: false
        },
        {
            name: 'determine project scope',
            active: false
        }
    ]
    useEffect(() => {
    }, []);


    return (
        <div className="task-checklist">
            {
                checklist.map((item, index) => {
                    return (
                        <div className="checklist-item-row" key={index}>
                            <div className={'checklist-item-row_circle ' + (item.active === true ? 'checked' : null)}>
                                {
                                    item.active ?
                                        'L'
                                        // <img src={check} alt="check"/>
                                        :
                                        null
                                }
                            </div>
                            <div className="checklist-item-row--contain">
                                <span className={'checklist-item-row_text ' + (item.active === true ? 'completed' : null)}>
                                    {item.name}
                                </span>
                            </div>
                        </div>

                    )
                })
            }
        </div>
    );
}


export default TaskChecklist;