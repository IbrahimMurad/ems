from company.models import Company
from core.basemodel import BaseModel
from django.db import models


class Department(BaseModel):
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="departments",
        related_query_name="department",
        db_index=True,
    )
    name = models.CharField(max_length=255, db_index=True)
    number_of_employees = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.company.name} - {self.name}"

    class Meta:
        verbose_name = "Department"
        verbose_name_plural = "Departments"
        ordering = ["company", "name"]
        unique_together = ["company", "name"]
