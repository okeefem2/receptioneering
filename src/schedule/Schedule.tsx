import React from 'react';
import { observer } from 'mobx-react';
import { ListItem } from '../menu/Menu';
import { ItemList } from '../menu/MenuItemList';

const schedule: ListItem[] = [
    {
        title: 'Start',
        subtitle: '2:00PM',
    },
    {
        title: 'Cocktail Hour and Guest Arrival',
        subtitle: '2:00PM - 3:00PM',
    },
    {
        title: 'Speeches and Wedding Video Viewing',
        subtitle: '3:00PM - 3:30PM',
    },
    {
        title: 'Pictures',
        subtitle: '3:30PM - 4:00PM',
    },
    {
        title: 'Dinner',
        subtitle: '4:00PM - 5:00PM',
    },
    {
        title: 'Dances',
        subtitle: '5:00PM - 5:30PM',
    },
    {
        title: 'Desert',
        subtitle: '5:30PM - 6:00PM',
    },
    {
        title: 'Games and Dancing',
        subtitle: '5:30PM - 10:00PM',
    },
    {
        title: 'End',
        subtitle: '10PM',
    },
];

export const Schedule: React.FC = observer(() => {
    return (
        <>
            <div className="col">
                <h2>Schedule</h2>
            </div>
            <div className="col">{<ItemList listItems={schedule} />}</div>
        </>
    );
});

export default Schedule;
