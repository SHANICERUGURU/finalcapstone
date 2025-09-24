from django.urls import path
from . import views
from django.contrib.auth import views as auth_views  

urlpatterns = [
    # API URLs
    path('api/patients/', views.patient, name='patient_api'),
    path('api/patients/<int:pk>/', views.patient_detail, name='patient_detail_api'),
    path('api/doctors/', views.doctor_api, name='doctor_api'),
    path('api/doctors/<int:pk>/', views.doctor_detail_api, name= 'doctor_detail'),
    path('api/user/profile/', views.user_profile, name='user_profile_api'),
    path('api/users/',views.UserPost, name= 'user-post'),
    path('api/appointments/', views.appointments, name='appointments_api'),

    
]