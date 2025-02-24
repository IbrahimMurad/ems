from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from company.models import Company
from company.serializers import CompanySerializer
from core.permissions import IsManager


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    # permission_classes = [IsAuthenticated, IsManager]
