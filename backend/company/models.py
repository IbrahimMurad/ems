from core.basemodel import BaseModel
from django.db import models


class Company(BaseModel):
    name = models.CharField(
        max_length=200,
        unique=True,
        db_index=True,
    )
    number_of_departments = models.PositiveIntegerField(default=0)
    number_of_employees = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Company"
        verbose_name_plural = "Companies"
        ordering = ["-created_at"]
