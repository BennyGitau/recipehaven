from datetime import timedelta
from flask_restful import Resource, reqparse
from models.user import UserModel, Bookmark
from models.recipe import Recipe
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
)
from flask import jsonify, request, make_response
from database import db


class RegisterResource(Resource):
    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument(
            "firstname", type=str, required=True, help="First name cannot be blank!"
        )
        parser.add_argument(
            "lastname", type=str, required=True, help="Last name cannot be blank!"
        )
        parser.add_argument(
            "password", type=str, required=True, help="Password cannot be blank!"
        )
        parser.add_argument(
            "email", type=str, required=True, help="Email cannot be blank!"
        )
        parser.add_argument(
            "is_admin", type=bool, required=False, default=False, help="Is admin flag"
        )
        data = parser.parse_args()

        if UserModel.get_user_by_email(data["email"]):
            return {"error": "Email already in use"}, 400

        try:
            new_user = UserModel.create_user(
                data["firstname"],
                data["lastname"],
                data["password"],
                data["email"],
                data["is_admin"],
            )
            return new_user.json(), 201
        except ValueError as e:
            return {"error": str(e)}, 400


class LoginResource(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "email", type=str, required=True, help="Email cannot be blank!"
        )
        parser.add_argument(
            "password", type=str, required=True, help="Password cannot be blank!"
        )
        data = parser.parse_args()

        user = UserModel.get_user_by_email(data["email"])
        if user and user.check_password(data["password"]):
            access_token = create_access_token(
                identity={'id':user.id}, expires_delta=timedelta(hours=5)
            )
            refresh_token = create_refresh_token(
                identity={'id':user.id}, expires_delta=timedelta(hours=5)
            )
            user_data = {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "image_url": user.image_url,
                "is_admin": user.is_admin,
                "country": user.country,
                "gender": user.gender,
                "bio": user.bio,
            }

            return {
                "access_token": access_token,
                "refresh_token": refresh_token,
                "email": user.email,
                "user": user_data, 
                "success": "Login successful",
            }, 200
        return {"error": "Invalid email or password"}, 401



class ResetPasswordResource(Resource):
    def post(self):

        parser = reqparse.RequestParser()
        parser.add_argument(
            "email", type=str, required=True, help="Email cannot be blank!"
        )
        parser.add_argument(
            "new_password",
            type=str,
            required=True,
            help="New password cannot be blank!",
        )
        data = parser.parse_args()

        user = UserModel.get_user_by_email(data["email"])
        if not user:
            return {"error": "User not found"}, 404

        user.set_password(data["new_password"])
        db.session.commit()
        return {"success": "Password reset successful"}, 200

class UpdateUserResource(Resource):
    @jwt_required()
    def patch(self):
        current_user = get_jwt_identity()
        user = UserModel.get_user(current_user['id'])

        if not user:
            return {'error': 'User not found'}, 404
        data = request.get_json()

        if data.get('firstname'):
            user.firstname = data['firstname']
        if data.get('lastname'):
            user.lastname = data['lastname']
        if data.get('username'):
            user.username = data['username']
        if data.get('is_admin') is not None: 
            user.is_admin = data['is_admin']
        if data.get('bio'):
            user.bio = data['bio']
        if data.get('image'):
            user.image_url = data['image']
        if data.get('country'):  
            user.country = data['country']
        if data.get('password'):
            user.set_password(data['password'])

        db.session.commit()
        return {'success': 'User updated successfully', 'user': user.to_dict(only=['id', 'firstname', 'lastname', 'email', 'gender', 'username', 'bio', 'image_url', 'country'])}, 200

class UserResource(Resource):
    def get(self, identifier):

        # Try to get the user by ID, username, or email
        if identifier.isdigit():
            user = UserModel.query.filter_by(id=int(identifier)).first()
        else:
            user = (
                UserModel.query.filter_by(username=identifier).first() or
                UserModel.query.filter_by(email=identifier).first()
            )
        access_token = create_access_token(
                identity={'id':user.id}, expires_delta=timedelta(hours=5)
            )
        if user:
            return {
                "access_token": access_token,
                "id": user.id,
                "firstname": user.firstname,
                "lastname": user.lastname,
                "email": user.email,
                "username": user.username,
                "image_url": user.image_url,
                "is_admin": user.is_admin,
                "country": user.country,
                "gender": user.gender,
                "bio": user.bio,
            }, 200

        return {"error": "User not found"}, 404

    def put(self, user_id):

            parser = reqparse.RequestParser()
            parser.add_argument("firstname", type=str)
            parser.add_argument("lastname", type=str)
            parser.add_argument("password", type=str)
            parser.add_argument("email", type=str)
            parser.add_argument("is_admin", type=bool)
            data = parser.parse_args()

            try:
                updated_user = UserModel.update_user(
                    user_id,
                    firstname=data["firstname"],
                    lastname=data["lastname"],
                    password=data["password"],
                    email=data["email"],
                    is_admin=data["is_admin"],
                )
                if updated_user:
                    return updated_user.json()
                return {"message": "User not found"}, 404
            except ValueError as e:
                return {"message": str(e)}, 400

    def delete(self, user_id):

            user = UserModel.get_user(user_id)
            if user:
                UserModel.delete_user(user_id)
                return {"message": "User deleted"}
            return {"message": "User not found"}, 404


class UserListResource(Resource):
    def get(self):

        users = UserModel.get_all_users()
        return [user.json() for user in users], 200
class BookmarkResource(Resource):
    def delete(self, user_id, bookmark_id):

        bookmark = Bookmark.query.filter_by(id=bookmark_id, user_id=user_id).first()
        if bookmark:
            db.session.delete(bookmark)
            db.session.commit()
            return {"message": "Bookmark deleted"}, 200
        return {"error": "Bookmark not found"}, 404


class BookmarkListResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()['id']

        bookmarks = Bookmark.query.filter_by(user_id=user_id).all()
        if not bookmarks:
            return {"message": "No bookmarks found"}, 404

        bookmarked_recipes = [bookmark.recipe.to_dict() for bookmark in bookmarks]

        return bookmarked_recipes

    @jwt_required()
    def post(self):
        current_user = get_jwt_identity()

        parser = reqparse.RequestParser()
        parser.add_argument(
            "recipe_id", type=int, required=True, help="Recipe ID is required"
        )
        args = parser.parse_args()
        recipe = Recipe.query.get(args["recipe_id"])
        if not recipe:
            return {"error": "Recipe not found"}, 400
        bookMarked = Bookmark.query.filter_by(user_id=current_user['id'], recipe_id=recipe.id).first()
        if bookMarked:
            return {"error": "Recipe already bookmarked"}, 400

        new_bookmark = Bookmark(user_id=current_user['id'], recipe_id=recipe.id)
        db.session.add(new_bookmark)
        db.session.commit()

        return {"id": new_bookmark.id, "recipe_id": new_bookmark.recipe.id}, 201
    
    @jwt_required()
    def delete(self, recipe_id):
        user_id = get_jwt_identity()['id']
        bookmark = Bookmark.query.filter_by(recipe_id=recipe_id, user_id=user_id).first()
        if bookmark:
            db.session.delete(bookmark)
            db.session.commit()
            return {"message": "Bookmark deleted"}, 200
        return {"error": "Bookmark not found"}, 404