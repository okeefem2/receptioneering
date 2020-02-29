import React from 'react'
import './MenuItemList.scss';
import { ListItem } from './Menu';

interface ItemListProps {
    listItems: ListItem[]
}

export const ItemList: React.FC<ItemListProps> = ({ listItems }) => {
    return (
        <>
            {
                listItems.map(item => (
                    <>
                        <p className="title">{item.title}</p>
                        <p className="subtitle">{item.subtitle}</p>
                    </>
                ))
            }
        </>
    )
}
