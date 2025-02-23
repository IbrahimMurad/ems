from django.contrib import admin

from department.models import Department

admin.site.register(Department)


class DepatmentInline(admin.StackedInline):
    model = Department
