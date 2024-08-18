import secrets
from flask import Flask, jsonify
from flasgger import Swagger
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from database import db
from dotenv import load_dotenv
import os

from resources.user import (
    RegisterResource,
    LoginResource,
    ResetPasswordResource,
    UserResource,
    UserListResource,
    UpdateUserResource,
    BookmarkResource,
    BookmarkListResource,
)
from resources.recipe import (
    IngredientResource,
    RecipeResource,
    RecipeListResource,
    UserRecipeListResource,
)
   
from resources.engagement import (
    CommentResource,
    CommentListResource,
    CommentResponseListResource,
    CommentResponseResource,
    RatingResource,
    RatingListResource,
)
from resources.getRecipe import GetRecipe


load_dotenv()
app = Flask(__name__)
CORS(app)


app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = (
    f"a1d3c56531737{secrets.token_hex(4)}cf62bc36a7e30cd871d7{secrets.token_hex(4)}7b5b51e8208b8cef{secrets.token_hex(4)}c2689e8c0cb412b"
)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False

db.init_app(app)

api = Api(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
swagger = Swagger(app)


# auth
api.add_resource(RegisterResource, "/api/register")
api.add_resource(LoginResource, "/api/login")
api.add_resource(ResetPasswordResource, "/reset-password")
api.add_resource(UserResource, "/api/users/<string:identifier>")
api.add_resource(UserListResource, "/api/users")
api.add_resource(UpdateUserResource, "/api/profile")
# recipes
api.add_resource(RecipeListResource, "/api/recipes")
api.add_resource(RecipeResource, "/api/recipes/<int:recipe_id>")
api.add_resource(UserRecipeListResource, "/api/user-recipes")
api.add_resource(GetRecipe, "/api/get-recipe")
# ingredients
api.add_resource(
    IngredientResource, "/api/recipes/<int:recipe_id>/ingredients/<int:ingredient_id>"
)
# comments
api.add_resource(CommentListResource, "/api/recipes/<int:recipe_id>/comments")
api.add_resource(
    CommentResource, "/api/recipes/<int:recipe_id>/comments/<int:comment_id>"
)
# responses
api.add_resource(
    CommentResponseListResource,
    "/api/recipes/<int:recipe_id>/comments/<int:comment_id>/responses",
)
api.add_resource(
    CommentResponseResource,
    "/api/recipes/<int:recipe_id>/comments/<int:comment_id>/responses/<int:response_id>",
)

# Bookmarks
api.add_resource(BookmarkListResource, "/api/bookmarks", "/api/bookmarks/<int:recipe_id>")
api.add_resource(
    BookmarkResource,
    "/api/users/<int:user_id>/bookmarks/<int:bookmark_id>",
)

# ratings
# api.add_resource(RatingListResource, "/api/recipes/<int:recipe_id>/ratings")
api.add_resource(RatingResource, "/api/recipes/<int:recipe_id>/rating" , "/api/recipes/<int:recipe_id>/ratings", "/api/recipes/<int:recipe_id>/ratings/<int:rating_id>")


# Test route
class Welcome(Resource):
    def get(self):
        return jsonify({"message": "Hello. Welcome to recipeHapen, The best recipe website in the  World!"})
api.add_resource(Welcome, "/hello")


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run()
