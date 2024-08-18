from database import db
from models.user import UserModel
from models.recipe import Recipe, Ingredient, OtherRecipeImages
from faker import Faker
from app import app
from flask_bcrypt import Bcrypt
fake = Faker()
bcrypt = Bcrypt()
with app.app_context():
    # db.drop_all()
    db.create_all()

    users = [
        UserModel(username='benny', firstname='Ben', lastname='Gitau', email='bengitau@gmail', is_admin=True),
        UserModel(username='gitau', firstname='Gitau', lastname='Gitau', email='gitau@gmail', is_admin=False),
    ]

    for user, password in zip(users, ['password', 'password']):
        user.password_hash = bcrypt.generate_password_hash(password)

    db.session.add_all(users)
    db.session.commit()

    recipes = []
    for _ in range(50):
        recipe = Recipe(
            title=fake.word(),
            description=fake.text(),
            instructions=fake.text(),
            user_id=fake.random_int(min=1, max=2),
            banner_image="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            cuisine="INDIAN",
            level="EASY",
            diet="VEGAN",
            prepTime=10,
            cookTime=15,
            servings=4,
        )
        recipes.append(recipe)
    db.session.add_all(recipes)
    db.session.commit()

    ingredients = []
    for _ in range(300):
        ingredient = Ingredient(
            name=fake.word(),
            quantity=fake.word(),
            image="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            recipe_id=fake.random_int(min=1, max=50),
        )
        ingredients.append(ingredient)
    db.session.add_all(ingredients)
    db.session.commit()

    other_images = []
    for _ in range(500):
        other_image = OtherRecipeImages(
            image="https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
            recipe_id=fake.random_int(min=1, max=60),
            name=fake.word(),
        )
        other_images.append(other_image)
    db.session.add_all(other_images)
    db.session.commit()
 
    print("Database seeded successfully!")


