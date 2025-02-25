from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver
from employee.models import Employee


def update_number_of_employees(instance) -> None:
    """
    Update number_of_employees for company and department of instance
    """
    department = instance.department

    employees_in_department = department.employees.filter(
        status=Employee.StatusChoices.HIRED
    ).count()
    department.number_of_employees = employees_in_department
    department.save()


@receiver(post_save, sender=Employee)
def update_number_of_employees_on_save(sender, instance, created, **kwargs) -> None:
    """
    Update the number of employees in the department
    whenever an employee is created, or updated
    in the corresponding department.
    """
    update_number_of_employees(instance)


@receiver(post_delete, sender=Employee)
def update_number_of_employees_on_delete(sender, instance, **kwargs) -> None:
    """
    Update the number of employees in the department
    whenever an employee is deleted in the corresponding department.
    """
    update_number_of_employees(instance)
