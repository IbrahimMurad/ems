from department.models import Department
from django.db.models import Sum
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver


@receiver(post_save, sender=Department)
def update_number_of_departments_on_create(sender, instance, **kwargs) -> None:
    """
    Update the number of departments in the company when a department is updated.
    """
    company = instance.company
    company.number_of_departments = instance.company.departments.count()
    company.number_of_employees = company.departments.aggregate(
        total_employees=Sum("number_of_employees")
    )["total_employees"]
    company.save()


@receiver(post_delete, sender=Department)
def update_number_of_departments_on_delete(sender, instance, **kwargs) -> None:
    """
    Update the number of departments in the company when a department is deleted.
    """
    company = instance.company
    company.number_of_departments = instance.company.departments.count()
    company.number_of_employees = company.departments.aggregate(
        total_employees=Sum("number_of_employees")
    )["total_employees"]
    company.save()
