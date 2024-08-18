from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from database import db



class CookingTip(db.Model):
    __tablename__ = "cooking_tips"

    id=db.Column(db.Integer, primary_key=True, autoincrement=True)
    title=db.Column(db.String(80), nullable=False)
    content=db.Column(db.Text)
    user_id=db.Column(db.Integer, db.ForeignKey("users.id"))

    user=db.relationship("User", back_populates="cooking_tips")

 


class Comment(db.Model):
    __tablename__ = "comments"

    id=db.Column(db.Integer, primary_key=True, autoincrement=True)
    content=db.Column(db.Text, nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey("users.id"))
    recipe_id=db.Column(db.Integer, db.ForeignKey("recipes.id"))

    user=db.relationship("User", back_populates="comments")
    recipe=db.relationship("Recipe", back_populates="comments")

class Bookmark(db.Model):
    __tablename__ = "bookmarks"

    id=db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id=db.Column(db.Integer, db.ForeignKey("users.id"))
    recipe_id=db.Column(db.Integer, db.ForeignKey("recipes.id"))

    user=db.relationship("User", back_populates="bookmarks")
    recipe=db.relationship("Recipe", back_populates="bookmarks")
