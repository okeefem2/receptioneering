import React from 'react';
import { observer } from 'mobx-react';
import './Menu.scss';
import { ItemList } from './MenuItemList';

export interface List {
    [k: string]: ListItem[];
}

export interface ListItem {
    title: string;
    subtitle: string;
}
const menu: List = {
    Appetizers: [
        {
            title: 'Beer-Brined Chicken Wings',
            subtitle: `Plain, BBQ, Buffalo and Dry Rub. Served with ranch and blue cheese, feel free to bring a favorite sauce!`,
        },
        {
            title: 'Vegetable Platter',
            subtitle: `Carrots, celery, cucumber, sweet peppers, cauliflower, radish, and tomatoes. Served with herb-ranch dipping sauce.`,
        },
        {
            title: 'Pepperoni Pinwheels',
            subtitle: `Served with pizza sauce and chipotle-ranch dressing.`,
        },
        {
            title: 'Soft Pretzels and Beer Cheese',
            subtitle: `Served with assorted mustards, and of course beer cheese.`,
        },
        {
            title: `Woodman's Platter`,
            subtitle: `With cheese, charcuterie, spiced nuts, fruit, toasted ciabatta bread, and crackers.`,
        },
        {
            title: 'Hummus Platter',
            subtitle: `With pickled vegetables, pita bread, and olive oil.`,
        },
    ],
    Salads: [
        {
            title: 'Caesar Salad',
            subtitle: `Romaine with croutons and Parmesan.`,
        },
        {
            title: `Michigan Apple Salad`,
            subtitle: `Mixed greens with apples, cheddar, granola, and dried cherries.`,
        },
    ],
    'Main Course': [
        {
            title: `Sandwich Platter`,
            subtitle: `Assorted turkey, roast beef, ham, salami, and vegetarian sandwiches with lettuce, tomato, cheese, mustard and mayo. `,
        },
        {
            title: 'Chicago Sausage Pizza',
            subtitle: `With onions, peppers, herb sausage, pizza sauce, and mozzarella.`,
        },
        {
            title: 'Primo Pesto Pizza',
            subtitle: `With arugula pesto, chicken, mushrooms, tomato, mozzarella, and Gorgonzola. Consider adding desserts.`,
        },
        {
            title: 'Margarita Pizza Pizza',
            subtitle: `With tomato, basil, pizza sauce, and cheese curds.`,
        },
        {
            title: `Supreme Pizza`,
            subtitle: `With Italian sausage, pepperoni, green olives, onions, mushrooms, and mozzarella cheese.`,
        },
        {
            title: `Veggie Pizza`,
            subtitle: `Cauliflower crust with broccoli, mushrooms, roasted peppers, red onions, and vegan cheese.`,
        },
        {
            title: `BBQ Chicken Pizza`,
            subtitle: `With roasted chicken, peppadew peppers, red onion, jalapenos, and Dragon's Milk BBQ sauce.`,
        },
    ],
    Desert: [
        {
            title: 'Donuts',
            subtitle: `Plain, Sour Cream, Sprinkle, Jelly filled, Cream filled`,
        },
    ],
    Beverages: [
        {
            title: 'Bud Light',
            subtitle: '2 30 packs of bud light cans',
        },
        {
            title: 'Oberon',
            subtitle: `2 mini kegs of Oberon from Bell's`,
        },
        {
            title: 'Wine',
            subtitle: '3 bottles each of red and white wine',
        },
        {
            title: 'Mixed',
            subtitle: 'Some cool mixed drinks',
        },
    ],
};

export const Menu: React.FC = observer(() => {
    return (
        <>
            <div className="col">
                <h2>Menu, Catered by New Holland Brewing</h2>
            </div>
            <div className="col">
                {Object.keys(menu).map((category: string) => (
                    <div key={category}>
                        <h3 className="category">{category}</h3>
                        <ItemList listItems={menu[category]} />
                    </div>
                ))}
            </div>
        </>
    );
});

export default Menu;
