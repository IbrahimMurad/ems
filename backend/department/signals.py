from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from department.models import Department


@receiver(post_save, sender=Department)
def update_number_of_departments_on_create(sender, instance, created, **kwargs) -> None:
    """
    Update the number of departments in the company when a department is updated.
    """
    if created:
        instance.company.number_of_departments += 1
        instance.company.save()


@receiver(post_delete, sender=Department)
def update_number_of_departments_on_delete(sender, instance, **kwargs) -> None:
    """
    Update the number of departments in the company when a department is deleted.
    """
    instance.company.number_of_departments -= 1
    instance.company.save()
