from rest_framework.permissions import BasePermission
from rest_framework.request import Request

from .models import Advertisement, CompanyAdmin


class IsCompanyAdmin(BasePermission):
    message = "You must be a company admin to perform this action"

    def has_permission(self, request: Request, view) -> bool:
        try:
            company_admin = CompanyAdmin.objects.get(pk=request.user.id).id
            return request.user.id == company_admin
        except CompanyAdmin.DoesNotExist:
            return False


class IsCompanyAdminOwner(BasePermission):
    message = "You must be an owner of this item to perform this action"

    def has_object_permission(self, request: Request, view, obj: Advertisement) -> bool:
        try:
            company = CompanyAdmin.objects.get(pk=request.user.id)
            return company == obj.company
        except CompanyAdmin.DoesNotExist:
            return False
