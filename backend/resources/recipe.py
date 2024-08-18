from flask_restful import Resource, reqparse
from flask import request, jsonify
from models.recipe import Recipe, Cuisine, Diet, Level, Ingredient, OtherRecipeImages
from models.user import UserModel
from database import db
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import cross_origin


class RecipeResource(Resource):
    def get(self, recipe_id):
        if recipe_id:
            recipe = Recipe.query.filter_by(id=int(recipe_id)).first()
        else:
            recipe = Recipe.query.filter_by(title=recipe_id).first()

        if recipe:
            return jsonify(recipe.to_dict())
        return {"error": "Recipe not found"}, 404

    def put(self, recipe_id):
        
        parser = reqparse.RequestParser()
        parser.add_argument(
            "title", type=str, required=True, help="Title cannot be blank!"
        )
        parser.add_argument("description", type=str, required=False)
        parser.add_argument("instructions", type=str, required=False)
        parser.add_argument("banner_image", type=str, required=False)
        parser.add_argument("ingredients", type=dict, action="append", required=False)
        data = parser.parse_args()

        recipe = Recipe.query.get(recipe_id)
        if not recipe:
            return {"error": "Recipe not found"}, 404

        try:
            recipe.title = data["title"]
            recipe.description = data.get("description", recipe.description)
            recipe.instructions = data.get("instructions", recipe.instructions)
            recipe.banner_image = data.get("banner_image", recipe.banner_image)

            if data.get("ingredients") is not None:
                current_ingredients = {
                    ingredient.name: ingredient for ingredient in recipe.ingredients
                }

                for ingredient_data in data["ingredients"]:
                    name = ingredient_data.get("name")
                    if not name:
                        return {"error": "Ingredient name is required"}, 400

                    if name in current_ingredients:
                        ingredient = current_ingredients[name]
                        ingredient.image = ingredient_data.get(
                            "image", ingredient.image
                        )
                        ingredient.quantity = ingredient_data.get(
                            "quantity", ingredient.quantity
                        )
                    else:
                        ingredient = Ingredient(
                            name=name,
                            image=ingredient_data.get("image"),
                            quantity=ingredient_data.get("quantity"),
                            recipe=recipe,
                        )
                        db.session.add(ingredient)

                new_ingredient_names = {
                    ingredient["name"] for ingredient in data["ingredients"]
                }
                for ingredient_name in list(current_ingredients.keys()):
                    if ingredient_name not in new_ingredient_names:
                        db.session.delete(current_ingredients[ingredient_name])

            db.session.commit()
            return {
                "id": recipe.id,
                "title": recipe.title,
                "description": recipe.description,
                "instructions": recipe.instructions,
                "banner_image": recipe.banner_image,
                "user_id": recipe.user_id,
                "ingredients": [
                    {
                        "id": ingredient.id,
                        "name": ingredient.name,
                        "image": ingredient.image,
                    }
                    for ingredient in recipe.ingredients
                ],
            }, 200
        except ValueError as e:
            return {"error": str(e)}, 400
    @cross_origin()
    def delete(self, recipe_id):
        recipe = Recipe.query.get(recipe_id)
        if recipe:
            db.session.delete(recipe)
            db.session.commit()
            return {"message": "Recipe deleted"}, 200
        return {"error": "Recipe not found"}, 404


class RecipeListResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument(
        "title", type=str, required=True, help="Title of the recipe is required"
    )
    parser.add_argument(
        "description", type=str, required=False, help="Description of the recipe"
    )
    parser.add_argument(
        "instructions", type=str, required=False, help="Instructions for the recipe"
    )
    parser.add_argument(
        "banner_image", type=str, required=False, help="Banner image URL for the recipe"
    )
    parser.add_argument("user_id", type=int, required=True, help="User ID is required")
    parser.add_argument(
        "cuisine",
        type=str,
        choices=[
            "ITALIAN",
            "MEXICAN",
            "INDIAN",
            "CHINESE",
            "JAPANESE",
            "FRENCH",
            "AMERICAN",
            "THAI",
            "OTHER",
        ],
        required=False,
        help="Cuisine type",
    )
    parser.add_argument(
        "diet",
        type=str,
        choices=["VEGETARIAN", "VEGAN", "GLUTEN_FREE", "PALEO", "KETO", "OTHER"],
        required=False,
        help="Diet type",
    )
    parser.add_argument("prepTime", type=int, required=False, help="Preparation time")
    parser.add_argument("cookTime", type=int, required=False, help="Cooking time")
    parser.add_argument("servings", type=int, required=False, help="Servings")
    parser.add_argument(
        "level",
        type=str,
        choices=["EASY", "MEDIUM", "HARD"],
        required=False,
        help="Difficulty level",
    )
    parser.add_argument(
        "ingredients",
        type=list,
        location="json",
        required=False,
        help="List of ingredients",
    )
    parser.add_argument(
        "other_images",
        type=list,
        location="json",
        required=False, 
        help="List of other images",
    )
    
    def get(self): 
        recipes = Recipe.query.all()
        return jsonify([recipe.to_dict() for recipe in recipes])
    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()
        args = RecipeListResource.parser.parse_args()
        try:
            print("Adding recipe")
            recipe = Recipe(
                title=args["title"],
                description=args.get("description"),
                instructions=args.get("instructions"),
                banner_image=args.get("banner_image"),
                user_id=current_user['id'],
                cuisine=Cuisine[args["cuisine"]] if args.get("cuisine") else None,
                diet=Diet[args["diet"]] if args.get("diet") else None,
                prepTime=args.get("prepTime"),
                cookTime=args.get("cookTime"),
                servings=args.get("servings"),
                level=Level[args["level"]] if args.get("level") else None,
            )

            db.session.add(recipe)
            db.session.commit()

            if args.get("ingredients"):
                for ingredient_data in args["ingredients"]:
                    ingredient = Ingredient(
                        name=ingredient_data["name"],
                        image=ingredient_data.get("image"),
                        quantity=ingredient_data.get("quantity"),
                        recipe_id=recipe.id,
                    )
                    db.session.add(ingredient)

            if args.get("other_images"):
                for image_data in args["other_images"]:
                    other_image = OtherRecipeImages(
                        image=image_data["image"],
                        name=image_data.get("name"),
                        recipe_id=recipe.id,
                    )
                    db.session.add(other_image)

            db.session.commit()

            return recipe.to_dict(), 201

        except IntegrityError:
            db.session.rollback()
            return {"error": "Failed to add recipe"}, 400

#recipes that belong to a user
class UserRecipeListResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()['id']
        recipes = Recipe.query.filter_by(user_id=user_id).all()
        return [recipe.to_dict() for recipe in recipes]
class IngredientResource(Resource):
    def get(self, recipe_id, ingredient_id):
        recipe = Recipe.query.get(recipe_id)
        if not recipe:
            return {"error": "Recipe not found"}, 404

        ingredient = Ingredient.query.filter_by(
            id=ingredient_id, recipe_id=recipe_id
        ).first()
        if ingredient:
            return {
                "id": ingredient.id,
                "name": ingredient.name,
                "image": ingredient.image,
                "quantity": ingredient.quantity,
            }, 200
        return {"error": "Ingredient not found"}, 404

    def put(self, recipe_id, ingredient_id):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "name", type=str, required=True, help="Name cannot be blank!"
        )
        parser.add_argument("image", type=str, required=False)
        parser.add_argument("quantity", type=str, required=False)
        data = parser.parse_args()

        recipe = Recipe.query.get(recipe_id)
        if not recipe:
            return {"error": "Recipe not found"}, 404

        ingredient = Ingredient.query.filter_by(
            id=ingredient_id, recipe_id=recipe_id
        ).first()
        if not ingredient:
            return {"error": "Ingredient not found"}, 404

        try:
            ingredient.name = data["name"]
            ingredient.image = data.get("image", ingredient.image)
            ingredient.quantity = data.get("quantity", ingredient.quantity)

            db.session.commit()
            return {
                "id": ingredient.id,
                "name": ingredient.name,
                "image": ingredient.image,
                "quantity": ingredient.quantity,
            }, 200
        except ValueError as e:
            return {"error": str(e)}, 400

    def delete(self, recipe_id, ingredient_id):
        recipe = Recipe.query.get(recipe_id)
        if not recipe:
            return {"error": "Recipe not found"}, 404

        ingredient = Ingredient.query.filter_by(
            id=ingredient_id, recipe_id=recipe_id
        ).first()
        if ingredient:
            db.session.delete(ingredient)
            db.session.commit()
            return {"message": "Ingredient deleted"}, 200
        return {"error": "Ingredient not found"}, 404


class IngredientListResource(Resource):
    def post(self, recipe_id):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "name", type=str, required=True, help="Name cannot be blank!"
        )
        parser.add_argument("image", type=str, required=False)
        parser.add_argument("quantity", type=str, required=False)
        data = parser.parse_args()

        recipe = Recipe.query.get(recipe_id)
        if not recipe:
            return {"error": "Recipe not found"}, 404

        try:
            new_ingredient = Ingredient(
                name=data["name"],
                image=data.get("image"),
                quantity=data.get("quantity"),
                recipe_id=recipe_id,
            )
            db.session.add(new_ingredient)
            db.session.commit()

            return {
                "id": new_ingredient.id,
                "name": new_ingredient.name,
                "image": new_ingredient.image,
                "quantity": new_ingredient.quantity,
                "recipe_id": new_ingredient.recipe_id,
            }, 201
        except Exception as e:
            return {"error": str(e)}, 400



