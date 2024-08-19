from database import db
from models.user import UserModel
from models.recipe import Recipe, Ingredient, OtherRecipeImages
from faker import Faker
from app import app
from flask_bcrypt import Bcrypt
fake = Faker()

bcrypt = Bcrypt()

with app.app_context():
    #db.drop_all()
    db.create_all()

    users = [
        UserModel(username='benny', firstname='Ben', lastname='Gitau', email='bengitau@gmail.com', is_admin=True),
        UserModel(username='gitau', firstname='Gitau', lastname='Gitau', email='gitau@gmail.com', is_admin=False),
    ]

    for user, password in zip(users, ['password', 'password']):
        user.password_hash = bcrypt.generate_password_hash(password)

    db.session.add_all(users)
    db.session.commit()

    # Recipes
    recipes = [
        Recipe(title="Spaghetti Carbonara", description="Classic Italian pasta with eggs, cheese, pancetta, and pepper.", instructions="1. Cook spaghetti. 2. In a bowl, whisk eggs and cheese. 3. Cook pancetta until crispy. 4. Combine all ingredients.", user_id=1, banner_image="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?quality=90&resize=440,400", cuisine="ITALIAN", level="EASY", diet="VEGAN", prepTime=10, cookTime=15, servings=4),
        Recipe(title="Vegetarian Tacos", description="Tasty vegetarian tacos with black beans, corn, and avocado.", instructions="1. Prepare vegetables. 2. Warm tortillas. 3. Assemble tacos with black beans, corn, and avocado.", user_id=2, banner_image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLd_A-PvUHlpvkb_JLAqdLYmZdywYCRa6_Cg&s", cuisine="MEXICAN", level="EASY", diet="VEGETARIAN", prepTime=15, cookTime=10, servings=4),
        Recipe(title="Chicken Curry", description="A rich and flavorful chicken curry with a blend of spices and coconut milk.", instructions="1. Sauté onions and spices. 2. Add chicken and cook. 3. Stir in coconut milk and simmer.", user_id=1, banner_image="https://images.immediate.co.uk/production/volatile/sites/30/2022/10/Spicy-chicken-and-chickpea-curry-40f3492.jpg?resize=900%2C471", cuisine="INDIAN", level="MEDIUM", diet="VEGETARIAN", prepTime=20, cookTime=40, servings=4),
        Recipe(title="Beef Stroganoff", description="Tender beef strips cooked in a creamy mushroom sauce.", instructions="1. Brown beef. 2. Sauté onions and mushrooms. 3. Add beef back to pan and stir in sour cream.", user_id=2, banner_image="https://www.allrecipes.com/thmb/mSWde3PHTu-fDkbvWBw0D1JlS8U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25202beef-stroganoff-iii-ddmfs-3x4-233-0f26fa477e9c446b970a32502468efc6.jpg", cuisine="CHINESE", level="MEDIUM", diet="KETO", prepTime=15, cookTime=30, servings=4),
        Recipe(title="Caesar Salad", description="A classic Caesar salad with crisp romaine lettuce, croutons, and Caesar dressing.", instructions="1. Toss lettuce with Caesar dressing. 2. Add croutons and Parmesan cheese. 3. Serve immediately.", user_id=1, banner_image="https://www.allrecipes.com/thmb/JTW0AIVY5PFxqLrf_-CDzT4OZQY=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/229063-Classic-Restaurant-Caesar-Salad-ddmfs-4x3-231-89bafa5e54dd4a8c933cf2a5f9f12a6f.jpg", cuisine="AMERICAN", level="EASY", diet="VEGETARIAN", prepTime=10, cookTime=5, servings=4),
        Recipe(title="Margarita Pizza", description="Classic pizza with tomato sauce, mozzarella cheese, and fresh basil.", instructions="1. Spread tomato sauce over dough. 2. Add mozzarella and bake. 3. Top with fresh basil.", user_id=2, banner_image="https://images.ctfassets.net/nw5k25xfqsik/64VwvKFqxMWQORE10Tn8pY/200c0538099dc4d1cf62fd07ce59c2af/20220211142754-margherita-9920.jpg", cuisine="ITALIAN", level="EASY", diet="VEGAN", prepTime=20, cookTime=15, servings=2),
        Recipe(title="Vegetable Stir Fry", description="A colorful stir fry with a mix of vegetables in a savory sauce.", instructions="1. Stir-fry vegetables with garlic and ginger. 2. Add sauce and cook until vegetables are tender.", user_id=1, banner_image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV4KUimBm76pNffKDLC14h4-qU5enzaAUGSQ&s", cuisine="ASIAN", level="EASY", diet="VEGETARIAN", prepTime=15, cookTime=10, servings=4),
        Recipe(title="Chicken Alfredo", description="Creamy Alfredo pasta with chicken and Parmesan cheese.", instructions="1. Cook pasta. 2. Sauté chicken. 3. Prepare Alfredo sauce and combine with pasta and chicken.", user_id=2, banner_image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnhDuQ0guCvHoX319JqweWtKfLX0unu2nfYSu8mmv2NHqHXnJW42DLvdnIuCBX64nADuA&usqp=CAU", cuisine="ITALIAN", level="MEDIUM", diet="VEGAN", prepTime=20, cookTime=20, servings=4),
        Recipe(title="Greek Salad", description="A refreshing salad with cucumbers, tomatoes, olives, and feta cheese.", instructions="1. Combine cucumbers, tomatoes, olives, and feta. 2. Toss with olive oil and herbs.", user_id=1, banner_image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1IZMowX4SqkttttSUqXyUk_FZJRgjGd4w0A&s", cuisine="CHINESE", level="EASY", diet="VEGETARIAN", prepTime=10, cookTime=5, servings=4),
        Recipe(title="Shrimp Scampi", description="Garlic shrimp sautéed in a lemon butter sauce.", instructions="1. Cook shrimp with garlic. 2. Add lemon juice and butter. 3. Serve with pasta or bread.", user_id=2, banner_image="https://www.swankyrecipes.com/wp-content/uploads/2022/04/Best-Shrimp-Scampi-500x500.jpg", cuisine="AMERICAN", level="MEDIUM", diet="VEGAN", prepTime=15, cookTime=10, servings=4),
        Recipe(title="BBQ Ribs", description="Tender ribs coated with a smoky BBQ sauce.", instructions="1. Season ribs and bake. 2. Brush with BBQ sauce and grill.", user_id=1, banner_image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO83cidF6A8RTI8372IUJdwbL3o0p456Y6gg&s", cuisine="BRAZILIAN", level="MEDIUM", diet="VEGETARIAN", prepTime=20, cookTime=120, servings=4),
        Recipe(title="Mushroom Risotto", description="Creamy risotto with sautéed mushrooms and Parmesan cheese.", instructions="1. Cook mushrooms. 2. Prepare risotto and stir in mushrooms. 3. Add Parmesan and serve.", user_id=2, banner_image="https://cdn.loveandlemons.com/wp-content/uploads/2023/01/mushroom-risotto.jpg", cuisine="ITALIAN", level="MEDIUM", diet="VEGETARIAN", prepTime=20, cookTime=30, servings=4),
        Recipe(title="Falafel", description="Crispy chickpea balls served with tahini sauce.", instructions="1. Blend chickpeas with spices. 2. Form into balls and fry. 3. Serve with tahini sauce.", user_id=1, banner_image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1xsNuMDOveR1e0l8fMUaE6X-7KgVBS4NJdQ&s", cuisine="MEXICAN", level="MEDIUM", diet="VEGAN", prepTime=30, cookTime=15, servings=4),
        Recipe(title="Tiramisu", description="A classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cheese.", instructions="1. Mix mascarpone with sugar and coffee. 2. Layer with ladyfingers. 3. Chill before serving.", user_id=2, banner_image="https://natashaskitchen.com/wp-content/uploads/2024/04/Tiramisu-Cake-12.jpg", cuisine="ITALIAN", level="EASY", diet="VEGETARIAN", prepTime=20, cookTime=0, servings=6),
        Recipe(title="Pumpkin Soup", description="A creamy and comforting pumpkin soup with a hint of spice.", instructions="1. Cook onions and garlic. 2. Add pumpkin and broth. 3. Blend and season.", user_id=1, banner_image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJbu_63cejau1OKqVfrJBoHZ9VFvFlefT8PQ&s", cuisine="AMERICAN", level="EASY", diet="VEGAN", prepTime=15, cookTime=30, servings=4),
        Recipe(title="Pad Thai", description="A popular Thai stir-fry noodle dish with shrimp, tofu, and peanuts.", instructions="1. Stir-fry noodles with shrimp and tofu. 2. Add sauce and peanuts.", user_id=2, banner_image="https://tastythriftytimely.com/wp-content/uploads/2023/01/Homemade-Vegan-Pad-Thai-Featured.jpg", cuisine="THAI", level="MEDIUM", diet="KETO", prepTime=20, cookTime=15, servings=4),
        Recipe(title="Lasagna", description="Layers of pasta, meat sauce, and cheese baked to perfection.", instructions="1. Prepare meat sauce. 2. Layer with pasta and cheese. 3. Bake until bubbly.", user_id=1, banner_image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6jEwddBmrK2VeJobMw3EHnNqTUFT0ynnE2g&s", cuisine="ITALIAN", level="MEDIUM", diet="PALEO", prepTime=30, cookTime=60, servings=6),
        Recipe(title="Grilled Cheese Sandwich", description="A classic grilled cheese sandwich with crispy bread and melted cheese.", instructions="1. Butter bread slices. 2. Place cheese between slices and grill.", user_id=2, banner_image="https://cdn.loveandlemons.com/wp-content/uploads/2023/01/grilled-cheese.jpg", cuisine="AMERICAN", level="EASY", diet="KETO", prepTime=5, cookTime=10, servings=1),
        Recipe(title="Quiche Lorraine", description="A savory tart with a creamy filling of eggs, cheese, and bacon.", instructions="1. Prepare pie crust. 2. Mix eggs, cheese, and bacon. 3. Bake until set.", user_id=1, banner_image="https://assets.afcdn.com/recipe/20221010/135915_w1024h768c1cx999cy749cxt0cyt0cxb1999cyb1499.jpg", cuisine="FRENCH", level="MEDIUM", diet="VEGAN", prepTime=20, cookTime=45, servings=4),
        Recipe(title="Tom Yum Soup", description="A spicy and sour Thai soup with shrimp and mushrooms.", instructions="1. Boil broth with lemongrass and lime leaves. 2. Add shrimp and mushrooms. 3. Season with fish sauce and lime juice.", user_id=2, banner_image="https://cravingtasty.com/wp-content/uploads/2019/02/Tom-Yum-Soup-2-500x375.jpg", cuisine="THAI", level="MEDIUM", diet="VEGETARIAN", prepTime=15, cookTime=15, servings=4),
        Recipe(title="Baked Ziti", description="Pasta baked with marinara sauce and melted cheese.", instructions="1. Cook ziti and mix with marinara sauce. 2. Layer with cheese and bake.", user_id=1, banner_image="https://www.allrecipes.com/thmb/uJocCYfLL1gMCsbj79tY7hKilWw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4557541-21604073f2774e89b532193821d6cd9c.jpg", cuisine="ITALIAN", level="EASY", diet="VEGAN", prepTime=15, cookTime=30, servings=4),
        Recipe(title="Apple Pie", description="A classic dessert with a buttery crust and spiced apple filling.", instructions="1. Prepare pie crust. 2. Fill with spiced apples. 3. Bake until golden brown.", user_id=2, banner_image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtaQ0aurOfdFloFiQgxIOAIs4rOF6bpAMWWw&s", cuisine="AMERICAN", level="MEDIUM", diet="VEGETARIAN", prepTime=30, cookTime=60, servings=8)
    ]

    
    db.session.add_all(recipes)
    db.session.commit()

    ingredients = []
    for i in range(1, 21): 
        for j in range(5):  
            ingredient = Ingredient(
                name=fake.word(),
                quantity=fake.word(),
                image="https://img.freepik.com/free-photo/assortment-vegetables-herbs-spices-background_123827-21588.jpg",
                recipe_id=i,
            )
            ingredients.append(ingredient)
    db.session.add_all(ingredients)
    db.session.commit()

    other_images = []
    for i in range(1, 21):  
        for j in range(3):  
            other_image = OtherRecipeImages(
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLd_A-PvUHlpvkb_JLAqdLYmZdywYCRa6_Cg&s",
                recipe_id=i,
                name=fake.word(),
            )
            other_images.append(other_image)
    db.session.add_all(other_images)
    db.session.commit()

    print("Database seeded successfully!")
