# Set up your API keys

# Set up OpenAI API key

import requests
from flask import jsonify, request
from flask_restful import Resource

SPOONACULAR_API_KEY = '1ffb7f0b91df40e589a6c007e8fdcb2c'
class GetRecipe(Resource):
        def post(self):
            data = request.json
            ingredients = data.get('ingredients')

            if not ingredients:
                return jsonify({'success': False, 'message': 'Ingredients are required'}), 400

            spoonacular_url = f'https://api.spoonacular.com/recipes/findByIngredients?ingredients={",+".join(ingredients)}&number=3&apiKey={SPOONACULAR_API_KEY}'
            spoonacular_response = requests.get(spoonacular_url)

            if spoonacular_response.status_code != 200:
                return jsonify({'success': False, 'message': 'Error fetching recipes'}), 500

            recipe_data = spoonacular_response.json()
            recipe_list= []

            for recipe in recipe_data:
                 recipe_details = {
                     'title': recipe.get('title'),
                     'image': recipe.get('image'),
                     'mightNeedIngredients': recipe.get('missedIngredients'),
                     'cookTime': recipe.get('readyInMinutes'),
                     'ingredients': recipe.get('usedIngredients')
                 }

                 recipe_list.append(recipe_details)

            return jsonify({'success': True, 'recipes': recipe_list})
  