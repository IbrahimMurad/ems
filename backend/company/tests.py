import uuid

from django.core.exceptions import ValidationError
from django.test import RequestFactory, TestCase
from rest_framework.test import APITestCase

from company.models import Company
from company.serializers import CompanySerializer
from user_account.models import User


class CompanyModelTest(TestCase):
    def setUp(self) -> None:
        self.company = Company.objects.create(
            name="Company 1",
        )

    def test_company_str(self) -> None:
        self.assertEqual(str(self.company), "Company 1")

    def test_company_unique_name(self) -> None:
        with self.assertRaises(ValidationError):
            Company.objects.create(
                name="Company 1",
                number_of_departments=3,
                number_of_employees=5,
            )

    def test_company_number_of_departments_default(self) -> None:
        company = Company.objects.create(
            name="Company 2",
        )
        self.assertEqual(company.number_of_departments, 0)

    def test_company_number_of_employees_default(self) -> None:
        company = Company.objects.create(
            name="Company 2",
        )
        self.assertEqual(company.number_of_employees, 0)

    def test_company_model_inherits_from_basemodel(self) -> None:
        self.assertIsInstance(self.company.id, uuid.UUID)
        self.assertIn("created_at", self.company.__dict__)
        self.assertIn("updated_at", self.company.__dict__)


class CompanySerializerTest(TestCase):
    def setUp(self) -> None:
        self.company = Company.objects.create(
            name="Company 1",
        )
        self.request = RequestFactory().get("/")

    def test_company_serializer(self) -> None:

        serializer = CompanySerializer(self.company, context={"request": self.request})
        self.assertEqual(
            set(serializer.data.keys()),
            {
                "id",
                "created_at",
                "updated_at",
                "url",
                "name",
                "number_of_departments",
                "number_of_employees",
            },
        )
        self.assertEqual(serializer.data["name"], "Company 1")
        self.assertEqual(serializer.data["number_of_departments"], 0)
        self.assertEqual(serializer.data["number_of_employees"], 0)
        self.assertEqual(
            serializer.data["url"],
            f"http://testserver/api/companies/{self.company.id}/",
        )

    def test_company_serializer_create(self) -> None:
        """Ensures only the name is handled by the user"""

        data = {
            "name": "Company 2",
            "number_of_departments": 3,
            "number_of_employees": 5,
        }
        serializer = CompanySerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data, {"name": "Company 2"})
        company = serializer.save()
        self.assertEqual(company.name, "Company 2")
        self.assertEqual(company.number_of_departments, 0)
        self.assertEqual(company.number_of_employees, 0)

    def test_company_serializer_update(self) -> None:
        data = {
            "name": "Company 2",
            "number_of_departments": 3,
            "number_of_employees": 5,
        }
        serializer = CompanySerializer(self.company, data=data, partial=True)
        self.assertTrue(serializer.is_valid())
        company = serializer.save()
        self.assertEqual(company.name, "Company 2")
        self.assertEqual(company.number_of_departments, 0)
        self.assertEqual(company.number_of_employees, 0)

    def test_company_serializer_partial_update(self) -> None:
        data = {
            "name": "Company 2",
        }
        serializer = CompanySerializer(self.company, data=data, partial=True)
        self.assertTrue(serializer.is_valid())
        company = serializer.save()
        self.assertEqual(company.name, "Company 2")

        data = {
            "number_of_departments": 3,
            "number_of_employees": 5,
        }

        serializer = CompanySerializer(self.company, data=data, partial=True)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data, {})
        company = serializer.save()
        self.assertEqual(company.number_of_departments, 0)
        self.assertEqual(company.number_of_employees, 0)

    def test_unique_company_name(self) -> None:
        data = {
            "name": "Company 1",
        }
        serializer = CompanySerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(
            str(serializer.errors.get("name")[0]),
            "Company with this name already exists.",
        )


class CompanyViewTest(APITestCase):
    def setUp(self) -> None:
        self.company = Company.objects.create(
            name="Company 1",
        )
        self.admin = User.objects.create_superuser(
            email="admin@test.com",
            username="admin",
            password="admin",
        )
        self.manager = User.objects.create_user(
            email="manager@test.com",
            username="manager",
            role=User.RoleChoices.MANAGER,
            password="manager",
        )
        self.employee = User.objects.create_user(
            email="employee@test.com",
            username="employee",
            password="employee",
        )

    def test_company_list(self) -> None:
        self.client.force_authenticate(user=self.admin)
        response = self.client.get("/api/companies/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(
            set(response.data["results"][0].keys()),
            {
                "id",
                "created_at",
                "updated_at",
                "url",
                "name",
                "number_of_departments",
                "number_of_employees",
            },
        )

    def test_company_unauthorized(self) -> None:
        response = self.client.get("/api/companies/")
        self.assertEqual(response.status_code, 403)

        self.client.force_authenticate(user=self.employee)
        response = self.client.get("/api/companies/")
        self.assertEqual(response.status_code, 403)

    def test_company_create(self) -> None:
        self.client.force_authenticate(user=self.manager)
        data = {
            "name": "Company 2",
        }
        response = self.client.post("/api/companies/", data=data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Company.objects.count(), 2)

    def test_company_create_unauthorized(self) -> None:
        self.client.force_authenticate(user=self.employee)
        data = {
            "name": "Company 2",
        }
        response = self.client.post("/api/companies/", data=data)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(Company.objects.count(), 1)

    def test_company_create_invalid(self) -> None:
        self.client.force_authenticate(user=self.manager)
        data = {
            "name": "Company 1",
        }
        response = self.client.post("/api/companies/", data=data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.data, {"name": ["Company with this name already exists."]}
        )

    def test_company_retrieve(self) -> None:
        self.client.force_authenticate(user=self.admin)
        response = self.client.get(f"/api/companies/{self.company.id}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            set(response.data.keys()),
            {
                "id",
                "created_at",
                "updated_at",
                "url",
                "name",
                "number_of_departments",
                "number_of_employees",
            },
        )

    def test_company_retrieve_unauthorized(self) -> None:
        response = self.client.get(f"/api/companies/{self.company.id}/")
        self.assertEqual(response.status_code, 403)

        self.client.force_authenticate(user=self.employee)
        response = self.client.get(f"/api/companies/{self.company.id}/")
        self.assertEqual(response.status_code, 403)

    def test_company_update(self) -> None:
        self.client.force_authenticate(user=self.manager)
        data = {
            "name": "Company 2",
        }
        response = self.client.patch(f"/api/companies/{self.company.id}/", data=data)
        self.assertEqual(response.status_code, 200)
        self.company.refresh_from_db()
        self.assertEqual(self.company.name, "Company 2")

    def test_company_update_unauthorized(self) -> None:
        self.client.force_authenticate(user=self.employee)
        data = {
            "name": "Company 2",
        }
        response = self.client.patch(f"/api/companies/{self.company.id}/", data=data)
        self.assertEqual(response.status_code, 403)
        self.company.refresh_from_db()
        self.assertEqual(self.company.name, "Company 1")

    def test_company_delete(self) -> None:
        self.client.force_authenticate(user=self.manager)
        response = self.client.delete(f"/api/companies/{self.company.id}/")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Company.objects.count(), 0)

    def test_company_delete_unauthorized(self) -> None:
        self.client.force_authenticate(user=self.employee)
        response = self.client.delete(f"/api/companies/{self.company.id}/")
        self.assertEqual(response.status_code, 403)
