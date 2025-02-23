import uuid

from django.core.exceptions import ValidationError
from django.test import RequestFactory, TestCase
from rest_framework.test import APITestCase

from department.models import Company, Department
from department.serializers import DepartmentSerializer
from user_account.models import User


class DepartmentModelTest(TestCase):
    def setUp(self) -> None:
        self.company = Company.objects.create(
            name="Company 1",
        )
        self.department = Department.objects.create(
            company=self.company,
            name="Department 1",
        )

    def test_department_str(self) -> None:
        self.assertEqual(str(self.department), "Company 1 - Department 1")

    def test_department_unique_company_name_compination(self) -> None:
        with self.assertRaises(ValidationError):
            Department.objects.create(
                company=self.company,
                name="Department 1",
            )

    def test_department_number_of_employees_default(self) -> None:
        department = Department.objects.create(
            company=self.company,
            name="Department 2",
        )
        self.assertEqual(department.number_of_employees, 0)

    def test_department_model_inherits_from_basemodel(self) -> None:
        self.assertIsInstance(self.department.id, uuid.UUID)
        self.assertIn("created_at", self.department.__dict__)
        self.assertIn("updated_at", self.department.__dict__)

    def test_department_model_has_company_foreign_key(self) -> None:
        self.assertEqual(self.department.company, self.company)

    def test_department_model_has_name_field(self) -> None:
        self.assertEqual(self.department.name, "Department 1")

    def test_department_model_has_number_of_employees_field(self) -> None:
        self.assertEqual(self.department.number_of_employees, 0)

    def test_department_model_default_ordering(self) -> None:
        Company.objects.create(name="Company 2")
        Company.objects.create(name="Company 3")
        Department.objects.create(
            company=Company.objects.get(name="Company 2"), name="Department 1"
        )
        Department.objects.create(
            company=Company.objects.get(name="Company 2"), name="Department 2"
        )
        Department.objects.create(
            company=Company.objects.get(name="Company 3"), name="Department 1"
        )
        Department.objects.create(
            company=Company.objects.get(name="Company 3"), name="Department 2"
        )
        departments = Department.objects.all()
        self.assertEqual(departments[0].company.name, "Company 1")
        self.assertEqual(departments[1].company.name, "Company 2")
        self.assertEqual(departments[1].name, "Department 1")
        self.assertEqual(departments[2].company.name, "Company 2")
        self.assertEqual(departments[2].name, "Department 2")
        self.assertEqual(departments[3].company.name, "Company 3")
        self.assertEqual(departments[3].name, "Department 1")
        self.assertEqual(departments[4].company.name, "Company 3")
        self.assertEqual(departments[4].name, "Department 2")


class DepartmentSignalsTestCase(TestCase):
    def setUp(self) -> None:
        self.company = Company.objects.create(
            name="Company 1",
        )

    def test_update_number_of_department_in_company_when_creating_new_department(
        self,
    ) -> None:
        self.assertEqual(self.company.number_of_departments, 0)
        Department.objects.create(
            company=self.company,
            name="Department 1",
        )
        self.assertEqual(self.company.number_of_departments, 1)

    def test_update_number_of_department_in_company_when_deleting_department(
        self,
    ) -> None:
        department = Department.objects.create(
            company=self.company,
            name="Department 1",
        )
        self.assertEqual(self.company.number_of_departments, 1)
        department.delete()
        self.assertEqual(self.company.number_of_departments, 0)


class DepartmentSerializerTest(APITestCase):
    def setUp(self) -> None:
        self.company = Company.objects.create(
            name="Company 1",
        )
        self.department = Department.objects.create(
            company=self.company,
            name="Department 1",
        )
        self.request = RequestFactory().get("/")

    def test_department_serializer(self) -> None:
        serializer = DepartmentSerializer(
            self.department, context={"request": self.request}
        )
        self.assertEqual(
            set(serializer.data.keys()),
            {
                "id",
                "created_at",
                "updated_at",
                "url",
                "company",
                "name",
                "number_of_employees",
                "company_name",
                "company_url",
            },
        )
        self.assertEqual(serializer.data["company"], self.company.id)
        self.assertEqual(serializer.data["name"], "Department 1")
        self.assertEqual(serializer.data["number_of_employees"], 0)
        self.assertEqual(
            serializer.data["url"],
            f"http://testserver/api/departments/{self.department.id}/",
        )
        self.assertEqual(serializer.data["company_name"], "Company 1")
        self.assertEqual(
            serializer.data["company_url"],
            f"http://testserver/api/companies/{self.company.id}/",
        )

    def test_department_serializer_create(self) -> None:
        data = {
            "company": self.company.id,
            "name": "Department 2",
            "number_of_employees": 3,
        }
        serializer = DepartmentSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(
            serializer.validated_data,
            {
                "company": self.company,
                "name": "Department 2",
            },
        )
        department = serializer.save()
        self.assertEqual(department.company, self.company)
        self.assertEqual(department.name, "Department 2")
        self.assertEqual(department.number_of_employees, 0)

    def test_department_serializer_update(self) -> None:
        data = {
            "company": self.company.id,
            "name": "Department 2",
            "number_of_employees": 3,
        }
        serializer = DepartmentSerializer(self.department, data=data, partial=True)
        self.assertTrue(serializer.is_valid())
        department = serializer.save()
        self.assertEqual(department.company, self.company)
        self.assertEqual(department.name, "Department 2")
        self.assertEqual(department.number_of_employees, 0)

    def test_department_serializer_partial_update(self) -> None:
        data = {
            "name": "Department 2",
        }
        serializer = DepartmentSerializer(self.department, data=data, partial=True)
        self.assertTrue(serializer.is_valid())
        department = serializer.save()
        self.assertEqual(department.name, "Department 2")

        data = {
            "number_of_employees": 3,
        }
        serializer = DepartmentSerializer(self.department, data=data, partial=True)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data, {})
        department = serializer.save()
        self.assertEqual(department.number_of_employees, 0)


class DepartmentViewSetTest(APITestCase):
    def setUp(self) -> None:
        self.company = Company.objects.create(
            name="Company 1",
        )
        self.department = Department.objects.create(
            company=self.company,
            name="Department 1",
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

    def test_department_view_set(self) -> None:
        self.client.force_authenticate(user=self.manager)
        response = self.client.get(f"/api/departments/{self.department.id}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            set(response.data.keys()),
            {
                "id",
                "created_at",
                "updated_at",
                "url",
                "company",
                "name",
                "number_of_employees",
                "company_name",
                "company_url",
            },
        )
        self.assertEqual(response.data["company"], self.company.id)
        self.assertEqual(response.data["name"], "Department 1")
        self.assertEqual(response.data["number_of_employees"], 0)
        self.assertEqual(
            response.data["url"],
            f"http://testserver/api/departments/{self.department.id}/",
        )
        self.assertEqual(response.data["company_name"], "Company 1")
        self.assertEqual(
            response.data["company_url"],
            f"http://testserver/api/companies/{self.company.id}/",
        )

    def test_department_view_set_list(self) -> None:
        self.client.force_authenticate(user=self.manager)
        response = self.client.get("/api/departments/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(
            set(response.data["results"][0].keys()),
            {
                "id",
                "created_at",
                "updated_at",
                "url",
                "company",
                "name",
                "number_of_employees",
                "company_name",
                "company_url",
            },
        )
        self.assertEqual(response.data["results"][0]["company"], self.company.id)
        self.assertEqual(response.data["results"][0]["name"], "Department 1")
        self.assertEqual(response.data["results"][0]["number_of_employees"], 0)
        self.assertEqual(
            response.data["results"][0]["url"],
            f"http://testserver/api/departments/{self.department.id}/",
        )
        self.assertEqual(response.data["results"][0]["company_name"], "Company 1")
        self.assertEqual(
            response.data["results"][0]["company_url"],
            f"http://testserver/api/companies/{self.company.id}/",
        )

    def test_department_view_set_unauthorized(self) -> None:
        response = self.client.get(f"/api/departments/{self.department.id}/")
        self.assertEqual(response.status_code, 401)

        response = self.client.get("/api/departments/")
        self.assertEqual(response.status_code, 401)

        self.client.force_authenticate(user=self.employee)
        response = self.client.get(f"/api/departments/{self.department.id}/")
        self.assertEqual(response.status_code, 403)

        response = self.client.get("/api/departments/")
        self.assertEqual(response.status_code, 403)

    def test_department_view_set_create(self) -> None:
        self.client.force_authenticate(user=self.manager)
        data = {
            "company": self.company.id,
            "name": "Department 2",
        }
        response = self.client.post("/api/departments/", data=data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Department.objects.count(), 2)

    def test_department_view_set_create_unauthorized(self) -> None:
        self.client.force_authenticate(user=self.employee)
        data = {
            "company": self.company.id,
            "name": "Department 2",
        }
        response = self.client.post("/api/departments/", data=data)
        self.assertEqual(response.status_code, 403)
        self.assertEqual(Department.objects.count(), 1)

    def test_department_view_set_create_invalid(self) -> None:
        self.client.force_authenticate(user=self.manager)
        data = {
            "company": self.company.id,
            "name": "Department 1",
        }
        response = self.client.post("/api/departments/", data=data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            str(response.data["non_field_errors"][0]),
            "The fields company, name must make a unique set.",
        )

    def test_department_view_set_update(self) -> None:
        self.client.force_authenticate(user=self.manager)
        data = {
            "company": self.company.id,
            "name": "Department 2",
        }
        response = self.client.put(f"/api/departments/{self.department.id}/", data=data)
        self.assertEqual(response.status_code, 200)
        self.department.refresh_from_db()
        self.assertEqual(self.department.name, "Department 2")

    def test_department_view_set_update_unauthorized(self) -> None:
        self.client.force_authenticate(user=self.employee)
        data = {
            "company": self.company.id,
            "name": "Department 2",
        }
        response = self.client.put(f"/api/departments/{self.department.id}/", data=data)
        self.assertEqual(response.status_code, 403)
        self.department.refresh_from_db()
        self.assertEqual(self.department.name, "Department 1")

    def test_department_view_set_partial_update(self) -> None:
        self.client.force_authenticate(user=self.manager)
        data = {
            "name": "Department 2",
        }
        response = self.client.patch(
            f"/api/departments/{self.department.id}/", data=data
        )
        self.assertEqual(response.status_code, 200)
        self.department.refresh_from_db()
        self.assertEqual(self.department.name, "Department 2")

        data = {
            "number_of_employees": 3,
        }
        response = self.client.patch(
            f"/api/departments/{self.department.id}/", data=data
        )
        self.assertEqual(response.status_code, 200)
        self.department.refresh_from_db()
        self.assertEqual(self.department.number_of_employees, 0)

    def test_department_view_set_partial_update_unauthorized(self) -> None:
        self.client.force_authenticate(user=self.employee)
        data = {
            "name": "Department 2",
        }
        response = self.client.patch(
            f"/api/departments/{self.department.id}/", data=data
        )
        self.assertEqual(response.status_code, 403)
        self.department.refresh_from_db()
        self.assertEqual(self.department.name, "Department 1")

        data = {
            "number_of_employees": 3,
        }
        response = self.client.patch(
            f"/api/departments/{self.department.id}/", data=data
        )
        self.assertEqual(response.status_code, 403)
        self.department.refresh_from_db()
        self.assertEqual(self.department.number_of_employees, 0)

    def test_department_view_set_delete(self) -> None:
        self.client.force_authenticate(user=self.manager)
        response = self.client.delete(f"/api/departments/{self.department.id}/")
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Department.objects.count(), 0)

    def test_department_view_set_delete_unauthorized(self) -> None:
        self.client.force_authenticate(user=self.employee)
        response = self.client.delete(f"/api/departments/{self.department.id}/")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(Department.objects.count(), 1)
