from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models


class User(AbstractUser):

    class UserManager(UserManager):
        def create_superuser(self, username, email, password, **extra_fields):
            extra_fields.setdefault("role", User.RoleChoices.ADMIN)
            return super().create_superuser(username, email, password, **extra_fields)

    objects = UserManager()

    class RoleChoices(models.TextChoices):
        ADMIN = "admin", "Admin"
        MANAGER = "manager", "Manager"
        EMPLOYEE = "employee", "Employee"

    email = models.EmailField(
        "email address",
        unique=True,
        error_messages={
            "unique": "A user with that email already exists.",
        },
    )

    username = models.CharField(
        "username",
        max_length=150,
        help_text="Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.",
        validators=[AbstractUser.username_validator],
    )

    role = models.CharField(
        "role", max_length=20, choices=RoleChoices.choices, default=RoleChoices.EMPLOYEE
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        verbose_name = "User Account"
        verbose_name_plural = "User Accounts"

    def __str__(self) -> str:
        return self.email

    @property
    def is_admin(self) -> bool:
        return self.role == self.RoleChoices.ADMIN

    @property
    def is_manager(self) -> bool:
        return self.role == self.RoleChoices.MANAGER

    @property
    def is_employee(self) -> bool:
        return self.role == self.RoleChoices.EMPLOYEE

    def save(self, *args, **kwargs) -> None:
        self.full_clean()
        return super().save(*args, **kwargs)

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}".strip() or self.username
