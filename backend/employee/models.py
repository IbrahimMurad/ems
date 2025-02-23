from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone

from company.models import Company
from core.basemodel import BaseModel
from department.models import Department


class MobileNumberValidator(RegexValidator):
    regex = r"^\+?1?\d{9,15}$"
    message = "Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."


class Employee(BaseModel):
    """
    Employee model representing company employees and job applicants.

    Tracks employee information including their status from application to hiring,
    personal details, and employment information.
    """

    class StatusChoices(models.TextChoices):
        APPLICATION_RECEIVED = (
            "application_received",
            "Application Received",
        )
        INTERVIEW_SCHEDULED = "interview scheduled", "Interview Scheduled"
        HIRED = "hired", "Hired"
        NOT_ACCEPTED = "not accepted", "Not Accepted"

    mobile_number_validator = MobileNumberValidator()

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
        db_index=True,
    )
    name = models.CharField(max_length=200, db_index=True)
    email = models.EmailField(db_index=True, unique=True)
    mobile_number = models.CharField(
        max_length=20, validators=[mobile_number_validator]
    )
    address = models.CharField(max_length=265)
    designation = models.CharField(max_length=265)
    hired_on = models.DateTimeField(null=True, blank=True)
    days_employed = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Employee"
        verbose_name_plural = "Employees"
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name

    def clean(self) -> None:
        if self.department.company != self.company:
            raise ValidationError(
                message="The department must be related to the company", code="invalid"
            )
        return super().clean()

    def save(self, *args, **kwargs) -> None:
        """
        Save the employee instance.

        - Sets hired_on date when status changes to HIRED
        - Calculates days_employed if hired_on is set
        - Validates department belongs to company
        """

        if self.status == self.StatusChoices.HIRED and not self.hired_on:
            self.hired_on = timezone.now()

        if self.hired_on:
            self.days_employed = (timezone.now() - self.hired_on).days

        self.full_clean()
        super().save(*args, **kwargs)
