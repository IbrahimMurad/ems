from django.contrib import admin

from department.models import Department
from employee.admin import EmployeeInline


class DepatmentInline(admin.StackedInline):
    model = Department


class DepartmentAdmin(admin.ModelAdmin):
    inlines = [
        EmployeeInline,
    ]


admin.site.register(Department, DepartmentAdmin)
