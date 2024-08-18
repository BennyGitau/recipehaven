from flask_restful import Resource, reqparse
from models.recipe import Recipe
from models.engagement import Comment, CommentResponse, Rating
from models.user import UserModel
from database import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import cross_origin
class CommentResource(Resource):
    def get(self, recipe_id, comment_id):
        comment = Comment.query.filter_by(id=comment_id, recipe_id=recipe_id).first()
        if comment:
            return {
                "id": comment.id,
                "text": comment.text,
                "recipe_id": comment.recipe_id,
                "user_id": comment.user_id,
                "responses": [
                    {"id": response.id, "text": response.text}
                    for response in comment.responses
                ],
                "timestamp": comment.timestamp.isoformat(),
            }, 200
        return {"error": "Comment not found"}, 404

    def put(self, recipe_id, comment_id):
        parser = reqparse.RequestParser()
        parser.add_argument(
            "text", type=str, required=True, help="Text cannot be blank!"
        )
        data = parser.parse_args()

        comment = Comment.query.filter_by(id=comment_id, recipe_id=recipe_id).first()
        if not comment:
            return {"error": "Comment not found"}, 404

        try:
            comment.text = data["text"]
            db.session.commit()
            return {
                "id": comment.id,
                "text": comment.text,
                "recipe_id": comment.recipe_id,
                "user_id": comment.user_id,
                "timestamp": comment.timestamp.isoformat(),
            }, 200
        except ValueError as e:
            return {"error": str(e)}, 400

    def delete(self, recipe_id, comment_id):
        comment = Comment.query.filter_by(id=comment_id, recipe_id=recipe_id).first()
        if not comment:
            return {"error": "Comment not found"}, 404

        db.session.delete(comment)
        db.session.commit()
        return {"message": "Comment deleted"}, 200


class CommentListResource(Resource):
    def get(self, recipe_id):

        recipe = Recipe.query.get(recipe_id)
        if not recipe:
            return {"error": "Recipe not found"}, 404

        comments = Comment.query.filter_by(recipe_id=recipe_id).all()

        comments_data = []
        for comment in comments:
            responses = [
                {
                    "id": response.id,
                    "text": response.text,
                    "user_id": response.user_id,
                    "fullname": response.user.json(),
                    "timestamp": response.timestamp.isoformat(),
                }
                for response in comment.responses
            ]
            comments_data.append(
                {
                    "id": comment.id,
                    "text": comment.text,
                    "user_id": comment.user_id,
                    "timestamp": comment.timestamp.isoformat(),
                    "responses": responses,
                }
            )

        return comments_data, 200
class CommentListResource(Resource):
    @jwt_required()
    def post(self, recipe_id):
        userId = get_jwt_identity()['id']

        parser = reqparse.RequestParser()
        parser.add_argument(
            "text", type=str, required=True, help="Text cannot be blank!"
        )
        data = parser.parse_args()

        recipe = Recipe.query.get(recipe_id)
        if not recipe:
            return {"error": "Recipe not found"}, 404

        user = UserModel.query.get(userId)  # Use userId from JWT
        if not user:
            return {"error": "User not found"}, 404

        try:
            comment = Comment(text=data["text"], recipe_id=recipe_id, user_id=userId)
            db.session.add(comment)
            db.session.commit()

            return {
                "id": comment.id,
                "text": comment.text,
                "recipe_id": comment.recipe_id,
                "user_id": comment.user_id,
                "timestamp": comment.timestamp.isoformat(),
            }, 201
        except ValueError as e:
            return {"error": str(e)}, 400
        except Exception as e:
            return {"error": "An unexpected error occurred"}, 500


class CommentResponseResource(Resource):

    def get(self, recipe_id, comment_id, response_id):

        response = CommentResponse.query.filter_by(
            id=response_id, comment_id=comment_id
        ).first()
        if response:
            return {
                "id": response.id,
                "text": response.text,
                "comment_id": response.comment_id,
                "user_id": response.user_id,
                "timestamp": response.timestamp.isoformat(),
            }, 200
        return {"error": "Response not found"}, 404

    def put(self, recipe_id, comment_id, response_id):
        """
        Update a specific response.
        """
        parser = reqparse.RequestParser()
        parser.add_argument(
            "text", type=str, required=True, help="Text cannot be blank!"
        )
        data = parser.parse_args()

        response = CommentResponse.query.filter_by(
            id=response_id, comment_id=comment_id
        ).first()
        if not response:
            return {"error": "Response not found"}, 404

        try:
            response.text = data["text"]
            db.session.commit()
            return {
                "id": response.id,
                "text": response.text,
                "comment_id": response.comment_id,
                "user_id": response.user_id,
                "timestamp": response.timestamp.isoformat(),
            }, 200
        except ValueError as e:
            return {"error": str(e)}, 400

    def delete(self, recipe_id, comment_id, response_id):
 
        response = CommentResponse.query.filter_by(
            id=response_id, comment_id=comment_id
        ).first()
        if not response:
            return {"error": "Response not found"}, 404

        db.session.delete(response)
        db.session.commit()
        return {"message": "Response deleted"}, 200


class CommentResponseListResource(Resource):
    @jwt_required()
    def post(self, recipe_id, comment_id):
        userId = get_jwt_identity()['id']
        parser = reqparse.RequestParser()
        parser.add_argument(
            "text", type=str, required=True, help="Text cannot be blank!"
        )
        data = parser.parse_args()

        comment = Comment.query.get(comment_id)
        if not comment:
            return {"error": "Comment not found"}, 404

        user = UserModel.query.get(userId)
        if not user:
            return {"error": "User not found"}, 404

        try:
            response = CommentResponse(
                text=data["text"], comment_id=comment_id, user_id=userId
            )
            db.session.add(response)
            db.session.commit()

            return {
                "id": response.id,
                "text": response.text,
                "comment_id": response.comment_id,
                "user_id": response.user_id,
                "timestamp": response.timestamp.isoformat(),
            }, 201
        except ValueError as e:
            return {"error": str(e)}, 400
        except Exception as e:
            return {"error": "An unexpected error occurred"}, 500


class RatingResource(Resource):
    @jwt_required()
    def get(self, recipe_id):
        userId = get_jwt_identity()['id']
        rating = Rating.query.filter_by(recipe_id=recipe_id, user_id=userId).first()
        if not rating:
            return {"message": "Rating not found"}, 404
        return rating.to_dict()
    
    @jwt_required()   
    def post(self, recipe_id):
        userId = get_jwt_identity()['id']
        parser = reqparse.RequestParser()
        parser.add_argument("value", type=int, required=True, help="Rating value is required")
        args = parser.parse_args()

        existing_rating = Rating.query.filter_by(recipe_id=recipe_id, user_id=userId).first()
        if existing_rating:
            return {"error": "User has already rated this recipe"}, 400


        try:
            new_rating = Rating(
                value=args["value"], recipe_id=recipe_id, user_id=userId
            )
            db.session.add(new_rating)
            db.session.commit()
            return {"message": "Rating created", "id": new_rating.to_dict()}, 201
        except ValueError as e:
            return {"error": str(e)}, 400
        
    @jwt_required()
    def put(self, recipe_id, rating_id):
        userId = get_jwt_identity()['id']
        parser = reqparse.RequestParser()
        
        parser.add_argument(
            "value", type=int, required=True, help="Rating value is required"
        )
        args = parser.parse_args()

        rating = Rating.query.filter_by(id=rating_id,recipe_id=recipe_id, user_id=userId).first()
        if not rating:
            return {"message": "Rating not found"}, 404

        rating.value = args["value"]
        db.session.commit()

        return {"message": "Rating updated"}
    @jwt_required
    def delete(self, recipe_id, rating_id):
        userId = get_jwt_identity()['id']
        rating = Rating.query.filter_by(id=rating_id, recipe_id=recipe_id, user_id=userId).first()
        if not rating:
            return {"message": "Rating not found"}, 404

        db.session.delete(rating)
        db.session.commit()

        return {"message": "Rating deleted"}


class RatingListResource(Resource):
    def get(self, recipe_id):
        ratings = Rating.query.filter_by(recipe_id=recipe_id).all()
        if ratings:
            return [rating.to_dict() for rating in ratings], 200
        return {"message": "No ratings found"}, 404


