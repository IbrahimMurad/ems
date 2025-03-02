from django.contrib import admin

from company.models import Company
from department.admin import DepatmentInline


class CompanyAdmin(admin.ModelAdmin):
    inlines = [DepatmentInline]


admin.site.register(Company, CompanyAdmin)
