import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('../config/service-account-key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


def parse_json_to_firestore(collection, json):
    if type(json) is dict:
        for (key, items) in json.items():
            doc_ref = db.collection(collection).document(key)

            doc_ref.set({
                u'image': key + '.jpg'
            })
            for item in items:
                doc_ref.collection('items').add(item)
    else:
        for item in json:
            db.collection(collection).add(item)


def main():
    menu = {
        'Appetizers': [
            {
                'title': 'Beer-Brined Chicken Wings',
                'subtitle': 'Plain, BBQ, Buffalo and Dry Rub. Served with ranch and blue cheese, feel free to bring a favorite sauce!',
            },
            {
                'title': 'Vegetable Platter',
                'subtitle': 'Carrots, celery, cucumber, sweet peppers, cauliflower, radish, and tomatoes. Served with herb-ranch dipping sauce.',
            },
            {
                'title': 'Pepperoni Pinwheels',
                'subtitle': 'Served with pizza sauce and chipotle-ranch dressing.',
            },
            {
                'title': 'Soft Pretzels and Beer Cheese',
                'subtitle': 'Served with assorted mustards, and of course beer cheese.',
            },
            {
                'title': 'Woodman\'s Platter',
                'subtitle': 'With cheese, charcuterie, spiced nuts, fruit, toasted ciabatta bread, and crackers.',
            },
            {
                'title': 'Hummus Platter',
                'subtitle': 'With pickled vegetables, pita bread, and olive oil.',
            },
        ],
        'Salads': [
            {
                'title': 'Caesar Salad',
                'subtitle': 'Romaine with croutons and Parmesan.',
            },
            {
                'title': 'Michigan Apple Salad',
                'subtitle': 'Mixed greens with apples, cheddar, granola, and dried cherries.',
            },
        ],
        'Main Course': [
            {
                'title': 'Sandwich Platter',
                'subtitle': 'Assorted turkey, roast beef, ham, salami, and vegetarian sandwiches with lettuce, tomato, cheese, mustard and mayo. ',
            },
            {
                'title': 'Chicago Sausage Pizza',
                'subtitle': 'With onions, peppers, herb sausage, pizza sauce, and mozzarella.',
            },
            {
                'title': 'Primo Pesto Pizza',
                'subtitle': 'With arugula pesto, chicken, mushrooms, tomato, mozzarella, and Gorgonzola. Consider adding desserts.',
            },
            {
                'title': 'Margarita Pizza Pizza',
                'subtitle': 'With tomato, basil, pizza sauce, and cheese curds.',
            },
            {
                'title': 'Supreme Pizza',
                'subtitle': 'With Italian sausage, pepperoni, green olives, onions, mushrooms, and mozzarella cheese.',
            },
            {
                'title': 'Veggie Pizza',
                'subtitle': 'Cauliflower crust with broccoli, mushrooms, roasted peppers, red onions, and vegan cheese.',
            },
            {
                'title': 'BBQ Chicken Pizza',
                'subtitle': 'With roasted chicken, peppadew peppers, red onion, jalapenos, and Dragon\'s Milk BBQ sauce.',
            },
        ],
        'Desert': [
            {
                'title': 'Donuts',
                'subtitle': 'Plain, Sour Cream, Sprinkle, Jelly filled, Cream filled',
            },
        ],
        'Beverages': [
            {
                'title': 'Bud Light',
                'subtitle': '2 30 packs of bud light cans',
            },
            {
                'title': 'Oberon',
                'subtitle': '2 mini kegs of Oberon from Bell\'s',
            },
            {
                'title': 'Wine',
                'subtitle': '3 bottles each of red and white wine',
            },
            {
                'title': 'Mixed',
                'subtitle': 'Some cool mixed drinks',
            },
        ],
    }

    # parse_json_to_firestore('menu', menu)

    schedule = [
        {
            'title': 'Start',
            'subtitle': '2:00PM',
        },
        {
            'title': 'Cocktail Hour and Guest Arrival',
            'subtitle': '2:00PM - 3:00PM',
        },
        {
            'title': 'Speeches and Wedding Video Viewing',
            'subtitle': '3:00PM - 3:30PM',
        },
        {
            'title': 'Pictures',
            'subtitle': '3:30PM - 4:00PM',
        },
        {
            'title': 'Dinner',
            'subtitle': '4:00PM - 5:00PM',
        },
        {
            'title': 'Dances',
            'subtitle': '5:00PM - 5:30PM',
        },
        {
            'title': 'Desert',
            'subtitle': '5:30PM - 6:00PM',
        },
        {
            'title': 'Games and Dancing',
            'subtitle': '5:30PM - 10:00PM',
        },
        {
            'title': 'End',
            'subtitle': '10PM',
        },
    ]

    parse_json_to_firestore('schedule', schedule)


main()
