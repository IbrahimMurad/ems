from django.db import models

from company.models import Company
from core.basemodel import BaseModel
from department.models import Department


class Employee(BaseModel):

    class StatusChoices(models.TextChoices):
        APPLICATION_RECEIVED = "application recieved", "Application Received"
        INTERVIEW_SCHEDULED = "interview scheduled", "Interview Scheduled"
        HIRED = "hired", "Hired"
        NOT_ACCEPTED = "not accepted", "Not Accepted"

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="employees",
        related_query_name="employee",
    )
    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name="employees",
        related_query_name="employee",
    )

    status = models.CharField(
        max_length=24,
        choices=StatusChoices.choices,
        default=StatusChoices.APPLICATION_RECEIVED,
    )
    name = models.CharField(max_length=200)
    email = models.EmailField()
    mobile_number = models.CharField(max_length=20)
    address = models.CharField(max_length=265)
    designation = models.CharField(max_length=265)
    hired_on = models.DateTimeField()
    days_employed = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Employee"
        verbose_name_plural = "Employees"
        ordering = ["name"]
