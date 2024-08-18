from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import validates, relationship
from sqlalchemy_serializer import SerializerMixin
from database import db
from datetime import datetime



class UserModel(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(80), nullable=False)
    lastname = db.Column(db.String(80), nullable=False)
    password_hash = db.Column(db.String(500), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    username = db.Column(db.String(80), nullable=True)
    image_url = db.Column(db.String)
    bio = db.Column(db.String)
    country = db.Column(db.String)
    gender = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    is_admin = db.Column(db.Boolean, default=False)
    
    recipes = relationship(
        "Recipe", back_populates="user", cascade="all, delete-orphan"
    )
    comments = db.relationship(
        "Comment", back_populates="user", cascade="all, delete-orphan"
    )
    comment_responses = db.relationship(
        "CommentResponse", back_populates="user", cascade="all, delete-orphan"
    )
    ratings = db.relationship(
        "Rating", back_populates="user", cascade="all, delete-orphan"
    )
    bookmarks = db.relationship(
        "Bookmark", back_populates="user", cascade="all, delete-orphan"
    )

    @validates("firstname")
    def validate_firstname(self, key, firstname):
        if not firstname:
            raise ValueError("First name is required")
        return firstname

    @validates("lastname")
    def validate_lastname(self, key, lastname):
        if not lastname:
            raise ValueError("Last name is required")
        return lastname

    @validates("email")
    def validate_email(self, key, email):
        if not email:
            raise ValueError("Email is required")
        if UserModel.query.filter_by(email=email).first():
            raise ValueError("The email you are trying to use is already in use.")
        return email

    def __repr__(self):
        return f"<User {self.firstname} {self.lastname} {self.email} {self.username} {self.country} {self.gender} {self.bio} {self.image_url}>"

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @classmethod
    def create_user(cls, firstname, lastname, password, email, is_admin=False):
        new_user = cls(
            firstname=firstname, lastname=lastname, email=email, is_admin=is_admin
        )
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @classmethod
    def get_user(cls, user_id):
        return cls.query.get(user_id)

    @classmethod
    def get_user_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    @classmethod
    def get_all_users(cls):
        return cls.query.all()

    @classmethod
    def update_user(
        cls,
        user_id,
        firstname=None,
        lastname=None,
        password=None,
        email=None,
        is_admin=None,
    ):
        user = cls.query.get(user_id)
        if not user:
            return None
        if firstname:
            user.firstname = firstname
        if lastname:
            user.lastname = lastname
        if email:
            if (
                cls.query.filter_by(email=email).first()
                and cls.query.filter_by(email=email).first().id != user_id
            ):
                raise ValueError("Email must be unique")
            user.email = email
        if password:
            user.set_password(password)
        if is_admin is not None:
            user.is_admin = is_admin
        db.session.commit()
        return user

    @classmethod
    def delete_user(cls, user_id):
        user = cls.query.get(user_id)
        if not user:
            return None
        db.session.delete(user)
        db.session.commit()
        return user

    def json(self):
        return {
            "id": self.id,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "email": self.email,
            "is_admin": self.is_admin,
        }
class Bookmark(db.Model):
    __tablename__ = "bookmarks"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipes.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("UserModel", back_populates="bookmarks")
    recipe = db.relationship("Recipe", back_populates="bookmarks")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "recipe_id": self.recipe_id,
            "recipe": {
                "id": self.recipe.id,  # Include basic recipe data
                "title": self.recipe.title,  # Add desired recipe fields (optional)
                "created_at": self.recipe.created_at.isoformat() if self.recipe.created_at else None,  # Convert datetime
            },
        }