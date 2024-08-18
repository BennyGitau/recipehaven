from enum import Enum
from sqlalchemy.orm import validates
from sqlalchemy import Enum as SqlEnum
from database import db
from .user import UserModel, Bookmark
from sqlalchemy_serializer import SerializerMixin


class Cuisine(Enum):
    ITALIAN = "Italian"
    MEXICAN = "Mexican"
    INDIAN = "Indian"
    CHINESE = "Chinese"
    JAPANESE = "Japanese"
    FRENCH = "French"
    AMERICAN = "American"
    BRAZILIAN = "Brazilian"
    ASIAN = "Asian"
    THAI = "Thai"
    OTHER = "Other"


class Diet(Enum):
    VEGETARIAN = "Vegetarian"
    VEGAN = "Vegan"
    GLUTEN_FREE = "Gluten Free"
    PALEO = "Paleo"
    KETO = "Keto"
    OTHER = "Other"


class Level(Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"


class Recipe(db.Model, SerializerMixin):
    __tablename__ = "recipes"
    serialize_rules = ("-user.bookmarks", "-user.comments")

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(256), nullable=False)
    description = db.Column(db.Text, nullable=True)
    instructions = db.Column(db.Text, nullable=True)
    banner_image = db.Column(db.String(256), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    cuisine = db.Column(SqlEnum(Cuisine), nullable=True)
    diet = db.Column(SqlEnum(Diet), nullable=True)
    prepTime = db.Column(db.String(20), nullable=True)
    cookTime = db.Column(db.String(20), nullable=True)
    servings = db.Column(db.String(20)  , nullable=True)
    level = db.Column(SqlEnum(Level), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime, server_default=db.func.now(), onupdate=db.func.now()
    )

    user = db.relationship("UserModel", back_populates="recipes")
    ingredients = db.relationship(
        "Ingredient", back_populates="recipe", cascade="all, delete-orphan"
    )
    comments = db.relationship(
        "Comment", back_populates="recipe", cascade="all, delete-orphan"
    )
    ratings = db.relationship(
        "Rating", back_populates="recipe", cascade="all, delete-orphan"
    )
    other_images = db.relationship(
        "OtherRecipeImages", back_populates="recipe", cascade="all, delete-orphan"
    )
    bookmarks = db.relationship(
        "Bookmark", back_populates="recipe", cascade="all, delete-orphan"
    )

    @validates("title")
    def validate_title(self, key, title):
        if not title:
            raise ValueError("Title is required")
        return title

    def __repr__(self):
        return f"<Recipe(title={self.title}, user_id={self.user_id})>"

    def to_dict(self, only=None):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "instructions": self.instructions,
            "banner_image": self.banner_image,
            "user_id": self.user_id,
            "author": self.user.json(),
            'created_at': self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "cuisine": self.cuisine.value if self.cuisine else None,
            "diet": self.diet.value if self.diet else None,
            "prepTime": self.prepTime if self.prepTime else None,
            "cookTime": self.cookTime if self.cookTime else None,
            "servings": self.servings if self.servings else None,
            "level": self.level.value if self.level else None,
            "rating" : (round(sum([rating.value for rating in self.ratings]) / len(self.ratings), 1)
                        if self.ratings
                        else 0
                        ),
            "comments": [comment.to_dict() for comment in self.comments],
            "ingredients": [ingredient.to_dict() for ingredient in self.ingredients],
            "other_images": [image.to_dict() for image in self.other_images],
            "bookmarks": [bookmark.to_dict() for bookmark in self.bookmarks],
        }



class Ingredient(db.Model):
    __tablename__ = "ingredients"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(256), nullable=False)
    quantity = db.Column(db.String(256), nullable=True)
    image = db.Column(db.String(256), nullable=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)

    recipe = db.relationship("Recipe", back_populates="ingredients")

    def __repr__(self):
        return f"<Ingredient(name={self.name}, recipe_id={self.recipe_id})>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "quantity": self.quantity,
        }



class OtherRecipeImages(db.Model):
    __tablename__ = "other_recipe_images"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    image = db.Column(db.String(256), nullable=False)
    name = db.Column(db.String(256), nullable=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)

    recipe = db.relationship("Recipe", back_populates="other_images")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
        }

    def __repr__(self):
        return f"<OtherRecipeImages(image={self.image}, recipe_id={self.recipe_id})>"
