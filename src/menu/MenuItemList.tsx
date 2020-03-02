import React from 'react';
import './MenuItemList.scss';
import { ListItem } from './Menu';

interface ItemListProps {
    listItems: ListItem[];
}

export const ItemList: React.FC<ItemListProps> = ({
    listItems,
}: ItemListProps) => {
    return (
        <>
            {listItems.map(item => (
                <div key={item.title}>
                    <p className="title">{item.title}</p>
                    <p className="subtitle">{item.subtitle}</p>
                </div>
            ))}
        </>
    );
};
