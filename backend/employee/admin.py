from django.contrib import admin

from employee.models import Employee

admin.site.register(Employee)


class EmployeeInline(admin.StackedInline):
    model = Employee
