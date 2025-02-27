from company.models import Company
from company.serializers import CompanySerializer
from core.permissions import IsManager
from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated, IsManager]
    filter_backends = [SearchFilter]
    search_fields = ["name"]
