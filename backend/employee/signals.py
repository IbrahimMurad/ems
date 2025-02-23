from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from employee.models import Employee


@receiver(post_save, sender=Employee)
def update_number_of_employees_on_save(sender, instance, created, **kwargs) -> None:
    """
    Update the number of employees in the company and department when an employee is updated.
    """
    if not created:
        old_instance = Employee.objects.get(pk=instance.pk)

        if (
            old_instance.status == Employee.StatusChoices.HIRED
            and instance.status != Employee.StatusChoices.HIRED
        ):
            instance.company.number_of_employees -= 1
            instance.department.number_of_employees -= 1

        if (
            old_instance.status != Employee.StatusChoices.HIRED
            and instance.status == Employee.StatusChoices.HIRED
        ):
            instance.company.number_of_employees += 1
            instance.department.number_of_employees += 1

        instance.company.save()
        instance.department.save()


@receiver(post_delete, sender=Employee)
def update_number_of_employees_on_delete(sender, instance, **kwargs) -> None:
    """
    Update the number of employees in the company and department when an employee is deleted.
    """
    if instance.status == Employee.StatusChoices.HIRED:
        instance.company.number_of_employees -= 1
        instance.department.number_of_employees -= 1
        instance.company.save()
        instance.department.save()
