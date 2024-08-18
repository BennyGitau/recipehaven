from sqlalchemy.orm import validates
from database import db


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.Text, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    timestamp = db.Column(
        db.DateTime, default=db.func.current_timestamp(), nullable=False
    )

    recipe = db.relationship("Recipe", back_populates="comments")
    user = db.relationship("UserModel", back_populates="comments")
    responses = db.relationship("CommentResponse", back_populates="comment", cascade="all, delete", passive_deletes=True)

    def __repr__(self):
        return f"<Comment(user_id={self.user_id}, recipe_id={self.recipe_id}, timestamp={self.timestamp})>"

    @validates("text")
    def validate_text(self, key, text):
        if not text:
            raise ValueError("Comment text is required")
        return text
    def to_dict(self):
        return {
            "id": self.id,
            "text": self.text,
            "recipe_id": self.recipe_id,
            "user_id": self.user_id,
            "fullname": f"{self.user.json()['firstname']} {self.user.json()['lastname']}",
            "timestamp": self.timestamp.isoformat(),
            "responses": [response.to_dict() for response in self.responses],
        }


class CommentResponse(db.Model):
    __tablename__ = "comment_responses"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    text = db.Column(db.Text, nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    timestamp = db.Column(
        db.DateTime, default=db.func.current_timestamp(), nullable=False
    )

    comment = db.relationship("Comment", back_populates="responses")
    user = db.relationship("UserModel", back_populates="comment_responses")

    def __repr__(self):
        return f"<CommentResponse(user_id={self.user_id}, comment_id={self.comment_id}, timestamp={self.timestamp})>"
    def to_dict(self):
        return {
            "id": self.id,
            "text": self.text,
            "comment_id": self.comment_id,
            "user_id": self.user_id,
            "fullname": f"{self.user.json()['firstname']} {self.user.json()['lastname']}",
            "timestamp": self.timestamp.isoformat(),
        }

class Rating(db.Model):
    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    value = db.Column(db.Integer, nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    timestamp = db.Column(
        db.DateTime, default=db.func.current_timestamp(), nullable=False
    )

    recipe = db.relationship("Recipe", back_populates="ratings")
    user = db.relationship("UserModel", back_populates="ratings")

    def __repr__(self):
        return f"<Rating(user_id={self.user_id}, recipe_id={self.recipe_id}, value={self.value}, timestamp={self.timestamp})>"

    @validates("value")
    def validate_value(self, key, value):
        if not (1 <= value <= 5):
            raise ValueError("Rating value must be between 1 and 5")
        return value
    
    def to_dict(self):
        return {
            "id": self.id,
            "value": self.value,
            "recipe_id": self.recipe_id,
            "user_id": self.user_id,
            "timestamp": self.timestamp.isoformat(),
        }
    